import { useEffect, useRef, useState } from "react";

export const useWindowResize = () => {
  const [elementWidth, setElementWidth] = useState("100%");
  const [leftMargin, setLeftMargin] = useState("0%");

  useEffect(() => {
    const handleResize = () => {
      setElementWidth(() => {
        if (window.innerWidth > 1024) {
          const fontSize = window.getComputedStyle(
            document.documentElement,
          ).fontSize;

          const newWidth =
            window.innerWidth -
            //Size of Sidebar
            parseInt(fontSize) * 18 -
            parseInt(fontSize) * 4;

          return `${newWidth}px`;
        } else {
          return "100%";
        }
      });

      setLeftMargin(() => {
        if (window.innerWidth > 1024) {
          const fontSize = window.getComputedStyle(
            document.documentElement,
          ).fontSize;

          //Size of Sidebar
          return `${parseInt(fontSize) * 18}px`;
        } else {
          return "0%";
        }
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { elementWidth, leftMargin };
};
