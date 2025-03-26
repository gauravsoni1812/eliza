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
 import { getShopifyDiscountsExamples } from "../examples/getShopifyDiscountExamples";

export const getAllShopifyDiscountCodes: Action = {
    name: "SHOPIFY_GET_ALL_DISCOUNTS",
    similes: ["ECOMMERCE", "SHOPIFY", "DISCOUNT", "COUPON"],
    description: "Fetch all available discount codes from Shopify.",
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

        const config = await validateShopifyConfig(runtime);
        const shopifyService = createShopifyService(
            config.SHOPIFY_ACCESS_TOKEN,
            config.SHOPIFY_STORE_NAME
        );

        try {
            const discounts = await shopifyService.getAllDiscounts();
             if (!discounts || discounts.length === 0) {
                callback({ text: "No active discount codes found." });
                return false;
            }

            const discountDetails = discounts
                .map((discount: any) => {
                    return `
<b>Code:</b> ${discount?.codeDiscount?.title ?? "N/A"}
<b>Summary:</b> ${discount?.codeDiscount?.summary ?? ""}

----------------------------<br>`;
                })
                .join("");

            callback({
                text: `Available Discounts:\n${discountDetails} `,
            });
            return true;
        } catch (error: any) {
            elizaLogger.error("Error fetching discounts:", error);
            callback({
                text: `Error fetching discounts: ${error.message}`,
                content: { error: error.message },
            });
            return false;
        }
    },
    examples: getShopifyDiscountsExamples as ActionExample[][],
};
