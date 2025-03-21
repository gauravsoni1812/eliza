import { ActionExample } from "@elizaos/core";

export const getShopifyProductAvailabilityExamples: ActionExample[][] = [
    // Basic Queries
    [
        {
            user: "{{user1}}",
            content: {
                text: "Is 'Red Sneakers' available in stock?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Checking availability for 'Red Sneakers'.",
                action: "SHOPIFY_CHECK_PRODUCT_AVAILABILITY",
            },
        }
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "Do we have 'Wireless Headphones' in stock?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Verifying stock for 'Wireless Headphones'.",
                action: "SHOPIFY_CHECK_PRODUCT_AVAILABILITY",
            },
        }
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "Can you check if 'Gaming Laptop' is available?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Fetching stock details for 'Gaming Laptop'.",
                action: "SHOPIFY_CHECK_PRODUCT_AVAILABILITY",
            },
        }
    ],

    // Different Product Variations (Without Mentioning Size)
    [
        {
            user: "{{user1}}",
            content: {
                text: "Do you have 'Nike Running Shoes' in size 10?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Checking availability for 'Nike Running Shoes'.",
                action: "SHOPIFY_CHECK_PRODUCT_AVAILABILITY",
            },
        }
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "Is 'Blue Denim Jacket' in stock for Large size?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Verifying stock for 'Blue Denim Jacket'.",
                action: "SHOPIFY_CHECK_PRODUCT_AVAILABILITY",
            },
        }
    ],

    // Generic Queries
    [
        {
            user: "{{user1}}",
            content: {
                text: "Do we still have 'Apple AirPods' in stock?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Checking if 'Apple AirPods' are available.",
                action: "SHOPIFY_CHECK_PRODUCT_AVAILABILITY",
            },
        }
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "Can you confirm if 'Samsung Smart TV' is available?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Fetching stock details for 'Samsung Smart TV'.",
                action: "SHOPIFY_CHECK_PRODUCT_AVAILABILITY",
            },
        }
    ],

    // Cases with Missing or Unavailable Products
    [
        {
            user: "{{user1}}",
            content: {
                text: "Is there a product called 'Super Rare Phone' available?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Checking stock for 'Super Rare Phone'. If it's unavailable, I'll let you know.",
                action: "SHOPIFY_CHECK_PRODUCT_AVAILABILITY",
            },
        }
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "I need to know if 'Limited Edition Sneakers' are still in stock.",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Verifying stock for 'Limited Edition Sneakers'.",
                action: "SHOPIFY_CHECK_PRODUCT_AVAILABILITY",
            },
        }
    ],

    // Ambiguous Queries
    [
        {
            user: "{{user1}}",
            content: {
                text: "Do we have 'coffee machine' in stock?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Checking availability for 'coffee machine'. If you have a specific brand or model, let me know!",
                action: "SHOPIFY_CHECK_PRODUCT_AVAILABILITY",
            },
        }
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "Are there any 'gaming chairs' in stock?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Fetching stock status for 'gaming chairs'. Let me know if you need a specific brand.",
                action: "SHOPIFY_CHECK_PRODUCT_AVAILABILITY",
            },
        }
    ]
];
