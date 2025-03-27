import { ActionExample } from "@elizaos/core";

export const getShopifyBrandsExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                text: "Can you show me all the brands in our Shopify store?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Let me fetch the list of brands from Shopify.",
                action: "SHOPIFY_GET_ALL_BRANDS",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "I want to see the available brands in our store.",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Fetching the available brands from your Shopify store.",
                action: "SHOPIFY_GET_ALL_BRANDS",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "Show me all brands of products in our Shopify inventory.",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Here is a list of brands from your Shopify store.",
                action: "SHOPIFY_GET_ALL_BRANDS",
            },
        },
    ],
];
