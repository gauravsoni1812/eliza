const BASE_URL = "https://{SHOPIFY_STORE_NAME}.myshopify.com/admin/api/2024-04";
const STOREFRONT_API_URL = `https://{SHOPIFY_STORE_NAME}.myshopify.com/api/2024-04/graphql.json`;

export const createShopifyService = (
    accessToken: string,
    storeName: string
) => {
    if (!accessToken || !storeName) {
        throw new Error("Invalid Shopify API credentials");
    }

    const getAllProducts = async (): Promise<any> => {
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

    const getProductByTitle = async (title: string): Promise<any> => {
        try {
            const url = `${BASE_URL.replace("{SHOPIFY_STORE_NAME}", storeName)}/products.json?title=${encodeURIComponent(title)}`;
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
            return data.products.length ? data.products[0] : null; // Returns the first matching product or null
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

        const query = `
          query($query: String!) {
            products(first: 20, query: $query) {
              edges {
                node {
                  id
                  title
                  vendor
                  tags
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

        // Additional price filtering (client-side)
        if (filters.price) {
            products = products.filter((product: any) => {
                const productPrice = parseFloat(
                    product.variants.edges[0].node.price.amount
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

    return {
        getAllProducts,
        getProductByTitle,
        getProductsByCategory,
        getAllCategories,
        getAllFilteredProducts,
    };
};
