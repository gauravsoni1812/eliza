export const getAllShopifyFilteredProductsTemplate = `Extract product attributes such as color, price range, brand, product type, and quantity (limit) from the most recent message.
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
    },
    "limit": "Extracted Quantity (if available)"
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
User: "Give me all the products of brand Pence"
#### **Output:**
\`\`\`json
{
    "brand": "Pence"
}
\`\`\`

#### **Input:**
User: "Give me all the black shirts you have"
#### **Output:**
\`\`\`json
{
    "color": "black",
    "product": "shirts"
}
\`\`\`

#### **Input:**
User: "Give me 15 black shirts under 500"
#### **Output:**
\`\`\`json
{
    "color": "black",
    "product": "shirts",
    "price": {
        "operator": "<",
        "value": "500"
    },
    "limit": "15"
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

#### **Input:**
User: "I want 4 Nike shoes."
#### **Output:**
\`\`\`json
{
    "product": "shoes",
    "brand": "Nike",
    "limit": "4"
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
