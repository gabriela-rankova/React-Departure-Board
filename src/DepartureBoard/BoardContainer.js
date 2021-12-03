import { Card, CardBody, CardTitle } from "reactstrap";
import useEventSource from "../useEventSource";
import Board from "./Board";
import Clock from "./Clock";

const API_URL =
  "https://api-v3.mbta.com/predictions?filter[stop]=place-sstat&sort=departure_time&filter[route]=Red,CR-Fairmount,CR-Worcester,CR-Needham&direction_id=0&include=route,vehicle";

const BoardContainer = () => {
  const departureData = useEventSource(API_URL, {
    xhrHeaders: {
      "x-api-key": `${process.env.REACT_APP_API_KEY}`,
      Accept: "text/event-stream",
    },
    getArgs: false,
  });

  return (
    <Card>
      <CardTitle>
        <h1>Departure</h1>
        <h3>Date</h3>
        <Clock />
      </CardTitle>

      <CardBody>
        <Board data={departureData} />
      </CardBody>
    </Card>
  );
};

export default BoardContainer;
