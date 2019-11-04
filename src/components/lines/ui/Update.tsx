import * as React from 'react'
import { Button } from '@material-ui/core'

interface UpdateProcess {
  handleClick: () => Promise<void>
}

const Update: React.FC<UpdateProcess> = props =>
  <Button
    variant="contained"
    color="primary"
    size="small"
    onClick={props.handleClick}
  >
    最新化
  </Button>

export default Update
