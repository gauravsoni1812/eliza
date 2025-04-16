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
    ModelClass,
} from "@elizaos/core";

import { getFashionRecommendationExamples } from "../examples/getFashionRecomendationExamples";
import { getAllShopifyFashionRecomendation } from "../templates/getFashionRecomendationTemplate";
import { createShopifyService } from "../services";
import { validateShopifyConfig } from "../environment";

export const getFashionRecommendationAction: Action = {
    name: "FASHION_RECOMMENDATION",
    similes: ["FASHION", "STYLE", "OUTFITS", "CLOTHES", "WEAR"],
    description:
        "Suggest outfits or styling ideas based on user queries like occasion, weather, or body type.",

    validate: async (runtime: IAgentRuntime) => {
        return true;
    },

    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        options: { query?: string },
        callback: HandlerCallback
    ) => {
        if (!state) {
            state = (await runtime.composeState(message)) as State;
        }
        state = await runtime.updateRecentMessageState(state);
        const config = await validateShopifyConfig(runtime);
        const shopifyService = createShopifyService(
             config.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
             config.SHOPIFY_STORE_NAME
         );


        const context = composeContext({
            state,
            template: getAllShopifyFashionRecomendation,
        });

        const content = await generateMessageResponse({
            runtime,
            context,
            modelClass: ModelClass.SMALL,
        });

        console.log("🧠 OpenAI Content:", content);

        try {
            if (!Array.isArray(content)) {
                callback({
                    text: "Sorry, I couldn’t understand your fashion request. Please try again.",
                });
                return false;
            }

            // 🔧 Build search query from AI response
            const query = content
                .map((item: any) => {
                    if (item.style && item.product) {
                        return `${item.style} ${item.product}`;
                    } else if (item.product) {
                        return item.product;
                    } else {
                        return "";
                    }
                })
                .filter(Boolean)
                .join(", ");

            console.log("🔍 Built search query:", query);

            // 🔎 Call Shopify search function
            // const products = await searchRecommendedProducts(query);
            const products = await shopifyService.searchRecommendedProducts();

            if (!products || products.length === 0) {
                callback({
                    text: `Sorry, I couldn’t find any fashion recommendations for "${query}".`,
                });
                return false;
            }

            // 📋 Format the product list
            const productList = products
                .map(
                    (p: any, idx: number) =>
                        `${idx + 1}. ${p.title} - ${p.vendor || "Unknown brand"}`
                )
                .join("\n");

            const suggestion = `Here are some fashion recommendations based on your style preferences:\n\n${productList}`;

            elizaLogger.success("Successfully fetched recommended products");

            callback({
                text: suggestion,
            });

            return true;
        } catch (error: any) {
            elizaLogger.error(
                "Error in fashion recommendation handler:",
                error
            );
            callback({
                text: `Oops! Something went wrong while fetching your fashion recommendations: ${error.message}`,
                content: { error: error.message },
            });
            return false;
        }
    },

    examples: getFashionRecommendationExamples as ActionExample[][],
} as Action;
