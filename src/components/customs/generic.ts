import styled, { createGlobalStyle } from 'styled-components';
import { motion } from 'framer-motion';
import type * as localTypes from '../../types';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    min-height: 100vh;
    background: ${(props): string => props.theme.background.default};
    font-family: "JetBrains Mono ExtraLight", serif;

    &::-webkit-scrollbar {
      width: 15px;
      border-radius: 50px;
      background: ${(props): string => props.theme.background.opposite};
    }

    &::-webkit-scrollbar-thumb {
      background: ${(props): string => props.theme.colors.ohOrange};
      border-radius: 50px;

      &:hover {
        cursor: pointer;
      }
    }
  }
`;

export const App = styled(motion.div)<localTypes.IDefaultChildren>`
  background: ${(props): string => props.theme.background.default};
  color: ${(props): string => props.theme.colors.default};
  transition: ${(props): string => props.theme.transition.slow};
  width: 100%;
`;
