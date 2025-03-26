const BASE_URL = "https://{SHOPIFY_STORE_NAME}.myshopify.com/admin/api/2024-04";
const STOREFRONT_API_URL = `https://{SHOPIFY_STORE_NAME}.myshopify.com/api/2024-04/graphql.json`;

export const createShopifyService = (
    accessToken: string,
    storeName: string
) => {
    if (!accessToken || !storeName) {
        throw new Error("Invalid Shopify API credentials");
    }

    const getAllProducts = async (): Promise<string[]> => {
        try {
            const query = `
        {
            products(first: 20) {
                edges {
                    node {
                        title
                    }
                }
            }
        }`;

            const response = await fetch(
                STOREFRONT_API_URL.replace("{SHOPIFY_STORE_NAME}", storeName),
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Shopify-Storefront-Access-Token": accessToken,
                    },
                    body: JSON.stringify({ query }),
                }
            );

            const responseData = await response.json();

            if (responseData.errors) {
                console.error("Shopify API Error:", responseData.errors);
                throw new Error(responseData.errors[0].message);
            }

            return responseData.data.products.edges.map(
                (edge: any) => edge.node.title
            );
        } catch (error: any) {
            console.error("Shopify API Error:", error.message);
            throw error;
        }
    };

    const getProductByTitle = async (title: string): Promise<any> => {
        try {
            const query = `
        query getProductByTitle($title: String!) {
            products(first: 1, query: $title) {
                edges {
                    node {
                        id
                        title
                        descriptionHtml
                        handle
                        vendor
                        featuredImage{
                            url
                        }
                        totalInventory
                        variants(first: 5) {
                           edges {
                            node {
                                id
                                  price {
                                    amount
                                    currencyCode
                                  }
                               }
                            }
                        }
                    }
                }
            }
        }`;

            const variables = { title };

            const response = await fetch(
                STOREFRONT_API_URL.replace("{SHOPIFY_STORE_NAME}", storeName),
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Shopify-Storefront-Access-Token": accessToken,
                    },
                    body: JSON.stringify({ query, variables }),
                }
            );

            const responseData = await response.json();

            if (responseData.errors) {
                console.error("Shopify API Error:", responseData.errors);
                throw new Error(responseData.errors[0].message);
            }

            const productEdge = responseData.data.products.edges[0];

            return productEdge ? productEdge.node : null;
        } catch (error: any) {
            console.error("Shopify API Error:", error.message);
            throw error;
        }
    };

    const getProductsByCategory = async (category: string): Promise<any[]> => {
        try {
            const url = `${BASE_URL.replace("{SHOPIFY_STORE_NAME}", storeName)}/products.json?product_type=${encodeURIComponent(category)}`;
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "X-Shopify-Access-Token": accessToken,
                },
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error?.errors || response.statusText);
            }

            const data = await response.json();
            return data.products; // Returns an array of matching products
        } catch (error: any) {
            console.error("Shopify API Error:", error.message);
            throw error;
        }
    };

    const getAllCategories = async (): Promise<any> => {
        try {
            const url = `${BASE_URL.replace("{SHOPIFY_STORE_NAME}", storeName)}/products.json`;
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "X-Shopify-Access-Token": accessToken,
                },
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error?.errors || response.statusText);
            }

            const data = await response.json();
            return data.products; // Returns an array of products
        } catch (error: any) {
            console.error("Shopify API Error:", error.message);
            throw error;
        }
    };

    const getAllFilteredProducts = async (filters: {
        color?: string;
        product?: string;
        price?: { operator: ">" | "<" | "="; value: number };
        brand?: string;
        limit?: number;
        in_stock?: boolean;
    }): Promise<any[]> => {
        let queryString = "";

        if (filters.color) {
            queryString += `tag:${filters.color} `;
        }

        if (filters.product) {
            queryString += `${filters.product} `;
        }

        if (filters.brand) {
            queryString += `vendor:${filters.brand} `;
        }

        // Default to 10 products if no limit is provided
        const limit = filters.limit ?? 10;

        const query = `
    query($query: String!) {
      products(first: ${limit}, query: $query) {
        edges {
          node {
            id
            title
            vendor
            handle
            tags
            images(first: 1) {
              edges {
                node {
                  altText
                  originalSrc
                }
              }
            }
            variants(first: 5) {
              edges {
                node {
                  id
                  title
                  price {
                    amount
                  }
                  quantityAvailable
                  selectedOptions {
                    name
                    value
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

        const response = await fetch(
            STOREFRONT_API_URL.replace("{SHOPIFY_STORE_NAME}", storeName),
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Shopify-Storefront-Access-Token": accessToken,
                },
                body: JSON.stringify({
                    query,
                    variables: { query: queryString.trim() },
                }),
            }
        );

        const responseData = await response.json();

        if (responseData.errors) {
            console.error("Shopify API Error:", responseData.errors);
            throw new Error(responseData.errors[0].message);
        }

        let products = responseData.data.products.edges.map(
            (edge: any) => edge.node
        );

        console.log(products, "This is products before");
        if (filters.in_stock) {
            products = products.filter(
                (product: any) =>
                    product.variants.edges[0].node.quantityAvailable > 0
            );
        }

        console.log(products, "this is products after");
        if (filters.price) {
            products = products.filter((product: any) => {
                const productPrice = parseFloat(
                    product.variants.edges[0]?.node.price.amount || "0"
                );
                switch (filters.price!.operator) {
                    case ">":
                        return productPrice > filters.price!.value;
                    case "<":
                        return productPrice < filters.price!.value;
                    case "=":
                        return productPrice === filters.price!.value;
                }
            });
        }

        return products;
    };

   const getAllDiscounts = async (): Promise<any> => {
    try {
        const query = `query {
    codeDiscountNodes(first: 3) {
      nodes {
        id
        codeDiscount {
          ... on DiscountCodeBasic {
            title
            summary
          }
          ... on DiscountCodeBxgy {
            title
            codesCount {
              count
            }
          }
        }
      }
    }
  }`;

        const response = await fetch(
            `https://${storeName}.myshopify.com/admin/api/2025-01/graphql.json`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Shopify-Access-Token": accessToken,
                },
                body: JSON.stringify({ query }),
            }
        );

        const responseData = await response.json();
      console.log(responseData,"This is response data ")
        if (responseData.errors) {
            console.error("Shopify API Error:", responseData.errors);
            throw new Error(responseData.errors[0].message);
        }

        return responseData?.data?.codeDiscountNodes?.nodes || [];
    } catch (error: any) {
        console.error("Shopify API Error:", error.message);
        throw error;
    }
};

    return {
        getAllProducts,
        getProductByTitle,
        getProductsByCategory,
        getAllCategories,
        getAllFilteredProducts,
        getAllDiscounts,
    };
};
