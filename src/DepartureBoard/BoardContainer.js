import { Card, CardBody, CardTitle } from "reactstrap";
import useEventSource from "../utils/useEventSource";
import Board from "./Board";
import Clock from "./Clock";
import StationDetails from "./StationDetails";

const station = "place-sstat";

const API_URL = `https://api-v3.mbta.com/predictions?filter[stop]=${station}&sort=departure_time&direction_id=0&include=route,vehicle,trip`;

const getCurrentDate = () => {
  const date = new Date();
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
};

const BoardContainer = () => {
  const departureData = useEventSource(API_URL, {
    xhrHeaders: {
      "x-api-key": `${process.env.REACT_APP_API_KEY}`,
      Accept: "text/event-stream",
    },
    getArgs: false,
  });

  return (
    <Card className="m-4">
      <CardTitle className="p-3">
        <h1 className="text-center">Departure</h1>
        <div className="board-container-title">
          <div className="text-start">
            <span>Date:</span>
            <p> {getCurrentDate()}</p>
          </div>
          <div>
            <StationDetails stationId={station} />
          </div>
          <div className="text-end">
            <span>Current time: </span>
            <Clock />
          </div>
        </div>
      </CardTitle>

      <CardBody>
        <Board data={departureData} />
      </CardBody>
    </Card>
  );
};

export default BoardContainer;
