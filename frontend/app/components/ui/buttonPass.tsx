"use client";
import { Input, InputRightElement, Button, InputGroup } from "@chakra-ui/react";

import { ChakraProvider } from "@chakra-ui/react";

import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
interface buttonPassProps {
  show: boolean;
  name: string;
  label: string;
  classname: string;
  register: Function;
  handleClick: () => void;
  error?: string;
}
function ButtonPass({
  show,
  handleClick,
  name,
  label,
  classname,
  register,
  error,
}: buttonPassProps) {
  return (
    <ChakraProvider>
      <label className="mb-2 text-sm text-textColor " htmlFor={name}>
        {label}
      </label>
      <InputGroup>
        <Input
          pr="4.5rem"
          padding="24px 10px"
          type={show ? "text" : "password"}
          placeholder="Enter password"
          borderWidth="2px"
          borderRadius={"4px"}
          focusBorderColor={"#ed145b"}
          className={`${classname}`}
          {...register(`${name}`)}
        />
        <InputRightElement width="4.5rem">
          <Button
            h="1.75rem"
            background="none"
            onClick={handleClick}
            _hover={{ background: "none" }}
          >
            <div className="group">
              {!show ? (
                <FaEye
                  style={{ fontSize: "25px" }}
                  className="text-grayThree translate-y-[20%] group-hover:text-pink duration-300 ease-in-out"
                />
              ) : (
                <FaEyeSlash
                  style={{ fontSize: "25px" }}
                  className=" text-grayThree translate-y-[20%] group-hover:text-pink duration-300 ease-in-out"
                />
              )}
            </div>
          </Button>
        </InputRightElement>
      </InputGroup>
      <span
        className={`text-red text-sm italic text-right mr-2 ${
          error ? "mb-7" : "mb-0"
        }`}
      >
        {error}
      </span>
    </ChakraProvider>
  );
}

export default ButtonPass;
