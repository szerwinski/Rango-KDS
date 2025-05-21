import classNames from "classnames";
import Image from "next/image";
import { useEffect, useId, useState } from "react";

interface UseHasAppearedProps {
  onDisapper?: (element: Element, disapper: boolean) => void
  id: string | undefined
}


export default function useHasDisappeared(props?: UseHasAppearedProps): { divID: string, disapper: boolean } {
  const id = props?.id ?? useId()
  const [disapper, setDisapper] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      // Loop over the entries
      entries.forEach(entry => {
        // If the element is visible
        if (entry.isIntersecting) {
          setDisapper(false)
          if (props?.onDisapper) props.onDisapper(entry.target, false)
        } else {
          setDisapper(true)
          if (props?.onDisapper) props.onDisapper(entry.target, true)
        }
      });
    });
    const element = document.getElementById(id)
    if (element) observer.observe(element);
  }, [])

  return { divID: id, disapper };
}