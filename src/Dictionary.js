// @flow
import React, { type Element } from "react";
import { connect } from "react-redux";
import { withState, compose, withHandlers, lifecycle } from "recompose";
import { Link } from "react-router-dom";
import { fetchDictionaries, updateDictionary } from "./actions/dictionaries";
import cloneDeep from "lodash.clonedeep";
import styled from "styled-components";

const HARD_CODED_DIC_KEY: string = "color";

export type DictionaryProps = {};

export type DictionaryPropsInner = DictionaryProps & {
  editingCell: string,
  setEditingCell: Function,
  clickHandler: Function,
  changeHandler: Function,
  submitHandler: Function,
  match: Object,
  renderRow: Function,
  dictionaries: Object,
  fetchDictionaries: Function,
  updateDictionary: Function
};

const Container = styled.div`
  margin: 40px;
`;

const HomeLink = styled.div`
  margin-bottom: 40px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Cell = styled.div`
  padding: 10px;
  border: 1px solid grey;
`;

const doRenderRow = (props: DictionaryPropsInner) => (
  row: Object,
  rowIndex: number
) => {
  const coordinates = props.editingCell ? props.editingCell.split(",") : null;
  return (
    <Row key={rowIndex}>
      {row.map((col, colIndex) => {
        if (
          coordinates &&
          parseInt(coordinates[0]) === rowIndex &&
          parseInt(coordinates[1]) === colIndex
        ) {
          return (
            <form
              key={`${rowIndex},${colIndex}`}
              onSubmit={props.submitHandler}
            >
              <input
                onChange={props.changeHandler(rowIndex, colIndex)}
                value={col}
              />
            </form>
          );
        } else {
          return (
            <Cell
              key={`${rowIndex},${colIndex}`}
              onClick={props.clickHandler(rowIndex, colIndex)}
            >
              {col}
            </Cell>
          );
        }
      })}
    </Row>
  );
};

const Dictionary = ({
  dictionaries,
  match,
  renderRow
}: DictionaryPropsInner): Element<any> | null => {
  if (
    !match ||
    !match.params ||
    !match.params.name ||
    !dictionaries[match.params.name]
  ) {
    return null;
  }

  return (
    <Container>
      <HomeLink>
        <Link to="/">&#8592; Home</Link>
      </HomeLink>
      {dictionaries[match.params.name].terms.map(renderRow)}
    </Container>
  );
};

const extendsWithHandler = withHandlers({
  clickHandler: (props: DictionaryPropsInner) => (row: number, col: number) => (
    event: Object
  ): void => {
    props.setEditingCell(`${row},${col}`);
  },
  changeHandler: (props: DictionaryPropsInner) => (
    row: number,
    col: number
  ) => (event: Object): void => {
    const newValue = event.target.value;
    const rowsCopy = cloneDeep(props.dictionaries[HARD_CODED_DIC_KEY].terms);
    rowsCopy[row][col] = newValue;
    props.updateDictionary(HARD_CODED_DIC_KEY, rowsCopy);
  },
  submitHandler: (props: DictionaryPropsInner) => (event: Object): void => {
    props.setEditingCell("");
    if (localStorage) {
      localStorage.setItem("dictionaries", JSON.stringify(props.dictionaries));
    }
  }
});

const withLifeCyle = lifecycle({
  componentDidMount() {
    this.props.fetchDictionaries();
  }
});

const mapStateToProps: Function = (state: Object): Object => ({
  dictionaries: state.dictionaries
});

const mapDispatchToProps: Function = (dispatch: Function): Object => ({
  fetchDictionaries: (): Promise<any> => dispatch(fetchDictionaries()),
  updateDictionary: (dictionaryName, terms) =>
    dispatch(updateDictionary(dictionaryName, terms))
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withState("editingCell", "setEditingCell", ""),
  extendsWithHandler,
  withHandlers({
    renderRow: doRenderRow
  }),
  withLifeCyle
)(Dictionary);
