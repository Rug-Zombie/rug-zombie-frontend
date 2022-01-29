import React from 'react';
import styled from 'styled-components';

const Container = styled.section`
  max-width: 1920px;
  padding: 0 0 120px 0;
  background-color: ${({color}) => color}
`;

interface SectionContainerProps {
  backgroundColor: string;
}

const SectionContainer: React.FC<SectionContainerProps> = ({ backgroundColor, children }) => {
  return (
    <Container color={backgroundColor}>
      {children}
    </Container>
  );
}

export default SectionContainer;