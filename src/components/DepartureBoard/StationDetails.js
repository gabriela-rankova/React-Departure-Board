import { useEffect, useState } from "react";

const BASE_URL = "https://api-v3.mbta.com/stops";

const StationDetails = ({ stationId }) => {
  const [station, setStationData] = useState({});

  useEffect(() => {
    fetch(`${BASE_URL}/${stationId}`)
      .then((response) => {
        if (response.ok) return response.json();
        return response;
      })
      .then((data) => {
        setStationData(data.data.attributes);
      })
      .catch((error) => {});
  }, []);

  return (
    <div className="text-center">
      <p>{station.name}</p>
      <p>{station.address}</p>
    </div>
  );
};

export default StationDetails;
