import { Plugin } from "@elizaos/core";
import { getShopifyProductsAction } from "./actions/getAllProducts";
import { getShopifyProductByTitleAction } from "./actions/getShopifyProductbyTitle";
import { checkShopifyProductAvailabilityAction } from "./actions/checkProductAvailabilty";
import { getShopifyProductsByCategoryAction } from "./actions/getShopifyProductsByCategory";
import { getAllFilteredProductsAction } from "./actions/getShopifyFilteredProduct";

export const shopifyPlugin: Plugin = {
    name: "shopify",
    description: "Shopify plugin for 48 pakvaan store",
    actions: [
        getShopifyProductsAction,
        getShopifyProductByTitleAction,
        checkShopifyProductAvailabilityAction,
        getShopifyProductsByCategoryAction,
        getAllFilteredProductsAction,
    ],
    // evaluators analyze the situations and actions taken by the agent. they run after each agent action
    // allowing the agent to reflect on what happened and potentially trigger additional actions or modifications
    evaluators: [],
    // providers supply information and state to the agent's context, help agent access necessary data
    providers: [],
};
export default shopifyPlugin;