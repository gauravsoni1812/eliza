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
import { getShopifyProductsExamples } from "../examples/getShopifyProductsExamples";

export const getShopifyProductsAction: Action = {
    name: "SHOPIFY_GET_ALL_PRODUCTS",
    similes: ["ECOMMERCE", "SHOPIFY", "PRODUCTS", "STORE"],
    description: "Fetch all products from the Shopify store.",
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
            config.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
            config.SHOPIFY_STORE_NAME
        );

        try {
            const products = await shopifyService.getAllProducts();
            elizaLogger.success(`Successfully fetched Shopify products.`);
            console.log(products,"This is products")
            if (callback) {
                const productList = products.join(", ");
                callback({
                    text: `Here are the products available in your Shopify store: ${productList}\nYou can view all products here:<a style="color:lightblue" href="https://48pakvaan.myshopify.com/collections/all" target="_blank">https://48pakvaan.myshopify.com/collections/all</a>)`,
                });
                return true;
            }
        } catch (error: any) {
            elizaLogger.error("Error in Shopify plugin handler:", error);
            callback({
                text: `Error fetching Shopify products: ${error.message}`,
                content: { error: error.message },
            });
            return false;
        }
    },
    examples: getShopifyProductsExamples as ActionExample[][],
} as Action;
