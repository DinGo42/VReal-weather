import { useRef, useEffect, useCallback } from "react";
import { useWeatherForecast } from "./use-weather-forecast";

export const useScrollPagination = (pixelsForUpload = 200) => {
  const { nextPaginationPage } = useWeatherForecast();
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
