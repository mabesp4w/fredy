import CategoriesTypes from "./Categories";

// SubCategories
export default interface SubCategoriesTypes {
    id: string;
    category_id: string;
    sub_category_nm: string;
    slug: string;
    category: CategoriesTypes;
}
