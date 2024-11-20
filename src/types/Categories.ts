import SubCategoriesTypes from "./SubCategories";

export default interface CategoriesTypes {
    id: string;
    category_nm: string;
    slug: string;
    sub_category: SubCategoriesTypes[];
}
