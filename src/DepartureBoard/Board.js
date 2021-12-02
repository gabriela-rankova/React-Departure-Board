import { Table } from "reactstrap";

const getTimeFromDate = (isoDate) => {
  if (!isoDate) return "N/A";

  const date = new Date(isoDate);
  return date.getHours() + ":" + String(date.getMinutes()).padStart(2, "0");
};

const Board = ({ data }) => {
  const getRelationShipData = (item, relationType = false) => {
    return (
      item.relationships &&
      Object.keys(item.relationships).map((type) => {
        return data.find((value) => {
          return relationType
            ? value.type === type && relationType === value.type
            : value.type === type;
        });
      })
    );
  };

  return (
    data && (
      <Table responsive>
        <thead>
          <tr>
            <th>Line</th>
            <th>Arrival</th>
            <th>Departure</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => {
            const relationshipData = getRelationShipData(d);
            console.log(relationshipData);

            return (
              d.type === "prediction" && (
                <tr key={d.id}>
                  {/* <td>{getRouteName(d.</td> */}
                  <td>{getTimeFromDate(d.attributes.arrival_time)}</td>
                  <td>{getTimeFromDate(d.attributes.departure_time)}</td>
                  <td>{d.attributes.status}</td>
                </tr>
              )
            );
          })}
        </tbody>
      </Table>
    )
  );
};

export default Board;
