const getItems = (e) => {
  return typeof e.data !== "object" && JSON.parse(e.data);
};
const sortItems = (items) => {
  const filtered = items.filter(
    (item, index, self) => index === self.findIndex((t) => t.id === item.id)
  );
  return filtered.sort(
    (a, b) =>
      (Number(new Date(a.attributes.departure_time)) || 0) -
      (Number(new Date(b.attributes.departure_time)) || 0)
  );
};

export const reducer = (state, action) => {
  const item = getItems(action.payload);
  switch (action.type) {
    // It’s always the first event in the stream, but it can also be sent during the connection
    // if the API server determines that it is more efficient than sending individual resource changes.
    case "setData":
      return sortItems(item);

    // when new resources are added, and it contains a single object
    case "addData":
      const newData = [...state, item];
      return sortItems(newData);

    // when existing resources are updated, and it contains a single objwct
    case "updateData":
      const updateItemIndex = state.findIndex((obj) => {
        return obj.id === item.id;
      });

      state[updateItemIndex] = item;
      return sortItems(state);

    // when a resource is removed, and it contains a single object
    case "removeData":
      const restItems = state.filter((obj) => {
        return item.id !== obj.id;
      });
      return sortItems(restItems);
    default:
      throw new Error();
  }
};
