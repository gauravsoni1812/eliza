export const getAllShopifyFilteredProductsTemplate = `Extract product attributes such as color, price range, brand, and product type from the most recent message.
If any attribute is missing, leave it out from the response.
If no relevant attributes are found, respond with an error message.

### Response Format:
\`\`\`json
{
    "color": "Extracted Color (if available)",
    "product": "Extracted Product Name or Type",
    "brand": "Extracted Brand Name (if available)",
    "price": {
        "operator": "< or > or =",
        "value": "Extracted Price (if available)"
    }
}
\`\`\`

### Example Inputs and Outputs:

#### **Input:**
User: "I want a blue denim shirt with a price less than 500 of Zara."
#### **Output:**
\`\`\`json
{
    "color": "blue",
    "product": "denim shirt",
    "brand": "Zara",
    "price": {
        "operator": "<",
        "value": "500"
    }
}
\`\`\`

#### **Input:**
User: "Show me all red sneakers below 1000 from Nike."
#### **Output:**
\`\`\`json
{
    "color": "red",
    "product": "sneakers",
    "brand": "Nike",
    "price": {
        "operator": "<",
        "value": "1000"
    }
}
\`\`\`

#### **Input:**
User: "Find me a black leather jacket under 2000 from Levi's."
#### **Output:**
\`\`\`json
{
    "color": "black",
    "product": "leather jacket",
    "brand": "Levi's",
    "price": {
        "operator": "<",
        "value": "2000"
    }
}
\`\`\`

#### **Input:**
User: "I need a white cotton t-shirt for less than 300."
#### **Output:**
\`\`\`json
{
    "color": "white",
    "product": "cotton t-shirt",
    "price": {
        "operator": "<",
        "value": "300"
    }
}
\`\`\`

{{recentMessages}}

Extract product attributes from the most recent message.
If no valid attributes are found, return:
\`\`\`json
{
    "error": "No valid product attributes found in the message."
}
\`\`\`
`;
