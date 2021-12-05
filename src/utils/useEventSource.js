import PolyfillEventSource from "eventsource-polyfill";
import { useEffect, useState, useRef } from "react";

const getItems = (e) => {
  return typeof e.data !== "object" && JSON.parse(e.data);
};
const sortItems = (items) => {
  const filtered = items.filter(
    (item, index, self) => index === self.findIndex((t) => t.id === item.id)
  );
  return filtered.sort(
    (a, b) =>
      new Date(a.attributes.departure_time) -
      new Date(b.attributes.departure_time)
  );
};

const useEventSource = (url, options) => {
  const [data, updateData] = useState([]);
  const currentData = useRef([]);

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
      updateData([...sortItems(items)]);
    };

    // when new resources are added, and it contains a single object
    // sometimes some items already exists
    eventSource.onadd = (e) => {
      console.log("add");
      const item = getItems(e);

      const itemIndex = currentData.current.findIndex((obj) => {
        return obj.id === item.id;
      });

      if (itemIndex) {
        currentData.current[itemIndex] = item;
      } else {
        currentData.current.push(item);
      }

      const newItems = sortItems([...currentData.current]);
      updateData(newItems);
    };
    // when existing resources are updated, and it contains a single objwct
    eventSource.onupdate = (e) => {
      console.log("update");
      const item = getItems(e);
      const itemIndex = currentData.current.findIndex((obj) => {
        return obj.id === item.id;
      });

      currentData.current[itemIndex] = item;
      updateData([...sortItems(currentData.current)]);
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
