import { useEffect, useState } from "react";

const Clock = () => {
  const [dateState, setDateState] = useState(new Date());
  useEffect(() => {
    setInterval(() => setDateState(new Date()), 1000);
  }, []);

  return <p>{dateState.toLocaleString()}</p>;
};

export default Clock;
