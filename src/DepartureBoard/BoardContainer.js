import useEventSource from "../useEventSource";
import Board from "./Board";

const API_URL =
  "https://api-v3.mbta.com/predictions?filter[stop]=place-sstat&sort=departure_time&filter[route]=741,Red,CR-Fairmount,CR-Worcester,CR-Needham&direction_id=0&include=route,vehicle";

const BoardContainer = () => {
  const departureData = useEventSource(API_URL, {
    xhrHeaders: {
      "x-api-key": "3c1213d8e464456088bbc89daee4ef20",
      Accept: "text/event-stream",
    },
    getArgs: false,
  });

  return (
    <div>
      <h1>Departure</h1>
      <h3>Date</h3>
      <Board data={departureData} />
    </div>
  );
};

export default BoardContainer;
