import {
    elizaLogger,
    Action,
    ActionExample,
    HandlerCallback,
    IAgentRuntime,
    Memory,
    State,
    composeContext,
    generateMessageResponse,
} from "@elizaos/core";
import { validateShopifyConfig } from "../environment";
import { createShopifyService } from "../services";
import { getShopifyProductAvailabilityExamples } from "../examples/checkShopifyProductAvailabilityExamples";
import { getShopifyProductAvailabilityTemplate } from "../templates/checkProductByTitleTemplate";
import { ModelClass } from "@elizaos/core";
import { Media } from "@elizaos/core";

export const checkShopifyProductAvailabilityAction: Action = {
    name: "SHOPIFY_CHECK_PRODUCT_AVAILABILITY",
    similes: ["ECOMMERCE", "SHOPIFY", "AVAILABILITY", "STOCK"],
    description:
        "Check if a specific product is available in the Shopify store by title.",
    validate: async (runtime: IAgentRuntime) => {
        await validateShopifyConfig(runtime);
        return true;
    },
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        options: { title?: string },
        callback: HandlerCallback
    ) => {
        if (!state) {
            state = (await runtime.composeState(message)) as State;
        }
        state = await runtime.updateRecentMessageState(state);

        const messageContext = composeContext({
            state,
            template: getShopifyProductAvailabilityTemplate,
        });

        const content = await generateMessageResponse({
            runtime,
            context: messageContext,
            modelClass: ModelClass.SMALL,
        });

        options.title = content.title;

        if (!options.title) {
            callback({
                text: "Please provide a product title to check availability.",
            });
            return false;
        }
        const config = await validateShopifyConfig(runtime);
        const shopifyService = createShopifyService(
            config.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
            config.SHOPIFY_STORE_NAME
        );

        try {
            const product = await shopifyService.getProductByTitle(
                options.title
            );
            console.log(product, "this is my product");
            if (!product) {
                callback({
                    text: `The product "${options.title}" is currently out of stock.`,
                });
                return false;
            }

            elizaLogger.success(`Product "${options.title}" is available.`);

            const stockDetails = `
<b>Title:</b> ${product.title}
<b>Brand:</b> ${product.vendor}
<b>Price:</b> $${product.variants?.edges[0]?.node?.price?.amount ?? "N/A"}
<b>Available Stock:</b> ${product?.totalInventory ?? "N/A"}
<b>Link:</b> <a href="https://${config.SHOPIFY_STORE_NAME}.myshopify.com/products/${product.handle}" target="_blank" style="color: lightblue;">
${config.SHOPIFY_STORE_NAME}.myshopify.com/products/${product.handle}</a><br>
`;

            const images: Media[] = [
                {
                    id: product.featuredImage.url,
                    url: product.featuredImage.url,
                },
            ];

            callback({
                text: `Yes! The product is available.\n${stockDetails}`,
                attachments: images,
            });
            return true;
        } catch (error: any) {
            elizaLogger.error("Error checking product availability:", error);
            callback({
                text: `Error checking availability: ${error.message}`,
                content: { error: error.message },
            });
            return false;
        }
    },
    examples: getShopifyProductAvailabilityExamples as ActionExample[][],
} as Action;
