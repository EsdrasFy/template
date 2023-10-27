"use client";
import { Input } from "@chakra-ui/react";

import { ChakraProvider } from "@chakra-ui/react";
import React from "react";

interface inputProps {
  type: string;
  label: string;
  name: string;
  register: Function;
  maxLength?: number;
  required?: boolean;
  classname?: string;
  pleaceholder: string;
  error?: string;
}

function InputUi({
  type,
  label,
  register,
  name,
  required,
  maxLength,
  classname,
  pleaceholder,
  error,
}: inputProps) {
  return (
    <ChakraProvider>
      <label className={` mb-2 text-sm text-textColor`} htmlFor={name}>
        {label}
      </label>
      <Input
        type={type}
        padding="24px 0"
        placeholder={pleaceholder}
        id={name}
        borderWidth="2px"
        paddingLeft="10px"
        borderRadius={"4px"}
        focusBorderColor={"#ed145b"}
        className={`${classname} ${error ? "mb-0" : "mb-4"}`}
        {...register(`${name}`, { required, maxLength })}
      />
      <span
        className={`text-red text-sm italic text-right mr-2 ${
          error ? "mb-0" : "mb-0"
        }`}
      >
        {error}
      </span>
    </ChakraProvider>
  );
}

export default InputUi;
