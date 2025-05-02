"use client";

import { useSettingStore } from "@/store/setting/settingStore";
import React, { useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

interface OptionType {
  value: string;
  label: string;
  isFixed?: boolean;
  icon?: string;
}

const fruits: OptionType[] = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
  { value: "orange", label: "Orange" },
  { value: "apple", label: "Apple" },
];

const animatedComponents = makeAnimated();

const styles = {
  multiValue: (base: any, state: any) => {
    return state.data.isFixed ? { ...base, opacity: "0.5" } : base;
  },
  multiValueLabel: (base: any, state: any) => {
    return state.data.isFixed ? { ...base, color: "#626262", paddingRight: 6 } : base;
  },
  multiValueRemove: (base: any, state: any) => {
    return state.data.isFixed ? { ...base, display: "none" } : base;
  },
  option: (provided: any, state: any) => ({
    ...provided,
    fontSize: "14px",
  }),
};
const orderOptions = (values: OptionType[]) => {
  if (values.length > 0) return values.filter(v => v.isFixed).concat(values.filter(v => !v.isFixed));
};

// start component
const ReactSelectOption = () => {
  const [fixedValue, setFixedValue] = useState(orderOptions([fruits[0], fruits[1]]));
  const { roles, loading, error, deleteUsersSetting, getRolesSetting } = useSettingStore();
  console.log("roles react: ", roles);

  return (
    <div className="grid lg:grid-cols-1 grid-cols-1 gap-5">
      <div>
        <Select isClearable={false} closeMenuOnSelect={false} components={animatedComponents} defaultValue={[fruits[4], fruits[5]]} isMulti options={fruits} styles={styles} className="react-select" classNamePrefix="select" />
      </div>
    </div>
  );
};

export default ReactSelectOption;
