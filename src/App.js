import { useEffect, useState } from "react";
import Machine from "./Machine";

function App() {
  const [machines, setMachines] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("http://172.31.193.66:8080/poll");
      const json = await data.json();

      console.log(json);
      setMachines(Object.keys(json));
    };

    fetchData();
  }, []);

  return (
    <div>
      {machines.map((machineName) => {
        return <Machine name={machineName} key={machineName} />;
      })}
    </div>
  );
}

export default App;
