// @flow
import React, { type Element } from "react";
import styled from "styled-components";
import Dictionary from "./Dictionary";
import "./App.css";

const Container = styled.div`
  margin: 100px;
`;

const App = (): Element<any> => {
  return (
    <Container>
      <Dictionary />
    </Container>
  );
};

export default App;
