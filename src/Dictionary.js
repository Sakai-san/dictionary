// @flow
import React, { type Element } from "react";
import { withState, compose, withHandlers, lifecycle } from "recompose";
import cloneDeep from "lodash.clonedeep";
import styled from "styled-components";

export type DictionaryProps = {
  dictionary: Object
};

export type DictionaryPropsInner = DictionaryProps & {
  editingCell: string,
  setEditingCell: Function,
  updatedRows: Array<Array<string>>,
  setRows: Function,
  clickHandler: Function,
  changeHandler: Function,
  submitHandler: Function
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

/*
const renderRow = (row, index) => {
  return (
    <div>
      <button onClick={clickHandler}>Edit</button>
      <Row key={index}>
        <div>{row[0]}</div>
        <div>{row[1]}</div>
      </Row>
    </div>
  );
};
  <DictionaryWrapper>{dictionary.terms.map(renderRow)}</DictionaryWrapper>
*/

const Dictionary = ({
  dictionary,
  clickHandler,
  changeHandler,
  updatedRows,
  editingCell,
  submitHandler
}: DictionaryPropsInner): Element<any> => {
  return dictionary.terms.map((row, rowIndex) => {
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
                  value={updatedRows[rowIndex][colIndex]}
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
    const rowsCopy = cloneDeep(props.updatedRows);
    rowsCopy[row][col] = newValue;
    props.setRows(rowsCopy);
  },
  submitHandler: (props: DictionaryPropsInner) => (event: Object): void => {
    event.preventDefault();
    props.setEditingCell("");
  }
});

export default compose(
  withState("editingCell", "setEditingCell", ""),
  withState("updatedRows", "setRows", props => props.dictionary.terms),
  extendsWithHandler
)(Dictionary);
