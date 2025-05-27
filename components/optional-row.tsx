import { useState } from "react";
import { FB, SD } from "./base";
import { H1, H3, H4, P1, P2 } from "./typography";
import classNames from "classnames";
import { Option } from "../model";

interface OptionalRowProps {
  className?: string;
  showBottomDivider?: boolean;
  option: Option;
}

export default function OptionalRow({
  className,
  option,
  showBottomDivider,
  ...props
}: OptionalRowProps) {
  const classes = classNames(
    "px-4 py-2 my-1 gap-2",
    { "border-b-[1px] border-[lightGray]": showBottomDivider },
    className,
  );

  return (
    <FB ha="space-between" fd="row" w="w-full" className={classes}>
      <P1>{option.name}</P1>
      {option.price != null && option.price != 0 ? (
        <P2>R$ {option.price?.toFixed(2).replace(".", ",")}</P2>
      ) : (
        <></>
      )}
    </FB>
  );
}
