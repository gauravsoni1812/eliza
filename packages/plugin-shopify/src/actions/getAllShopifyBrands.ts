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
import { getShopifyBrandsExamples } from "../examples/getAllShopifyBrands";

export const getAllShopifyBrandsAction: Action = {
    name: "SHOPIFY_GET_ALL_BRNADS",
    similes: ["ECOMMERCE", "SHOPIFY", "BRANDS", "VENDORS", "STORE"],
    description: "Fetch all product brands from the Shopify store.",
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
            const brands = await shopifyService.fetchAllVendors();
            elizaLogger.success(`Successfully fetched Shopify brands.`);
            console.log(brands, "These are");
            const show = [...new Set(brands.map((brand: any) => brand.vendor))].join(", ");
            if (callback) {
                callback({
                    text: `Here are the brnads available in your Shopify store :
                    ${show}`,
                });
                return true;
            }
        } catch (error: any) {
            elizaLogger.error("Error in Shopify plugin handler:", error);
            callback({
                text: `Error fetching Shopify brands: ${error.message}`,
                content: { error: error.message },
            });
            return false;
        }
    },
    examples: getShopifyBrandsExamples as ActionExample[][],
} as Action;