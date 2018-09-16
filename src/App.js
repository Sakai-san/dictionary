// @flow
import React, { type Element } from "react";
import styled from "styled-components";
import Dictionary from "./Dictionary";
import "./App.css";

const dictionary: Object = {
  name: "color",
  id: 1,
  terms: [
    ["Stonegrey", "Dark Grey"],
    ["Midnight Black", "Black"],
    ["Mystic Silver", "Silver"]
  ]
};

const Container = styled.div`
  margin: 100px;
`;

const App = (): Element<any> => {
  return (
    <Container>
      <Dictionary dictionary={dictionary} />
    </Container>
  );
};

export default App;
