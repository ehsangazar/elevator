import styled from "styled-components";
import Elevator from "./components/Elevetor";

const ElevatorListStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  align-items: center;
`;

export default function Home() {
  return (
    <ElevatorListStyled>
      {new Array(3).fill(null).map((_, index) => (
        <div key={`Elevator-${index}`}>
          <Elevator />
        </div>
      ))}
    </ElevatorListStyled>
  );
}
