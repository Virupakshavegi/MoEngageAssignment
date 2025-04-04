import React from "react";
import styled from "styled-components";

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border-radius: 8px;
  width: 150px;
  gap: 10px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const DogImage = styled.img`
  width: 100%;
  border-radius: 8px;
`;

const Card = ({ code }) => {
  return (
    <CardWrapper>
      <DogImage src={`https://http.dog/${code}.jpg`} alt={`HTTP ${code}`} />
    </CardWrapper>
  );
};

export default Card;
