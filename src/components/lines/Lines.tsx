import * as React from 'react';
import LineStatus from './ui/LineStatus';
import { ChangeEvent, useEffect, useState } from 'react';
import Search from './ui/Search';
import Update from './ui/Update';
import { LoadingText} from '@/components/atoms/Loading'
import styled from 'styled-components';
import { useAsyncReducer } from '@/store/reducers';

export type Line = {
  name: string;
  notice: boolean;
};

const Wrapper = styled.div`
  width: 70vh;
  height: 80vh;
  overflow: auto;
`;

interface LinesState {
  lines: Array<Line>;
  loading: boolean;
  keyword: string;
}

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
    console.log('call')
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
      <Update handleClick={() => dispatch({ type: 'INIT' })} />

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
