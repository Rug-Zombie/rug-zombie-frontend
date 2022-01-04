import React from 'react';
import styled from 'styled-components';

const SectionTitle = styled.h2`
  width: 100%;
  text-align: center;
  font: normal normal 600 36px/72px Poppins;
  letter-spacing: 1.8px;
  color: #FFFFFF;
`;

const Hr = styled.hr`
  width: 30px;
  height: 5px;
  background-color: #B8C00D;
  border-radius: 3px;
  border: 0px solid #B8C00D;
  margin: 0 auto;
`;

interface SectionHeaderProps {
  title: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => {
  return (
    <>
      <SectionTitle>
        {title}
      </SectionTitle>
      <Hr />
    </>
  );
};

export default SectionHeader;