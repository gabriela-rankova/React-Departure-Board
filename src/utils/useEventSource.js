import PolyfillEventSource from "eventsource-polyfill";
import { useEffect, useReducer } from "react";
import { reducer } from "../reducers/EventSource";

const useEventSource = (url, options) => {
  const [state, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    const eventSource = new PolyfillEventSource(url, options);

    eventSource.onerror = (err) => {
      console.log("EventSource error: ", err);
    };

    eventSource.onreset = (data) => {
      dispatch({ type: "setData", payload: data });
    };

    eventSource.onadd = (data) => {
      dispatch({ type: "addData", payload: data });
    };

    eventSource.onupdate = (data) => {
      dispatch({ type: "updateData", payload: data });
    };

    eventSource.onremove = (data) => {
      dispatch({ type: "removeData", payload: data });
    };
    return () => {
      eventSource.close();
    };
  }, []);

  return state;
};

export default useEventSource;
