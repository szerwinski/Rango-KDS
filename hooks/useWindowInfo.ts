import classNames from "classnames";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";


export default function useWindowInfo() {
  const [scrollY, setScrollY] = useState<number>(0)
  const [screenHeight, setScreenHeight] = useState<number>(0)
  const [screenWidth, setScreenWidth] = useState<number>(0)
  // TO DO: fix viewport height
  const [viewportHeight, setViewportHeight] = useState<number>(0)

  const isSM = useMemo(() => {
    return screenWidth < 768
  }, [screenWidth])

  const isMD = useMemo(() => {
    return screenWidth < 1366
  }, [screenWidth])

  function handleScroll() {
    setScrollY(window.scrollY)
  }
  function handleResize() {
    setScreenWidth(window.innerWidth)
    setViewportHeight(Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0, window.screen.height || 0))
    setScreenHeight(window.innerHeight)
    const doc = document.documentElement
    doc.style.setProperty('--doc-height', `${window.innerHeight}px`)
  }

  useEffect(() => {
    const doc = document.documentElement
    setScrollY(window.scrollY)
    setScreenHeight(window.innerHeight)
    setScreenWidth(window.innerWidth)
    doc.style.setProperty('--doc-height', `${window.innerHeight}px`)
    // subscribe event
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)
    return () => {
      // unsubscribe event
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return { scrollY, screenHeight, viewportHeight, screenWidth, isSM, isMD }
}