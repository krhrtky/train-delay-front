import * as React from 'react'
import { Checkbox, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'
import { Line } from '../Lines'


interface LinesTableProps {
  lines: Array<Line>
  handleClick: (e: any) => Promise<void> | void
}

export const LineStatus: React.FC<LinesTableProps> = props => (
  <Table stickyHeader aria-label="sticky table">
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox" size={'small'} align={'center'} />
        <TableCell size={'small'} align={'center'}>路線</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {
        props.lines
          .map((line, i) =>
            <TableRow hover role="checkbox" tabIndex={-1} key={i}>
              <TableCell padding="checkbox" size={'small'} align={'center'}>
                <Checkbox
                  value={line.name}
                  checked={line.notice}
                  onChange={props.handleClick} />
              </TableCell>
              <TableCell size={'small'} align={'left'}>
                {line.name}
              </TableCell>
            </TableRow>
          )
      }
    </TableBody>
  </Table>
)

export default LineStatus
