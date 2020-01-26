import * as React from 'react'
import styled from "styled-components";
import {LinesTable, LinesSearch, LinesTableProps, SearchProps} from '@/components/organisms'
import { LoadingText } from '@/components/atoms/Loading';


export type Props = {
    loading: boolean
} & LinesTableProps & SearchProps;

const Wrapper = styled.div`
  width: 70vh;
  height: 80vh;
  overflow: auto;
`;

export const Lines: React.FC<Props> = ({
                                           loading,
                                           word,
                                           onInput,
                                           onUpdate,
                                           lines,
                                           handleClick,
                                           clear
                                       }) =>
    <>
        <LinesSearch word={word} onInput={onInput} onUpdate={onUpdate} clear={clear}/>
        {loading ? (
            <LoadingText />
        ) : (
            <Wrapper>
                <LinesTable lines={lines} handleClick={handleClick}/>

            </Wrapper>
        )}
    </>;
