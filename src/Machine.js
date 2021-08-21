import { useEffect, useState } from "react";

import styled from "styled-components";

const MachineContainer = styled.div`
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 400px;
  padding: 16px;
  transition: 0.2s ease;

  :hover {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  }
`;

const MachineName = styled.h1`
  margin: 0;
  padding: 0;
  font-size: 24px;
  padding-bottom: 40px;
  text-align: left;
`;

const ServiceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;

  & + & {
    border-top: 1px solid rgba(0, 0, 0, 0.05);
    padding-bottom: 0;
  }

  :hover {
    cursor: pointer;
  }
`;

const ServiceTitle = styled.div`
  color: rgba(0, 0, 0, 0.4);
  font-weight: bold;
`;

const ServiceDesc = styled.div`
  color: rgba(0, 0, 0, 0.4);
`;

const Machine = ({ name: machineName }) => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("http://172.31.193.66:8080/services", {
        method: "POST",
        body: JSON.stringify({
          machineName,
        }),
      });

      const json = await data.json();
      setServices(json.services);
    };

    fetchData();
  }, [machineName]);

  return (
    <MachineContainer>
      <MachineName>{machineName}</MachineName>

      {services.map((service) => {
        async function onClickMachine() {
          await fetch("http://172.31.193.66:8080/web", {
            method: "POST",
            body: JSON.stringify({
              machineName,
              serviceName: service["Title"],
            }),
          });
        }

        return (
          <ServiceContainer onClick={onClickMachine}>
            <ServiceTitle> {service["Title"]} </ServiceTitle>
            <ServiceDesc> {service["Description"]} </ServiceDesc>
            {/* {service["ServiceType"]} */}
          </ServiceContainer>
        );
      })}
    </MachineContainer>
  );
};

export default Machine;
