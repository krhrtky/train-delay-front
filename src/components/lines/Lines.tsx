import * as React from 'react';
import LineStatus from './ui/LineStatus';
import { ChangeEvent, useEffect, useState } from 'react';
import Search from './ui/Search';
import { LoadingText} from '@/components/atoms/Loading'
import styled from 'styled-components';
import { useAsyncReducer } from '@/store/reducers';
import { Button } from "@material-ui/core";

export type Line = {
  name: string;
  notice: boolean;
};

const Wrapper = styled.div`
  width: 70vh;
  height: 80vh;
  overflow: auto;
`;

const Lines = () => {
  const [state, dispatch] = useAsyncReducer();

  const [loading, setLoading] = useState(true);
  const [keyword, updateKeyword] = useState('');
  const inputKeyword = (e: ChangeEvent) => {
    const keyword = (e.target as HTMLInputElement).value;
    updateKeyword(keyword);
  };
  const filterLine = () =>
    state.lines.filter(line =>
      line.name.match(
        new RegExp(
          keyword.replace(/[\\^$.*+?()[\]{}|]/g, '.*\\$&.*')
        )
      )
    );

  useEffect(() => {
    setLoading(true);
    dispatch({ type: 'INIT' });
    setLoading(false);
  }, []);

  const clearKeyword = () => {
    updateKeyword('');
  };

  const change = e => {
    const value = (e.currentTarget as HTMLInputElement).value;
    const target = state.lines.find(line => line.name === value);

    if (target) {
      dispatch({
        type: 'UPDATE',
        payload: { name: target.name, notice: target.notice },
      });
    }
  };

  return (
    <>
      <Search
        keyword={keyword}
        handleInput={inputKeyword}
        clear={clearKeyword}
      />
        <Button
            variant="contained"
            color="primary"
            size="small"
            style={{margin: '0.8rem'}}
            onClick={() => dispatch({ type: 'INIT' })}
        >
            最新化
        </Button>
        {loading ? (
        <LoadingText />
      ) : (
        <Wrapper>
          <LineStatus handleClick={change} lines={filterLine()} />
        </Wrapper>
      )}
    </>
  );
};

export default Lines
