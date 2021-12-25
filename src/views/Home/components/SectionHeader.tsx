import React from 'react';
import styled from 'styled-components';

const Section = styled.div`
  margin: 100px 0 80px 0;
`

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
  border: 0 solid #B8C00D;
  margin: 0 auto;
`;

interface SectionHeaderProps {
  title: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => {
  return (
    <Section>
      <SectionTitle>
        {title}
      </SectionTitle>
      <Hr />
    </Section>
  );
};

export default SectionHeader;