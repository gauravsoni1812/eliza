const BASE_URL = "https://{SHOPIFY_STORE_NAME}.myshopify.com/admin/api/2024-04";

export const createShopifyService = (accessToken: string, storeName: string) => {
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

    return { getAllProducts, getProductByTitle };
};
