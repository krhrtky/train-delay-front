import * as React from 'react'

interface SearchProcess {
  handleInput: (e: any) => void
}

const Search = (props: SearchProcess) =>
  <label>キーワード
    <input type="text" name="keyword" onChange={props.handleInput}/>
  </label>

export default Search
