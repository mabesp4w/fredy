import { FC, useEffect, useState } from "react";
import Select, { StylesConfig } from "react-select";
import { Controller } from "react-hook-form";

type Props = {
    label?: string;
    control: any;
    required?: boolean;
    name: string;
    errors?: any;
    addClass: any;
    menuPosition?: string;
    placeholder?: string;
    options: any[];
};

const SelectDef: FC<Props> = ({
    label,
    control,
    required,
    name,
    errors,
    addClass,
    menuPosition = "fixed" as any,
    placeholder = "Pilih...",
    options = [],
}) => {
    const [menuPortalTarget, setMenuPortalTarget] = useState<any>(null);
    useEffect(() => {
        // Pastikan kode ini hanya dijalankan di lingkungan browser
        if (typeof document !== "undefined") {
            setMenuPortalTarget(document.body);
        }
    }, []);
    const styles: StylesConfig<any, true> = {
        menuPortal: (base) => ({
            ...base,
            zIndex: 9999,
            pointerEvents: "auto",
        }),
        multiValue: (base, state) => {
            return state.data.isFixed
                ? { ...base, backgroundColor: "gray" }
                : base;
        },
        multiValueLabel: (base, state) => {
            return state.data.isFixed
                ? {
                      ...base,
                      fontWeight: "bold",
                      color: "white",
                      paddingRight: 6,
                  }
                : base;
        },
        multiValueRemove: (base, state) => {
            return state.data.isFixed ? { ...base, display: "none" } : base;
        },
    };
    return (
        <div className={addClass}>
            {label && (
                <label className="text-sm font-medium text-gray-700 tracking-wide">
                    {label}
                </label>
            )}
            {required && <span className="ml-1 text-red-600">*</span>}
            {menuPortalTarget && (
                <Controller
                    name={name}
                    control={control}
                    rules={{ required }}
                    render={({ field: { onChange, value, ref } }) => (
                        <Select
                            isClearable={true}
                            isSearchable={true}
                            options={options}
                            placeholder={placeholder}
                            menuPosition={menuPosition}
                            ref={ref}
                            value={
                                value
                                    ? options.find(
                                          (option) => option.value === value
                                      )
                                    : value
                            }
                            onChange={(option: any) =>
                                onChange(option ? option.value : option)
                            }
                            menuPortalTarget={
                                menuPortalTarget ? document.body : null
                            }
                            styles={styles}
                        />
                    )}
                />
            )}
            {errors?.type === "required" && (
                <p className="text-red-500 font-inter italic text-sm">
                    Tahun tidak boleh kosong
                </p>
            )}
        </div>
    );
};

export default SelectDef;
