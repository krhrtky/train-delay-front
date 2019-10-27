import * as React from 'react'

interface UpdateProcess {
  handleClick: () => Promise<void>
}

const Update = (props: UpdateProcess) => <button onClick={props.handleClick}>最新化</button>

export default Update
