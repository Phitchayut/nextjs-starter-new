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

// start component
const ReactSelectOption = () => {
  const { roles } = useSettingStore();
  const roleOption: OptionType[] = roles.map((role: any) => ({
    value: role,
    label: role,
  }));

  return (
    <div className="grid lg:grid-cols-1 grid-cols-1 gap-5">
      <div>
         <Select isClearable={false} closeMenuOnSelect={false} components={animatedComponents}  isMulti options={roleOption} styles={styles} className="react-select" classNamePrefix="select" /> {/*defaultValue={[roleOption]}*/}
      </div>
    </div>
  );
};

export default ReactSelectOption;
