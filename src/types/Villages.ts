import SubDistrictsTypes from "./SubDistricts";

export default interface VillagesTypes {
    id: string;
    sub_district_id: string;
    village_nm: string;
    sub_district: SubDistrictsTypes;
}
