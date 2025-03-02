import classNames from "classnames";
import Image from "next/image";
import { useEffect, useState } from "react";


export default function useHasReachedBottom({ divID, divHeight, scrollY }: { divID: string, divHeight: number, scrollY: number }) {
  const [offsetTop, setOffsetTop] = useState(0);
  const [scrollInsideDiv, setScrollInsideDiv] = useState(0);
  const [bottomReached, setBottomReached] = useState(false);

  useEffect(() => {
    const div: any = document.querySelector("#" + divID);
    if (div === null) return;
    setOffsetTop(div.offsetTop)
    setScrollInsideDiv(scrollY - div.offsetTop)
    if (div.offsetTop + divHeight <= scrollY + window.innerHeight) {
      setBottomReached(true);
    } else {
      setBottomReached(false);
    }
  }, [scrollY]);


  return { bottomReached, scrollInsideDiv, divHeight, offsetTop };
}