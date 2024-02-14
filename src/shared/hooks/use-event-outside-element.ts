import { MutableRefObject, useEffect } from "react";

export const useEventOutsideElement = <K extends keyof DocumentEventMap>(
  elementRef: MutableRefObject<Element | null>,
  event: K,
  callback: () => void,
) => {
  useEffect(() => {
    const handler = (e: DocumentEventMap[K]) => {
      if (elementRef.current && elementRef.current.contains(e.target as Node)) return;
      callback();
    };

    document.addEventListener(event, handler);

    return () => {
      document.removeEventListener(event, handler);
    };
  }, [elementRef, event, callback]);
};
