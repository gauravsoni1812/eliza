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
import { getShopifyProductByTitleExamples } from "../examples";
import { createShopifyService } from "../services";
import { getShopifyProductByTitleTemplate } from "../template";
import { ModelClass } from "@elizaos/core";

export const getShopifyProductByTitleAction: Action = {
    name: "SHOPIFY_GET_PRODUCT_BY_TITLE",
    similes: ["ECOMMERCE", "SHOPIFY", "PRODUCTS", "STORE"],
    description: "Fetch details of a specific product from the Shopify store by title.",
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
            template:getShopifyProductByTitleTemplate
        });

        console.log({messageContext},"This is message context")
const extractLatestProductTitle = (message: string): { title?: string; error?: string } => {
    const matches = [...message.matchAll(/'([^']+)'/g)]; // Sab matches nikal lo

    if (matches.length > 0) {
        const latestTitle = matches[matches.length - 1][1]; // Sabse last wala lo
        return { title: latestTitle };
    }

    return { error: "No product title found in the message." };
};

        const extractedTitle = extractLatestProductTitle(messageContext);
        console.log(extractedTitle,"title")
        options.title = extractedTitle.title

        const config = await validateShopifyConfig(runtime);
        const shopifyService = createShopifyService(
            config.SHOPIFY_ACCESS_TOKEN,
            config.SHOPIFY_STORE_NAME
        );

        if (!options.title) {
            callback({ text: "Please provide a product title to search for." });
            return false;
        }

        try {
            const product = await shopifyService.getProductByTitle(options.title);

            if (!product) {
                callback({ text: `No products found with title matching "${options.title}".` });
                return false;
            }

            elizaLogger.success(`Successfully fetched Shopify product: ${options.title}`);

            const productDetails = `Title: ${product.title}
Price: $${product.variants[0]?.price}
Stock: ${product.variants[0]?.inventory_quantity}`;

            callback({ text: `Here are the details of the product found:\n\n${productDetails}` });
            return true;
        } catch (error: any) {
            elizaLogger.error("Error in Shopify product search handler:", error);
            callback({
                text: `Error fetching product details: ${error.message}`,
                content: { error: error.message },
            });
            return false;
        }
    },
    examples: getShopifyProductByTitleExamples as ActionExample[][],
} as Action;
