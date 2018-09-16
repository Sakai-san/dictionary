// @flow
import React, { type Element } from "react";
import { connect } from "react-redux";
import { compose, lifecycle } from "recompose";
import { Link } from "react-router-dom";
import { fetchDictionaries } from "./actions/dictionaries";
import styled from "styled-components";

const Container = styled.div`
  margin: 30px;
`;

export type NewDictionaryProps = {};

export type NewDictionaryPropsInner = NewDictionaryProps & {};

const NewDictionary = (): Element<any> | null => {
  return (
    <Container>
      <Link to="/">&#8592; Home</Link>
      <h1>Create a new Dictionary</h1>
    </Container>
  );
};

const mapStateToProps: Function = (state: Object): Object => ({
  dictionaries: state.dictionaries
});

const mapDispatchToProps: Function = (dispatch: Function): Object => ({
  fetchDictionaries: (): Promise<any> => dispatch(fetchDictionaries())
});

export default NewDictionary;
