import PolyfillEventSource from "eventsource-polyfill";
import { useEffect, useState, useRef } from "react";

const getItems = (e) => {
  return typeof e.data !== "object" && JSON.parse(e.data);
};

const useEventSource = (url, options) => {
  const [data, updateData] = useState([]);
  const currentData = useRef([]);
  const initial = useRef(true);

  useEffect(() => {
    currentData.current = data;
  }, [data]);

  useEffect(() => {
    const eventSource = new PolyfillEventSource(url, options);

    eventSource.onerror = (err) => {
      console.log("EventSource error: ", err);
    };

    // It’s always the first event in the stream, but it can also be sent during the connection
    // if the API server determines that it is more efficient than sending individual resource changes.
    eventSource.onreset = (e) => {
      const items = getItems(e);
      console.log("reset");
      if (initial.current) {
        initial.current = false;

        updateData(items);
      } else {
        items.map((item) => {
          const itemIndex = currentData.current.find((obj) => {
            return obj.id === item.id;
          });
          return (currentData.current[itemIndex] = item);
        });

        updateData(currentData.current);
      }
    };

    // when new resources are added, and it contains a single object
    eventSource.onadd = (e) => {
      console.log("add");
      const items = getItems(e);
      updateData([...currentData.current, items]);
    };
    // when existing resources are updated, and it contains a single objwct
    eventSource.onupdate = (e) => {
      console.log("update");
      const item = getItems(e);
      const itemIndex = currentData.current.find((obj) => {
        return obj.id === item.id;
      });
      currentData.current[itemIndex] = item;
      updateData([...currentData.current]);
    };
    // when a resource is removed, and it contains a single object
    eventSource.onremove = (e) => {
      console.log("remove");
      const item = getItems(e);
      const restItems = currentData.current.filter((obj) => {
        return item.id !== obj.id;
      });
      updateData([...restItems]);
    };
    return () => {
      eventSource.close();
    };
  }, []);

  return data;
};

export default useEventSource;
