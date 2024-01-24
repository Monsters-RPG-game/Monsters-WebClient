import React from 'react';
import * as animation from '../../../style/animation';
import { AnimateEntry, Container, Header, Link } from '../../../shared/styled';

const FourOhFour: React.FC = () => {
  return (
    <AnimateEntry variants={animation.slowSlideRight} initial="init" animate="visible" exit="exit">
      <Container $justify="center" $direction="row" $align="center">
        <Header>
          Got lost ?<Link to="/">Go Home</Link>
        </Header>
      </Container>
    </AnimateEntry>
  );
};

export default FourOhFour;