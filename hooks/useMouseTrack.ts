import classNames from "classnames";
import Image from "next/image";
import { useEffect, useState } from "react";


export default function useMouseTrack() {
  const [mouseX, setMouseX] = useState<number>(0)
  const [mouseY, setMouseY] = useState<number>(0)

  useEffect(() => {
    const body = document.querySelector('body')
    const doc = document.documentElement
    body?.addEventListener('mousemove', (e) => {
      setMouseX(e.clientX)
      // doc.style.setProperty('--mouse-x', `${e.clientX}px`)
      setMouseY(e.clientY)
      // doc.style.setProperty('--mouse-y', `${e.clientY}px`)
    })
    // return body?.removeEventListener('mousemove')
  }, [])

  return { mouseX, mouseY }
}