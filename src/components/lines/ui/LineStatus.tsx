import * as React from 'react'
import Button from "@material-ui/core/Button"


export interface LineProps {
  name: string
  notice: boolean
  handleClick: (e: any) => Promise<void>
}

const LineStatus = (props: LineProps) =>
  <h2>
    {props.name}:
    <Button
      variant="contained"
      color="primary"
      onClick={props.handleClick}
    >
      {props.notice ? '非通知にする' : '通知する'}
    </Button>
  </h2>

export default LineStatus
