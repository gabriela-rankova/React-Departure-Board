const getTimeFromDate = (isoDate) => {
  if (!isoDate) return "N/A";

  const date = new Date(isoDate);
  return (
    String(date.getHours()).padStart(2, "0") +
    ":" +
    String(date.getMinutes()).padStart(2, "0")
  );
};

const BoardItem = ({ item, routes = [] }) => {
  const routeData = routes.find(
    (route) => route.id === item.relationships.route?.data.id
  );

  return (
    item.type === "prediction" && (
      <tr
        key={item.id}
        style={{ borderLeft: `5px solid #${routeData.attributes.color}` }}
      >
        <td>{routeData.attributes.long_name}</td>
        <td>{getTimeFromDate(item.attributes.arrival_time)}</td>
        <td>{getTimeFromDate(item.attributes.departure_time)}</td>
        <td>{item.attributes.status}</td>
      </tr>
    )
  );
};

export default BoardItem;
