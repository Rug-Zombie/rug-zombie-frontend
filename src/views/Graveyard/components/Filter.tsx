import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  border: 2px solid #0D1417;
  border-radius: 25px;
  height: 50px;
  min-width: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  margin: 25px 0;
  &:hover { cursor: pointer; }
`;

const Selected = styled.div`
  height: 100%;
  width: 160px;
  background: #30C00D 0% 0% no-repeat padding-box;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NotSelected = styled.div`
  height: 100%;
  width: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: left;
  font: normal normal normal 14px/30px Poppins;
  color: #FFFFFF;
`;

interface FilterProps {
  filters: string[];
  selected: number;
  handleSelection: (index: any) => void;
}

const Filter: React.FC<FilterProps> = ({ filters, selected, handleSelection }) => {
  const ButtonList = filters.map((filter, index) => {
    const Button = index === selected ? Selected : NotSelected;
    return (
      <Button key={filter} onClick={() => {handleSelection(index)}}>
        {filter}
      </Button>
    );
  });

  return (
    <Container>
      {ButtonList}
    </Container>
  );
}

export default Filter