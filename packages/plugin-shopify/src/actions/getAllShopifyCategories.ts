import {
    elizaLogger,
    Action,
    ActionExample,
    HandlerCallback,
    IAgentRuntime,
    Memory,
    State,
} from "@elizaos/core";
import { validateShopifyConfig } from "../environment";
import { createShopifyService } from "../services";
import { getShopifyCategoriesExamples } from "../examples/getAllShopifyCategoriesExamples";

export const getAllShopifyCategoriesAction: Action = {
    name: "SHOPIFY_GET_ALL_CATEGORIES",
    similes: ["ECOMMERCE", "SHOPIFY", "CATEGORIES", "STORE"],
    description: "Fetch all product categories from the Shopify store.",
    validate: async (runtime: IAgentRuntime) => {
        await validateShopifyConfig(runtime);
        return true;
    },
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        _options: { [key: string]: unknown },
        callback: HandlerCallback
    ) => {
        const config = await validateShopifyConfig(runtime);
        const shopifyService = createShopifyService(
            config.SHOPIFY_ACCESS_TOKEN,
            config.SHOPIFY_STORE_NAME
        );

        try {
            const categories = await shopifyService.getAllCategories();
            elizaLogger.success(`Successfully fetched Shopify categories.`);

            if (callback) {
                const categoryList = categories
                    .map((c: any) => c.title)
                    .join(", ");
                callback({
                    text: `Here are the product categories available in your Shopify store: ${categoryList}`,
                });
                return true;
            }
        } catch (error: any) {
            elizaLogger.error("Error in Shopify plugin handler:", error);
            callback({
                text: `Error fetching Shopify categories: ${error.message}`,
                content: { error: error.message },
            });
            return false;
        }
    },
    examples: getShopifyCategoriesExamples as ActionExample[][],
} as Action;
