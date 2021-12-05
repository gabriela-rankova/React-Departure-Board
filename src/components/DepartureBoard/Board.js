import { useCallback } from "react";
import { Table } from "reactstrap";
import BoardItem from "./BoardItem";

const Board = ({ data }) => {
  const getDataByType = useCallback(
    (relationType) => {
      return data.filter((elem) => elem.type === relationType);
    },
    [data]
  );

  const routes = getDataByType("route");
  const vehicles = getDataByType("vehicle");
  const trips = getDataByType("trip");

  return data && data.length > 0 ? (
    <Table responsive bordered hover>
      <thead>
        <tr>
          <th>Line</th>
          <th>Arrival</th>
          <th>Departure</th>
          <th>Destination</th>
          <th>Train</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {data.map((departure) => {
          return (
            departure.type === "prediction" && (
              <BoardItem
                key={departure.id}
                routes={routes}
                vehicles={vehicles}
                trips={trips}
                item={departure}
              />
            )
          );
        })}
      </tbody>
    </Table>
  ) : (
    <h3 className="text-center">No departures available</h3>
  );
};

export default Board;
