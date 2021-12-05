import { useEffect, useState } from "react";

const Clock = () => {
  const [dateState, setDateState] = useState();
  useEffect(() => {
    setInterval(() => {
      const date = new Date();
      const time =
        String(date.getHours()).padStart(2, "0") +
        ":" +
        String(date.getMinutes()).padStart(2, "0");
      setDateState(time);
    }, 1000);
    return () => {
      clearInterval();
    };
  }, []);

  return <p>{dateState}</p>;
};

export default Clock;
