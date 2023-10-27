import React from "react";
import Congratulations from "./animations/congratulations";
import Link from "next/link";
import * as BiIcons from "react-icons/bi";
const iconsMap = {
  BiCheckShield: BiIcons.BiCheckShield,
  BiErrorAlt: BiIcons.BiErrorAlt,
};
interface ModalIconProps {
  closeModal?: () => void;
  icon: "BiCheckShield" | "BiErrorAlt";
  content?: string;
  contentButton?: string;
  classname?: string;
  error?: string;
  href: boolean;
}
function Successfully({
  icon,
  contentButton,
  content,
  href,
  closeModal,
}: ModalIconProps) {
  const Icon = iconsMap[icon];
  return (
    <div className="w-2/3 bg-grayOne py-12 flex flex-col items-center justify-center text-center gap-6 rounded shadow-snipped">
      <Icon
        className={`text-white text-8xl  ${
          icon === "BiCheckShield" ? "bg-green/25" : "bg-pink/50"
        } p-4 rounded-full`}
      />
      <h2 className="text-3xl font-bold text-white ">
        {icon === "BiCheckShield" ? "Successfully!" : "Error!"}
      </h2>
      <p className="text-white/70">{content}</p>
      {href ? (
        <Link
          href="/"
          className=" bg-textColor w-[75%] py-3 rounded text-xl font-bold"
        >
          {contentButton}
        </Link>
      ) : (
        <button
          onClick={closeModal}
          className=" bg-textColor w-[75%] py-3 rounded text-xl font-bold"
        >
          {contentButton}
        </button>
      )}
    </div>
  );
}

export default Successfully;
