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

const Header = styled.div`
  display: flex;
  justify-content: space-around;
`;

export type HomeProps = {};

export type HomePropsInner = HomeProps & {
  dictionaries: Object,
  fetchDictionaries: Function
};

const Home = ({ dictionaries }: HomePropsInner): Element<any> | null => {
  if (!dictionaries) {
    return null;
  }

  return (
    <Container>
      <Header>
        <h1>Dictionaries</h1>
      </Header>
      {Object.values(dictionaries).map(
        (dictionary: any, index: number): Element<any> => {
          return (
            <Link key={index} to={`/dictionary/${dictionary.name}`}>
              {dictionary.name}
            </Link>
          );
        }
      )}
    </Container>
  );
};

const withLifeCycle = lifecycle({
  componentDidMount() {
    this.props.fetchDictionaries();
  }
});

const mapStateToProps: Function = (state: Object): Object => ({
  dictionaries: state.dictionaries
});

const mapDispatchToProps: Function = (dispatch: Function): Object => ({
  fetchDictionaries: (): Promise<any> => dispatch(fetchDictionaries())
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withLifeCycle
)(Home);
