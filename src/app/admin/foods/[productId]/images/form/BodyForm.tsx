import InputMultiFiles from "@/components/input/InputMultiFiles";
import InputTextDefault from "@/components/input/InputTextDefault";
import ProductImagesTypes from "@/types/ProductImages";
import { FC } from "react";

type Props = {
    register: any;
    errors: ProductImagesTypes;
    dtEdit: ProductImagesTypes | null;
    control: any;
    watch: any;
    setValue: any;
    showModal: boolean;
};
// productImages
const BodyForm: FC<Props> = ({ register, errors, setValue, watch, dtEdit }) => {
    return (
        <>
            <InputTextDefault
                label="Posisi"
                name="position"
                register={register}
                required
                type="number"
                min={1}
                errors={errors.position}
                addClass="col-span-8"
            />
            <InputMultiFiles
                label="Gambar"
                name="product_img"
                register={register}
                addClass="col-span-8"
                setValue={setValue}
                required={!dtEdit?.product_img}
                errors={errors.product_img}
                fileEdit={[dtEdit?.product_img]}
                initialValue={dtEdit?.product_img || ""}
                watch={watch}
                accept={"image/*"}
            />
        </>
    );
};

export default BodyForm;
