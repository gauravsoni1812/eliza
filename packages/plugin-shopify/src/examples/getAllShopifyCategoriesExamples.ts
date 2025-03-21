import { ActionExample } from "@elizaos/core";

export const getShopifyCategoriesExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                text: "Can you show me all the product categories in our Shopify store?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Let me fetch the list of product categories from Shopify.",
                action: "SHOPIFY_GET_ALL_CATEGORIES",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "I want to see the available product categories in our store.",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Fetching the available product categories from your Shopify store.",
                action: "SHOPIFY_GET_ALL_CATEGORIES",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "Show me all categories of products in our Shopify inventory.",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Here is a list of product categories from your Shopify store.",
                action: "SHOPIFY_GET_ALL_CATEGORIES",
            },
        },
    ],
];
