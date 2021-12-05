const getTimeFromDate = (isoDate) => {
  if (!isoDate) return "N/A";

  const date = new Date(isoDate);
  return (
    String(date.getHours()).padStart(2, "0") +
    ":" +
    String(date.getMinutes()).padStart(2, "0")
  );
};

const BoardItem = ({ item, routes = [], vehicles = [], trips = [] }) => {
  const routeData = routes.find(
    (route) => route.id === item.relationships.route?.data.id
  );
  const vehicleData = vehicles.find(
    (vehicle) => vehicle.id === item.relationships?.vehicle?.data?.id
  );
  const tripData = trips.find(
    (trip) => trip.id === item.relationships?.trip?.data?.id
  );

  return (
    <tr style={{ borderLeft: `5px solid #${routeData.attributes.color}` }}>
      <td>
        {routeData.attributes.short_name || routeData.attributes.long_name}
      </td>
      <td>{getTimeFromDate(item.attributes.arrival_time)}</td>
      <td>{getTimeFromDate(item.attributes.departure_time)}</td>
      <td>{tripData?.attributes.headsign}</td>
      <td>
        {vehicleData && vehicleData.attributes
          ? vehicleData.attributes.label
          : ""}
      </td>
      <td>{item.attributes.status}</td>
    </tr>
  );
};

export default BoardItem;
