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
import { ModelClass } from "@elizaos/core";
import { getShopifyProductByTitleExamples } from "../examples/getShopifyProductByTitleExamples";
import { getShopifyProductByTitleTemplate } from "../templates/getShopifyProductByTitleTemplate";
import { Media } from "@elizaos/core";

export const getShopifyProductByTitleAction: Action = {
    name: "SHOPIFY_GET_PRODUCT_BY_TITLE",
    similes: ["ECOMMERCE", "SHOPIFY", "PRODUCTS", "STORE"],
    description:
        "Fetch details of a specific product from the Shopify store by title.",
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
            template: getShopifyProductByTitleTemplate,
        });

        const content = await generateMessageResponse({
            runtime,
            context: messageContext,
            modelClass: ModelClass.SMALL,
        });

        options.title = content.title;

        const config = await validateShopifyConfig(runtime);
        const shopifyService = createShopifyService(
            config.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
            config.SHOPIFY_STORE_NAME
        );

        if (!options.title) {
            callback({ text: "Please provide a product title to search for." });
            return false;
        }

        try {
            const product = await shopifyService.getProductByTitle(
                options.title
            );
            console.log(options)

            if (!product) {
                callback({
                    text: `No products found with title matching "${options.title}".`,
                });
                return false;
            }

            elizaLogger.success(
                `Successfully fetched Shopify product: ${options.title}`
            );
            const productDetails = `
<b>Title:</b> ${product.title}
<b>Brand:</b> ${product.vendor}
<b>Price:</b> $${product.variants?.edges[0]?.node?.price?.amount ?? "N/A"}
<b>Available Stock:</b> ${product?.totalInventory ?? "N/A"}
<b>Link:</b> <a href="https://${config.SHOPIFY_STORE_NAME}.myshopify.com/products/${product.handle}" target="_blank" style="color: lightblue;">
${config.SHOPIFY_STORE_NAME}.myshopify.com/products/${product.handle}</a><br>
`;

            const images: Media[] = [{
                id: product.featuredImage.url,
                url: product.featuredImage.url
            }];

            callback({
                text: `Here are the details of the product found:\n\n${productDetails}`,
                attachments: images,
            });
            return true;
        } catch (error: any) {
            elizaLogger.error(
                "Error in Shopify product search handler:",
                error
            );
            callback({
                text: `Error fetching product details: ${error.message}`,
                content: { error: error.message },
            });
            return false;
        }
    },
    examples: getShopifyProductByTitleExamples as ActionExample[][],
} as Action;
