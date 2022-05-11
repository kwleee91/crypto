import styled from "styled-components";
import React, { useState } from "react";
import Router from "./Router";

function App() {
  const Container = styled.div`
    background-color: ${(props) => props.theme.bgColor};
  `;
  const H1 = styled.h1`
    color: ${(props) => props.theme.textColor};
  `;

  return (
    <Container>
      <Router />
      <H1>Hello</H1>
    </Container>
  );
}

export default App;
