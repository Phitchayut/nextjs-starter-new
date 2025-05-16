"use client";

import { getRolesSetting } from "@/services/setting/setting.service";
import { useSettingStore } from "@/store/setting/settingStore";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

// const animatedComponents = makeAnimated();

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
const ReactSelectOption = (selected: { value: any }) => {
  // useEffect(() => {
  //   getRolesSetting(2);
  // }, []);
  const { roles } = useSettingStore();
  console.log("roles: ", roles);
  const roleOption: OptionType[] = roles.map((role: any) => ({
    value: role.role_id,
    label: role.role_name,
  }));
  const defaultSelected = roleOption.filter(option => selected.value?.role_id === option.value);

  return (
    <div>
      <Select isClearable={false} defaultValue={defaultSelected} styles={styles} isMulti name="colors" options={roleOption} className="react-select" classNamePrefix="select" />
    </div>
  );
};

export default ReactSelectOption;
