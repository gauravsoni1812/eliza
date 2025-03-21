export const getShopifyProductCategoryTemplate = `Extract the product category from the most recent message.
If no specific category is provided, respond with an error message.

### Response Format:
\`\`\`json
{
    "category": "Extracted Product Category"
}
\`\`\`

### Example Inputs and Outputs:

#### **Input:**
User: "Do you have any electronics items?"
#### **Output:**
\`\`\`json
{
    "category": "electronics"
}
\`\`\`

#### **Input:**
User: "Show me all available furniture."
#### **Output:**
\`\`\`json
{
    "category": "furniture"
}
\`\`\`

#### **Input:**
User: "I need accessories for my phone."
#### **Output:**
\`\`\`json
{
    "category": "accessories"
}
\`\`\`

{{recentMessages}}

Extract the product category from the most recent message.
If no valid category is found, return:
\`\`\`json
{
    "error": "No product category found in the message."
}
\`\`\`
`;
