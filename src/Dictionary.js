// @flow
import React, { type Element } from "react";
import { connect } from "react-redux";
import { withState, compose, withHandlers, lifecycle } from "recompose";
import { fetchDictionaries, updateDictionary } from "./actions/dictionaries";
import cloneDeep from "lodash.clonedeep";
import styled from "styled-components";

const HARD_CODED_DIC_KEY: string = "color";

export type DictionaryProps = {};

export type DictionaryPropsInner = DictionaryProps & {
  editingCell: string,
  setEditingCell: Function,
  updatedRows: Array<Array<string>>,
  setRows: Function,
  clickHandler: Function,
  changeHandler: Function,
  submitHandler: Function,

  dictionaries: Object,
  fetchDictionaries: Function,
  updateDictionary: Function,
  inputValue: string,
  setInputValue: Function
};

const DictionaryWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Cell = styled.div`
  border: 1px solid grey;
`;

const Dictionary = ({
  dictionaries,
  clickHandler,
  changeHandler,
  updatedRows,
  editingCell,
  submitHandler,
  inputValue,
  setInputValue
}: DictionaryPropsInner): Element<any> | null => {
  if (!dictionaries[HARD_CODED_DIC_KEY]) {
    return null;
  }

  return dictionaries[HARD_CODED_DIC_KEY].terms.map((row, rowIndex) => {
    const coordinates = editingCell ? editingCell.split(",") : null;
    return (
      <Row key={rowIndex}>
        {row.map((col, colIndex) => {
          if (
            coordinates &&
            parseInt(coordinates[0]) === rowIndex &&
            parseInt(coordinates[1]) === colIndex
          ) {
            return (
              <form key={`${rowIndex},${colIndex}`} onSubmit={submitHandler}>
                <input
                  onChange={changeHandler(rowIndex, colIndex)}
                  value={col}
                />
              </form>
            );
          } else {
            return (
              <Cell
                key={`${rowIndex},${colIndex}`}
                onClick={clickHandler(rowIndex, colIndex)}
              >
                {col}
              </Cell>
            );
          }
        })}
      </Row>
    );
  });
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
  }
});

const mapStateToProps: Function = (state: Object): Object => ({
  dictionaries: state.dictionaries
});

const mapDispatchToProps: Function = (dispatch: Function): Object => ({
  fetchDictionaries: (): Promise<any> => dispatch(fetchDictionaries()),
  updateDictionary: (name, terms) => dispatch(updateDictionary(name, terms))
});

const withLifeCyle = lifecycle({
  componentDidMount() {
    this.props.fetchDictionaries();
  }
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withState("editingCell", "setEditingCell", ""),
  extendsWithHandler,
  withLifeCyle
)(Dictionary);
