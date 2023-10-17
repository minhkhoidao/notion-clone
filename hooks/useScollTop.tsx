import { useEffect, useState } from 'react';
/**
 * A custom hook that returns a boolean indicating whether the user has scrolled past a certain threshold.
 * @param threshold - The threshold value for the scroll position. Default is 10.
 * @returns A boolean indicating whether the user has scrolled past the threshold.
 */
const useScollTop = (threshold = 10) => {
  const [scroll, setScroll] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > threshold) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold]);
  return scroll;
};

export default useScollTop;
