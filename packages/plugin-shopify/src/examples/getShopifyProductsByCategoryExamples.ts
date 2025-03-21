import { ActionExample } from "@elizaos/core";

export const getShopifyProductsByCategoryExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                text: "Do you have electronics items?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Fetching all 'Electronics' products from your Shopify store.",
                action: "SHOPIFY_GET_PRODUCTS_BY_CATEGORY",
            },
        }
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "Can you show me all clothing items in the store?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Retrieving 'clothing' products from your Shopify store.",
                action: "SHOPIFY_GET_PRODUCTS_BY_CATEGORY",
            },
        }
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "I need to see 'furniture' products available in our store.",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Here are the 'furniture' items from your Shopify store.",
                action: "SHOPIFY_GET_PRODUCTS_BY_CATEGORY",
            },
        }
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "Show me all available accessories.",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Fetching 'accessories' from your Shopify store.",
                action: "SHOPIFY_GET_PRODUCTS_BY_CATEGORY",
            },
        }
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "I want to check out all home appliances you have.",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Here are the home appliances available in your Shopify store.",
                action: "SHOPIFY_GET_PRODUCTS_BY_CATEGORY",
            },
        }
    ]
];
