import React from "react";
import { useState, useEffect } from "react";

export default function useDebounce(value, timeout, callback) {
  const [timer, setTimer] = useState(null);

  const clearTimer = () => {
    if (timer) {
      clearTimeout(timer);
    }
  };
  useEffect(() => {
    clearTimer();

    if (callback) {
      const newTimer = setTimeout(callback, timeout);
      setTimer(newTimer);
    }
  }, [value]);
}
