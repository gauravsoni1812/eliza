import { IAgentRuntime } from "@elizaos/core";
import { z } from "zod";

export const shopifyEnvSchema = z.object({
    SHOPIFY_ACCESS_TOKEN: z.string().min(1, "Shopify API key is required"),
    SHOPIFY_STORE_NAME:z.string().min(1,"Shopify store name is required"),
    SHOPIFY_STOREFRONT_ACCESS_TOKEN:z.string().min(1,"Shopify access token is required")
});

export type shopifyConfig = z.infer<typeof shopifyEnvSchema>;

export async function validateShopifyConfig(
    runtime: IAgentRuntime
): Promise<shopifyConfig> {
    try {
        const config = {
            SHOPIFY_ACCESS_TOKEN: process.env.SHOPIFY_ACCESS_TOKEN || runtime.getSetting("shopifyToken"),
            SHOPIFY_STORE_NAME: process.env.SHOPIFY_STORE_NAME || runtime.getSetting("shopifyStoreName"),
            SHOPIFY_STOREFRONT_ACCESS_TOKEN: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || runtime.getSetting("shopifyStorefrontToken"),
        };
        return shopifyEnvSchema.parse(config);
    } catch (error) {
        console.log("error::::", error)
        if (error instanceof z.ZodError) {
            const errorMessages = error.errors
                .map((err) => `${err.path.join(".")}: ${err.message}`)
                .join("\n");
            throw new Error(
                `Shopify API configuration validation failed:\n${errorMessages}`
            );
        }
        throw error;
    }
}