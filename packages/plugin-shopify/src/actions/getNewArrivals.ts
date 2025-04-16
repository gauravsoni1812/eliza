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
import { getShopifyProductsExamples } from "../examples/getShopifyProductsExamples"; // Optional: Create your own example file if needed
import { getNewArrivalsExamples } from "../examples/getNewArrivalsExamples";

export const getNewArrivalsAction: Action = {
    name: "SHOPIFY_GET_NEW_ARRIVALS",
    similes: ["NEW_ARRIVALS", "LATEST", "NEW_PRODUCTS", "RECENT"],
    description: "Fetch the latest added products from the Shopify store.",
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
            const newArrivals = await shopifyService.getNewArrivals();
            elizaLogger.success(`Successfully fetched new arrivals.`);
            console.log(newArrivals, "These are new arrivals");

            if (callback) {
                const productList = newArrivals
                    .map((p: any) => p.title)
                    .join(", ");
                callback({
                    text: `🆕 Here are the latest products added to your Shopify store: ${productList}\n\nCheck them out here: <a style="color:lightblue" href="https://${config.SHOPIFY_STORE_NAME}/collections/all" target="_blank">View All Products</a>`,
                });
                return true;
            }
        } catch (error: any) {
            elizaLogger.error("Error fetching new arrivals:", error);
            callback({
                text: `Error fetching new arrivals: ${error.message}`,
                content: { error: error.message },
            });
            return false;
        }
    },
    examples: getNewArrivalsExamples as ActionExample[][], // Optional: Replace with your own if needed
} as Action;
