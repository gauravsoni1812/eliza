import { ActionExample } from "@elizaos/core";

export const getShopifyDiscountsExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                text: "Can you fetch all active discount codes from our Shopify store?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Let me retrieve all active discount codes from your Shopify store.",
                action: "SHOPIFY_GET_ALL_DISCOUNTS",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "Show me the latest coupon codes available.",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Fetching the latest available discount codes for your Shopify store.",
                action: "SHOPIFY_GET_ALL_DISCOUNTS",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "Are there any discounts currently available?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Checking for available discounts in your Shopify store.",
                action: "SHOPIFY_GET_ALL_DISCOUNTS",
            },
        },
    ],
];
