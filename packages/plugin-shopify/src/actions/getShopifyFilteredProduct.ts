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
        options: any,
        callback: HandlerCallback
    ) => {
        state = state || ((await runtime.composeState(message)) as State);
        state = await runtime.updateRecentMessageState(state);

        const messageContext = composeContext({
            state,
            template: getAllShopifyFilteredProductsTemplate,
        });

        const content = await generateMessageResponse({
            runtime,
            context: messageContext,
            modelClass: ModelClass.SMALL,
        });

        console.log(content,"This is my content");
        options = content;
        const config = await validateShopifyConfig(runtime);
        const shopifyService = createShopifyService(
            config.SHOPIFY_STOREFRONT_ACCESS_TOKEN, // Use Storefront token here
            config.SHOPIFY_STORE_NAME
        );

        if (!options.tags &&
            !options.color &&
            !options.price &&
            !options.brand &&
            !options.product&&
            !options.in_stock
        ) {
            callback({
                text: "Please provide at least one filter (color, price, brand, or product type or stock availabilty).",
            });
            return false;
        }

        try {
            const products =
                await shopifyService.getAllFilteredProducts(options);

            if(!products){
                callback({
                    text:"Unable to fetch products please try again"
                })
            }

            if (products.length == 0) {
                callback({
                    text: `No products found matching your filters: ${JSON.stringify(options)}`,
                });
                return false;
            }
         const productDetails = products
             .map((product: any) => {
                 // Retrieve the image URL from the images connection.
                 const imageUrl =
                     product.images.edges.length > 0
                         ? product.images.edges[0].node.originalSrc
                         : "";

                 return `
<b>Title:</b> ${product.title}
<b>Brand:</b> ${product.vendor}
<b>Price:</b> $${product.variants.edges[0].node.price.amount}
<b>Available Stock:</b> ${product.variants.edges[0].node.quantityAvailable}
<b>Link:</b> <a href="https://${config.SHOPIFY_STORE_NAME}/products/${product.handle}" target="_blank" style="color: lightblue;">
https://${config.SHOPIFY_STORE_NAME}/products/${product.handle}</a>\n
<img src="${imageUrl}" alt="${product.title}" style="width: 150px; height: 200px;" />
----------------------------<br>`;
             })
             .join("");
            callback({ text: `Filtered Products:\n${productDetails}` });
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
