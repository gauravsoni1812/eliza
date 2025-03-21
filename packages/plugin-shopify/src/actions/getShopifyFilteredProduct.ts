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
import { getAllShopifyFilteredProductsExamples } from "../examples/getShopifyFilteredProductsExample";
import { getAllShopifyFilteredProductsTemplate } from "../templates/getShopifyFilteredProducts";

export const getAllFilteredProductsAction: Action = {
    name: "SHOPIFY_GET_ALL_FILTERED_PRODUCTS",
    similes: ["ECOMMERCE", "SHOPIFY", "PRODUCTS", "FILTER"],
    description:
        "Fetch all products from Shopify that match specific filters like color, price range, and brand.",
    validate: async (runtime: IAgentRuntime) => {
        await validateShopifyConfig(runtime);
        return true;
    },
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        options: { color?: string; price?: number; brand?: string },
        callback: HandlerCallback
    ) => {
        if (!state) {
            state = (await runtime.composeState(message)) as State;
        }
        state = await runtime.updateRecentMessageState(state);

        const messageContext = composeContext({
            state,
            template: getAllShopifyFilteredProductsTemplate,
        });

        console.log("Message Context:", messageContext);
        const content = await generateMessageResponse({
            runtime,
            context: messageContext,
            modelClass: ModelClass.SMALL,
        });


        console.log("Generated Content:", content);
        options.color = content.color;
        options.price = content.price;
        options.brand = content.brand;

        const config = await validateShopifyConfig(runtime);
        const shopifyService = createShopifyService(
            config.SHOPIFY_ACCESS_TOKEN,
            config.SHOPIFY_STORE_NAME
        );

        if (!options.color && !options.price && !options.brand) {
            callback({
                text: "Please provide at least one filter (color, price, or brand) to search for products.",
            });
            return false;
        }

        try {
            const filters: any = {};
            if (options.brand) filters.vendor = options.brand;
            if (options.price) filters.price_max = options.price;
            if (options.color) filters.color = options.color; // Assuming color exists in tags/metafields

            const products = await shopifyService.getAllFilteredProducts({});

            if (!products || products.length === 0) {
                callback({
                    text: `No products found matching the given filters: ${JSON.stringify(
                        options
                    )}`,
                });
                return false;
            }

            elizaLogger.success(
                `Successfully fetched ${products.length} Shopify products with filters: ${JSON.stringify(
                    options
                )}`
            );

            const productDetails = products
                .map(
                    (product: any) =>
                        `Title: ${product.title}\nPrice: $${product.variants[0]?.price}\nStock: ${product.variants[0]?.inventory_quantity}\nBrand: ${product.vendor}\n----------------`
                )
                .join("\n");

            callback({
                text: `Here are the filtered products:\n\n${productDetails}`,
            });
            return true;
        } catch (error: any) {
            elizaLogger.error("Error fetching filtered products:", error);
            callback({
                text: `Error fetching filtered products: ${error.message}`,
                content: { error: error.message },
            });
            return false;
        }
    },
    examples: getAllShopifyFilteredProductsExamples as ActionExample[][],
};
