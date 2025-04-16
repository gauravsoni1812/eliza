import { ActionExample } from "@elizaos/core";

export const getNewArrivalsExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                text: "Show me the new arrivals in the store.",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Fetching the latest products recently added to your Shopify store.",
                action: "SHOPIFY_GET_NEW_ARRIVALS",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "What are the most recent products added?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Let me check the most recently added products for you.",
                action: "SHOPIFY_GET_NEW_ARRIVALS",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "Any new items listed lately?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Sure, here are the newly listed products in your store.",
                action: "SHOPIFY_GET_NEW_ARRIVALS",
            },
        },
    ],
];
