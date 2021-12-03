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
  return (
    data && (
      <Table responsive bordered hover>
        <thead>
          <tr>
            <th>Line</th>
            <th>Arrival</th>
            <th>Departure</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((departure) => {
            return <BoardItem routes={routes} item={departure} />;
          })}
        </tbody>
      </Table>
    )
  );
};

export default Board;
