import { useRef, useEffect, useCallback } from "react";
import { useUserStore } from "../hooks";

export const useLazyLoading = (pixelsForUpload = 200) => {
  const { nextPaginationPage } = useUserStore();
  const scrollPositionRef = useRef(pixelsForUpload);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    if (scrollY >= scrollPositionRef.current + pixelsForUpload) {
      nextPaginationPage();
      scrollPositionRef.current = scrollY;
    }
  }, [nextPaginationPage, pixelsForUpload]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [nextPaginationPage, handleScroll]);
};
