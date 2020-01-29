import * as React from 'react'
import styled from "styled-components";
import { Button as B, TextField } from '@/components/atoms/ui'

export type Props = {
    label?: string
    word: string
    onInput: (e: any) => void
    clear?: () => void
}

const Button = styled(B)`
    margin: '0.8rem'
`;

export const Input = (
    {
        label  = '',
        word,
        onInput,
        clear
    }: Props
) =>
    <>
        <TextField
            label={label}
            value={word}
            onChange={onInput}
        />
        {
            clear !== undefined
                ?
                <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={clear}
                >
                    クリア
                </Button>
                : ''
        }
    </>;

