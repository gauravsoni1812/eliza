export const getAllShopifyFashionRecomendation  = `Extract product attributes such as color, price range, brand, product type, quantity (limit), stock availability, size, and style or design from the most recent message.
If any attribute is missing, leave it out from the response.
If no relevant attributes are found, respond with an error message.

The input might be a suggestion, recommendation, or description. Extract only relevant attributes such as product (e.g. "dress", "heels"), color (e.g. "black"), style (e.g. "elegant", "subtle"), etc.

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
    "size": "Extracted Size (if available)",
    "style": "Extracted Style or Design (if available)"
}
\`\`\`

### Example Inputs and Outputs:

#### **Input:**
"For a stylish evening date night, consider these outfit ideas:

1. Classic Elegance: A little black dress paired with elegant heels and subtle jewelry.
2. Casual Chic: A stylish blouse with tailored trousers and ankle boots. Add a statement necklace for flair.
3. Modern Glam: A sleek jumpsuit with a bold belt and strappy sandals."

#### **Output:**
\`\`\`json
[
    {
        "color": "black",
        "product": "dress",
        "style": "elegant"
    },
    {
        "product": "heels",
        "style": "elegant"
    },
    {
        "product": "jewelry",
        "style": "subtle"
    },
    {
        "product": "blouse",
        "style": "stylish"
    },
    {
        "product": "jumpsuit",
        "style": "sleek"
    },
    {
        "product": "belt",
        "style": "bold"
    },
    {
        "product": "sandals",
        "style": "strappy"
    }
]
\`\`\`

#### **Input:**
"I'm looking for a cozy oversized hoodie in pastel colors, preferably something soft and comfy."
#### **Output:**
\`\`\`json
{
    "product": "hoodie",
    "style": "oversized",
    "color": "pastel"
}
\`\`\`

#### **Input:**
"Suggest some formal shoes for office with a sleek design."
#### **Output:**
\`\`\`json
{
    "product": "formal shoes",
    "style": "sleek"
}
\`\`\`

If no valid product attributes are found, return:
\`\`\`json
{
    "error": "No valid product attributes found in the message."
}
\`\`\`

{{recentMessages}}

Extract product attributes from the most recent message.
`;
