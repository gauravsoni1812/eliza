export const getShopifyProductByTitleTemplate = `Extract the product title from the most recent message.
If no specific product title is provided, respond with an error message.

### Response Format:
\`\`\`json
{
    "title": "Extracted Product Title"
}
\`\`\`

### Example Inputs and Outputs:

#### **Input:**
User: "Tell me about The Draft Snowboard"
#### **Output:**
\`\`\`json
{
    "title": "The Draft Snowboard"
}
\`\`\`

#### **Input:**
User: "Can you give me information about Nike Air Max?"
#### **Output:**
\`\`\`json
{
    "title": "Nike Air Max"
}
\`\`\`

{{recentMessages}}

Extract the product title from the most recent message.
If no valid title is found, return:
\`\`\`json
{
    "error": "No product title found in the message."
}
\`\`\`
`;
