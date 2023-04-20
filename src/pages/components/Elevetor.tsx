import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const ElevatorChannelStyled = styled.div`
  width: 100px;
  height: 900px;
  display: grid;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  grid-template-rows: 1fr 40px 40px;
  font-size: 0.4rem;
`;

const ElevatorPipeStyled = styled.div`
  width: 100px;
  height: 800px;
  background-color: blue;
  display: flex;
  justify-content: center;
  position: relative;
`;

const ElevatorStyled = styled.div`
  width: 80px;
  height: 100px;
  background-color: ${({ doorStatus }) => (doorStatus ? "red" : "green")};
  position: absolute;
  bottom: ${({ elevatorPostiion }) => `${elevatorPostiion}px`};
  transition: 100ms;
`;

const UpAndDownStyled = styled.button`
  width: 100%;
  height: 100%;
  background-color: green;
  border: none;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
`;

const ButtonStyled = styled.button`
  background-color: ${({ isOn }) => (isOn ? "purple" : "white")};
`;

const Elevator = () => {
  const [currentElevatorPosition, setCurrentElevatorPosition] = useState(1);
  const [elevatorPostiion, setElevatorPosition] = useState(0);
  const [isDirection, setIsDirection] = useState(true); // true: up, false: down
  const [doorStatus, setDoorStatus] = useState(true); // true: open, false: close
  const [floorList, setFloorList] = useState([]);

  const elevatorRef = useRef(null);

  const handleClick = (newFloorNumber: number) => {
    if (newFloorNumber === currentElevatorPosition) return;

    setFloorList([...floorList, newFloorNumber]);
  };

  const openDoor = () => {
    setTimeout(() => {
      setDoorStatus(true);
    }, 1000);
  };

  const closeDoor = () => {
    setTimeout(() => {
      setDoorStatus(false);
    }, 1000);
  };

  useEffect(() => {
    if (floorList.length === 0) return;
    const newDirection = floorList[0] > currentElevatorPosition;
    setIsDirection(newDirection);
    closeDoor();
  }, [floorList.length]);

  useEffect(() => {
    if (!doorStatus) {
      elevatorRef.interval = setInterval(() => {
        setElevatorPosition((elevatorPostiion) => {
          const newElevatorPosition =
            elevatorPostiion + (isDirection ? 10 : -10);
          if (newElevatorPosition <= 680 && newElevatorPosition >= 0) {
            return newElevatorPosition;
          }
        });
      }, 100);
    }
  }, [doorStatus]);

  useEffect(() => {
    if (elevatorPostiion === 0) {
      setCurrentElevatorPosition(1);
    }
    if (elevatorPostiion > 0 && elevatorPostiion < 170) {
      setCurrentElevatorPosition(1.5);
    }
    if (elevatorPostiion === 170) {
      setCurrentElevatorPosition(2);
    }
    if (elevatorPostiion > 170 && elevatorPostiion < 340) {
      setCurrentElevatorPosition(2.5);
    }
    if (elevatorPostiion === 340) {
      setCurrentElevatorPosition(3);
    }
    if (elevatorPostiion > 340 && elevatorPostiion < 510) {
      setCurrentElevatorPosition(3.5);
    }
    if (elevatorPostiion === 510) {
      setCurrentElevatorPosition(4);
    }
    if (elevatorPostiion > 510 && elevatorPostiion < 680) {
      setCurrentElevatorPosition(4.5);
    }
    if (elevatorPostiion === 680) {
      setCurrentElevatorPosition(5);
    }
  }, [elevatorPostiion]);

  useEffect(() => {
    if (floorList.includes(currentElevatorPosition)) {
      clearInterval(elevatorRef.interval);
      openDoor();
      setTimeout(() => {
        setFloorList(
          floorList.filter((floor) => floor !== currentElevatorPosition)
        );
      }, 1000);
    }
  }, [currentElevatorPosition]);

  return (
    <ElevatorChannelStyled ref={elevatorRef}>
      <ElevatorPipeStyled>
        <ElevatorStyled
          elevatorPostiion={elevatorPostiion}
          doorStatus={doorStatus}
        >
          <ButtonStyled
            isOn={floorList.includes(1)}
            onClick={() => handleClick(1)}
          >
            1
          </ButtonStyled>
          <ButtonStyled
            isOn={floorList.includes(2)}
            onClick={() => handleClick(2)}
          >
            2
          </ButtonStyled>
          <ButtonStyled
            isOn={floorList.includes(3)}
            onClick={() => handleClick(3)}
          >
            3
          </ButtonStyled>
          <ButtonStyled
            isOn={floorList.includes(4)}
            onClick={() => handleClick(4)}
          >
            4
          </ButtonStyled>
          <ButtonStyled
            isOn={floorList.includes(5)}
            onClick={() => handleClick(5)}
          >
            5
          </ButtonStyled>
        </ElevatorStyled>
      </ElevatorPipeStyled>
      <UpAndDownStyled>Arrow up</UpAndDownStyled>
      <UpAndDownStyled>Arrow Down</UpAndDownStyled>
    </ElevatorChannelStyled>
  );
};

export default Elevator;
