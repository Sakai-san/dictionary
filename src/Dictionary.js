// @flow
import React, { type Element } from "react";
import { connect } from "react-redux";
import { withState, compose, withHandlers, lifecycle } from "recompose";
import { Link } from "react-router-dom";
import { fetchDictionaries, updateDictionary } from "./actions/dictionaries";
import {
  hasDuplicationInconsistency,
  hasChainInconsistency
} from "./helpers/dictionaryValidation";
import cloneDeep from "lodash.clonedeep";
import styled from "styled-components";

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
  flex-direction: row;
`;

const Cell = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
  border: 1px solid grey;
`;

const Input = styled.input`
  padding: 10px;
`;

const Warning = styled.div`
  margin-top: 15px;
  color: #856404;
`;

const Danger = styled.div`
  margin-top: 15px;
  color: #721c24;
`;

const Valid = styled.div`
  margin-top: 15px;
  color: #155724;
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
          parseInt(coordinates[0], 10) === rowIndex &&
          parseInt(coordinates[1], 10) === colIndex
        ) {
          return (
            <form
              key={`${rowIndex},${colIndex}`}
              onSubmit={props.submitHandler}
            >
              <Input
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
  const currentDictionary: Object = dictionaries[match.params.name];
  const hasDuplication: boolean = hasDuplicationInconsistency(
    currentDictionary
  );
  const hasChain: boolean = hasChainInconsistency(currentDictionary);
  return (
    <Container>
      <HomeLink>
        <Link to="/">&#8592; Home</Link>
      </HomeLink>
      {dictionaries[match.params.name].terms.map(renderRow)}
      {hasDuplication && (
        <Warning> Dictionary has duplication or fork inconsistencies</Warning>
      )}
      {hasChain && (
        <Danger> Dictionary has chain or cycle inconsistencies</Danger>
      )}
      {!hasDuplication && !hasChain && <Valid> Dictionary valid</Valid>}
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
    const rowsCopy = cloneDeep(
      props.dictionaries[props.match.params.name].terms
    );
    rowsCopy[row][col] = newValue;
    props.updateDictionary(props.match.params.name, rowsCopy);
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
