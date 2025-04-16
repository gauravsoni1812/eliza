export const getAllShopifyFilteredProductsTemplate = `Extract product attributes such as color, price range, brand, product type, quantity (limit), and stock availability from the most recent message.
If any attribute is missing, leave it out from the response.
If an attribute doesn't clearly map to color, brand, product, or price (like "cotton", "floral", "organic"), add it to the "tags" array.
If no relevant attributes or tags are found, respond with an error message.

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
    "limit": "Extracted Quantity (if available)",
    "in_stock": "true or false (if stock availability is specified)",
    "tags": ["Array of unstructured attributes (e.g., 'cotton', 'clothes') if any"]
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
User: "Show me all red sneakers below 1000 from Nike that are in stock."
#### **Output:**
\`\`\`json
{
    "color": "red",
    "product": "sneakers",
    "brand": "Nike",
    "price": {
        "operator": "<",
        "value": "1000"
    },
    "in_stock": "true"
}
\`\`\`

#### **Input:**
User: "Find me a black leather jacket under 2000 from Levi's that is available."
#### **Output:**
\`\`\`json
{
    "color": "black",
    "product": "leather jacket",
    "brand": "Levi's",
    "price": {
        "operator": "<",
        "value": "2000"
    },
    "in_stock": "true"
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
User: "Give me all the black shirts you have in stock."
#### **Output:**
\`\`\`json
{
    "color": "black",
    "product": "shirts",
    "in_stock": "true"
}
\`\`\`

#### **Input:**
User: "Give me 15 black shirts under 500 that are out of stock."
#### **Output:**
\`\`\`json
{
    "color": "black",
    "product": "shirts",
    "price": {
        "operator": "<",
        "value": "500"
    },
    "limit": "15",
    "in_stock": "false"
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
User: "I want 4 Nike shoes in stock."
#### **Output:**
\`\`\`json
{
    "product": "shoes",
    "brand": "Nike",
    "limit": "4",
    "in_stock": "true"
}
\`\`\`

#### **Input:**
User: "show me all the shoes you have"
#### **Output:**
\`\`\`json
{
    "product": "shoes"
}
\`\`\`

#### **Input:**
User: "Do you have cotton-only clothes?"
#### **Output:**
\`\`\`json
{
    "tags": ["cotton", "clothes"]
}
\`\`\`

#### **Input:**
User: "Looking for floral summer wear."
#### **Output:**
\`\`\`json
{
    "tags": ["floral", "summer wear"]
}
\`\`\`

#### **Input:**
User: "Show me organic shirts under 800."
#### **Output:**
\`\`\`json
{
    "product": "shirts",
    "price": {
        "operator": "<",
        "value": "800"
    },
    "tags": ["organic"]
}
\`\`\`

#### **Input:**
User: "Any pastel items available?"
#### **Output:**
\`\`\`json
{
    "tags": ["pastel"]
}
\`\`\`

{{recentMessages}}

Extract product attributes from the most recent message.
If no valid attributes or tags are found, return:
\`\`\`json
{
    "error": "No valid product attributes found in the message."
}
\`\`\`
`;
