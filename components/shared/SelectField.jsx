"use client";

import Select from "react-select";

export default function SelectField({
  name,
  label,
  isDisabled = false,
  isSearchable = false,
  isClearable = false,
  isMulti = false,
  onChange,
  options,
  placeholder,
  value,
  defaultValue,
  isFocused = true,
}) {
  return (
    <div className="flex flex-col">
      <label
        htmlFor={name}
        className="mb-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
      <Select
        name={name}
        isDisabled={isDisabled}
        isSearchable={isSearchable}
        isClearable={isClearable}
        isMulti={isMulti}
        options={options}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        isFocused={isFocused}
        styles={{
          control: (baseStyles, { isFocused }) => ({
            ...baseStyles,
            boxShadow: "none",
            borderRadius: "6px",
            paddingTop: "1px",
            paddingBottom: "1px",
            zIndex: "0",
            borderColor: isFocused ? "#020817" : "#e5e7eb",
            ":hover": {
              borderColor: isFocused ? "#020817" : "#e5e7eb",
            },
          }),
          option: (baseStyles, { isFocused }) => ({
            backgroundColor: isFocused ? "#020817" : "#fff",
            padding: "8px",
            color: isFocused ? "#fff" : "#020817",
            cursor: "default",
          }),
          menu: (provided) => ({
            ...provided,
            backgroundColor: "white",
            zIndex: "9999",
          }),
          input: (baseStyles) => ({
            ...baseStyles,
            "input:focus": {
              boxShadow: "none",
            },
            zIndex: "0",
          }),
        }}
      />
    </div>
  );
}
