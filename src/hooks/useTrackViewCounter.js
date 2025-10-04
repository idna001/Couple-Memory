import { Counter } from "counterapi";
import { useState, useEffect } from "react";

const WORKSPACE_ID = process.env.REACT_APP_COUNTER_API_WORKSPACE_SLUG;
const COUNTER_ID = process.env.REACT_APP_COUNTER_API_PAGE_VIEW_COUNTER_SLUG;

const useTrackViewCounter = () => {
  const [counter, setCounter] = useState(null);

  useEffect(() => {
    if (!WORKSPACE_ID || !COUNTER_ID) {
      console.warn(
        `useTrackViewCounter: Missing environment variable(s):` +
        (!WORKSPACE_ID ? " REACT_APP_COUNTER_API_WORKSPACE_SLUG" : "") +
        (!COUNTER_ID ? " REACT_APP_COUNTER_API_PAGE_VIEW_COUNTER_SLUG" : "")
      );
      return;
    }

    const counter = new Counter({
      workspace: WORKSPACE_ID,
      // enable this if you change the workspace to private
      // accessToken: process.env.REACT_APP_COUNTER_API_TOKEN,
    });
    counter
      .up(COUNTER_ID)
      .then((result) => {
        setCounter(result.data.up_count);
      })
      .catch((err) => console.error(err));
  }, []);

  return counter;
};

export default useTrackViewCounter;
