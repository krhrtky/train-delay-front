import * as React from 'react'
import { Button, TextField } from '@material-ui/core'

type Props = {
    label?: string
    word: string
    onInput: (e: any) => void
    clear?: () => void
}

export const Input = ({
                          label  = '',
                          word,
                          onInput,
                          clear
                      }: Props) =>
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
                    style={{margin: '0.8rem'}}
                    onClick={clear}
                >
                    クリア
                </Button>
                : ''
        }
    </>;

