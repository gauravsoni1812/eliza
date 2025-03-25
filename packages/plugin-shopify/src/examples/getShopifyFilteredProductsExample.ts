import { ActionExample } from "@elizaos/core";

export const getAllShopifyFilteredProductsExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                text: "I want a blue denim shirt with a price less than 500 of Zara.",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Let me find a 'blue denim shirt' under $500 from 'Zara' in your Shopify store.",
                action: "SHOPIFY_GET_ALL_FILTERED_PRODUCTS",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "Show me all red sneakers below 1000 from Nike.",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Searching for 'red sneakers' under $1000 from 'Nike' in your Shopify store.",
                action: "SHOPIFY_GET_ALL_FILTERED_PRODUCTS",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "Find me a black leather jacket under 2000 from Levi's.",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Fetching 'black leather jacket' under $2000 from 'Levi's' in your Shopify store.",
                action: "SHOPIFY_GET_ALL_FILTERED_PRODUCTS",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "I need a white cotton t-shirt for less than 300.",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Looking for a 'white cotton t-shirt' under $300 in your Shopify store.",
                action: "SHOPIFY_GET_ALL_FILTERED_PRODUCTS",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "Show me sports shoes under 1500 from Adidas.",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Finding 'sports shoes' under $1500 from 'Adidas' in your Shopify store.",
                action: "SHOPIFY_GET_ALL_FILTERED_PRODUCTS",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "Give me all the products of brand Pence",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Let me find all the products from the brand 'Pence' available in our store for you.",
                action: "SHOPIFY_GET_ALL_FILTERED_PRODUCTS",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "I want to see all Levi's items.",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Fetching all items from 'Levi's' in your Shopify store.",
                action: "SHOPIFY_GET_ALL_FILTERED_PRODUCTS",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "Show me all Nike products.",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Finding all 'Nike' products in your Shopify store.",
                action: "SHOPIFY_GET_ALL_FILTERED_PRODUCTS",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "I want 4 Nike shoes under 2000.",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Fetching 4 'Nike' shoes under $2000 from your Shopify store.",
                action: "SHOPIFY_GET_ALL_FILTERED_PRODUCTS",
            },
        },
    ],
];
