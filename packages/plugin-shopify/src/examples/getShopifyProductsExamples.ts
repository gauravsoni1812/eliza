import { ActionExample } from "@elizaos/core";

export const getShopifyProductsExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                text: "Can you show me all the products in our Shopify store?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Let me fetch the list of products from Shopify.",
                action: "SHOPIFY_GET_ALL_PRODUCTS",
            },
        }
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "I want to see the latest products added to our store.",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Fetching the latest products from your Shopify store.",
                action: "SHOPIFY_GET_ALL_PRODUCTS",
            },
        }
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "Show me some products from our Shopify inventory.",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Here is a list of products from your Shopify store.",
                action: "SHOPIFY_GET_ALL_PRODUCTS",
            },
        }
    ]
];
