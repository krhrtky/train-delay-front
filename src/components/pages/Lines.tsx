import * as React from 'react';
import { ChangeEvent, useEffect, useState } from 'react';
import { useAsyncReducer } from '@/store/reducers';
import { LinesStatus } from "@/components/templates/status";


export const Lines = () => {
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
        <LinesStatus
            loading={loading}
            word={keyword}
            onInput={inputKeyword}
            clear={clearKeyword}
            onUpdate={() => dispatch({ type: 'INIT' })}
            lines={filterLine()}
            handleClick={change}
        />
    )
};
