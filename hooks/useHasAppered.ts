import classNames from "classnames";
import Image from "next/image";
import { useEffect, useId, useState } from "react";

interface UseHasAppearedProps {
  onAppear?: (element: Element) => void
}


export default function useHasAppeared(props?: UseHasAppearedProps): { divID: string, appeared: boolean } {
  const id = useId()
  const [appeared, setAppeared] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      // Loop over the entries
      entries.forEach(entry => {
        // If the element is visible
        if (entry.isIntersecting) {
          if (props?.onAppear) props.onAppear(entry.target)
          setAppeared(true)
        }
      });
    });

    const element = document.getElementById(id)
    if (element) observer.observe(element);
  }, [])

  return { divID: id, appeared };
}