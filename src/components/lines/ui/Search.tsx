import * as React from 'react'
import { Button, TextField } from '@material-ui/core'

interface SearchProcess {
  keyword: string
  handleInput: (e: any) => void
  clear: () => void
}

export const Search = (props: SearchProcess) =>
  <>
    <TextField
        label="キーワード"
        value={props.keyword}
        onChange={props.handleInput}
        id="keyword"
    />
    <Button
      variant="contained"
      color="secondary"
      size="small"
      style={{margin: '0.8rem'}}
      onClick={props.clear}
    >
      クリア
    </Button>
  </>;
