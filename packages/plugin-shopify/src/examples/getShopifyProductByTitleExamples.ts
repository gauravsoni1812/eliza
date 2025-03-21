import { ActionExample } from "@elizaos/core";

export const getShopifyProductByTitleExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                text: "Can you find a product called 'Red Sneakers' in our Shopify store?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Let me search for 'Red Sneakers' in your Shopify store.",
                action: "SHOPIFY_GET_PRODUCT_BY_TITLE",
            },
        }
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "Do we have any products named 'Wireless Headphones'?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Searching for 'Wireless Headphones' in your Shopify inventory.",
                action: "SHOPIFY_GET_PRODUCT_BY_TITLE",
            },
        }
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "Find all products with 'Laptop' in the title.",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Fetching all products containing 'Laptop' in their title.",
                action: "SHOPIFY_GET_PRODUCT_BY_TITLE",
            },
        }
    ]
];