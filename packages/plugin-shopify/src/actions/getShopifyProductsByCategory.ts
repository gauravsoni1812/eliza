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
import { getShopifyProductsByCategoryExamples } from "../examples/getShopifyProductsByCategoryExamples";
import { getShopifyProductCategoryTemplate } from "../templates/getShopifyProductsByCategoryTemplate";
import { ModelClass } from "@elizaos/core";

export const getShopifyProductsByCategoryAction: Action = {
    name: "SHOPIFY_GET_PRODUCTS_BY_CATEGORY",
    similes: ["ECOMMERCE", "SHOPIFY", "PRODUCTS", "CATEGORY", "STORE"],
    description:
        "Fetch products from a specific category (Shopify Collection).",
    validate: async (runtime: IAgentRuntime) => {
        await validateShopifyConfig(runtime);
        return true;
    },
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        options: { category?: string },
        callback: HandlerCallback
    ) => {
        if (!state) {
            state = (await runtime.composeState(message)) as State;
        }
        state = await runtime.updateRecentMessageState(state);

        const messageContext = composeContext({
            state,
            template: getShopifyProductCategoryTemplate,
        });

        console.log({ messageContext }, "This is message context");
        const content = await generateMessageResponse({
            runtime,
            context: messageContext,
            modelClass: ModelClass.SMALL,
        });

        console.log(content, "This is called content");
        options.category = content.category;

        if (!options.category) {
            callback({ text: "Please provide a valid category name." });
            return false;
        }

        const config = await validateShopifyConfig(runtime);
        const shopifyService = createShopifyService(
            config.SHOPIFY_ACCESS_TOKEN,
            config.SHOPIFY_STORE_NAME
        );

        try {
            const products = await shopifyService.getProductsByCategory(
                options.category
            );

            if (!products || products.length === 0) {
                callback({
                    text: `No products found in the category "${options.category}".`,
                });
                return false;
            }

            elizaLogger.success(
                `Successfully fetched products for category: ${options.category}`
            );

            const productDetails = products
                .map((p: any) => `- ${p.title} ($${p.variants[0]?.price})`)
                .join("\n");
            callback({
                text: `Here are the products in "${options.category}":\n\n${productDetails}`,
            });
            return true;
        } catch (error: any) {
            elizaLogger.error(
                "Error fetching Shopify products by category:",
                error
            );
            callback({
                text: `Error fetching products: ${error.message}`,
                content: { error: error.message },
            });
            return false;
        }
    },
    examples: getShopifyProductsByCategoryExamples as ActionExample[][],
} as Action;
