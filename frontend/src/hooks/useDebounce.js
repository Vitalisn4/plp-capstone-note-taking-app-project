import { useState, useEffect } from "react";

/**
 * A custom hook to debounce a value.
 * @param {any} value The value to debounce (e.g., a search term).
 * @param {number} delay The delay in milliseconds before the value is updated.
 * @returns {any} The debounced value.
 */
export function useDebounce(value, delay) {
  // State to store the debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set up a timer to update the debounced value after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up the timer if the value changes before the delay has passed
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Only re-run the effect if value or delay changes

  return debouncedValue;
}
