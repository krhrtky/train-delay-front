import * as React from 'react'

export interface LineProps {
  name: string
  notice: boolean
  handleClick: (e: any) => Promise<void>
}

const LineStatus = (props: LineProps) =>
  <h2>
    {props.name}:
    <button onClick={props.handleClick}>
      {props.notice ? '非通知にする' : '通知する'}
    </button>
  </h2>

export default LineStatus
