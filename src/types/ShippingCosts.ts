import VillagesTypes from "./Villages";

export default interface ShippingCostsTypes {
    id: string;
    village_id: string;
    shipping_cost: number;
    village: VillagesTypes;
}
