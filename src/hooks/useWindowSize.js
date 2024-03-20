import { useState, useEffect } from "react";

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    // Function to update window dimensions
    function updateWindowSize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener to handle window resize
    window.addEventListener("resize", updateWindowSize);

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", updateWindowSize);
  }, []); // Only run once on component mount

  return windowSize;
}

export default useWindowSize;
