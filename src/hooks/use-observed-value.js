import { useCallback, useEffect, useState } from "react";

/**
 * Use observable value from a controller
 * @param {import('rxjs').Observable} observable$ observable value
 */
export function useObservedValue(observable$) {
  const [value, setValue] = useState(null);

  // Prevent generating more functions
  const handleValueChange = useCallback(
    (innerValue) => setValue(innerValue),
    [],
  );

  // Subscribes to the value on use effect
  useEffect(() => {
    const subscription = observable$.subscribe(handleValueChange);

    return () => {
      // Dispose subscription on component unmount
      subscription.unsubscribe();
    };
  }, []);

  return value;
}
