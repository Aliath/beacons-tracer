import { useEffect, useRef } from 'react';

export const useRunOnce = (callback: () => void | (() => void), enabled = true) => {
  const executed = useRef(false);

  useEffect(() => {
    if (executed.current || !enabled) {
      return;
    }

    let cleanup: () => void = () => {};

    const timerId = setTimeout(() => {
      executed.current = true;
      cleanup = callback() || (() => {});
    });

    return () => {
      clearTimeout(timerId);
      cleanup();
    };

    // yup, that's done purposefully : ' )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);
};
