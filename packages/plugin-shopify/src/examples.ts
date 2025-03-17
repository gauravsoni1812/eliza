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