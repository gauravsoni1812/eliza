export const getShopifyProductAvailabilityTemplate = `Extract the product title from the most recent message.
If no specific product title is provided, respond with an error message.

### Response Format:
\`\`\`json
{
    "title": "Extracted Product Title"
}
\`\`\`

### Example Inputs and Outputs:

#### **Case 1: Simple Product Name**
**Input:**
User: "Is The Draft Snowboard available?"
**Output:**
\`\`\`json
{
    "title": "The Draft Snowboard"
}
\`\`\`

---

#### **Case 2: Common Availability Check**
**Input:**
User: "Do we have Nike Air Max in stock?"
**Output:**
\`\`\`json
{
    "title": "Nike Air Max"
}
\`\`\`

---

#### **Case 3: Product Inquiry Without Exact Title**
**Input:**
User: "Can you check if we have a coffee machine?"
**Output:**
\`\`\`json
{
    "title": "coffee machine"
}
\`\`\`

---

#### **Case 4: Availability Query Without Context**
**Input:**
User: "Check availability for this item."
**Output:**
\`\`\`json
{
    "error": "No product title found in the message."
}
\`\`\`

---

#### **Case 5: Multiple Product Mentions**
**Input:**
User: "Do we have PlayStation 5 or Xbox Series X in stock?"
**Output:**
\`\`\`json
{
    "title": "PlayStation 5"
}
\`\`\`
*(Only the first product is extracted; further logic can handle multiple products if required.)*

---

#### **Case 6: Vague Inquiry Without a Product Name**
**Input:**
User: "Can you tell me if this product is available?"
**Output:**
\`\`\`json
{
    "error": "No product title found in the message."
}
\`\`\`

---

#### **Case 7: Direct Question Without Context**
**Input:**
User: "Do you have it in stock?"
**Output:**
\`\`\`json
{
    "error": "No product title found in the message."
}
\`\`\`

---

#### **Case 8: Availability Check with Extra Words**
**Input:**
User: "I was wondering if you have the Adidas Superstar sneakers right now?"
**Output:**
\`\`\`json
{
    "title": "Adidas Superstar"
}
\`\`\`

---

#### **Case 9: User Asks About Categories Instead of Products**
**Input:**
User: "Do we have any laptops available?"
**Output:**
\`\`\`json
{
    "title": "laptops"
}
\`\`\`
*(If category filtering is not supported, an additional check can handle this.)*

---

#### **Case 10: Availability Check with Typo**
**Input:**
User: "Is the IPhone avialble?"
**Output:**
\`\`\`json
{
    "title": "iPhone"
}
\`\`\`
*(Can be improved with spell correction if needed.)*

---

{{recentMessages}}

Extract the product title from the most recent message.
If no valid title is found, return:
\`\`\`json
{
    "error": "No product title found in the message."
}
\`\`\`
`;
