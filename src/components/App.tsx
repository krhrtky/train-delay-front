import Lines from "./lines/Lines"
import { AppBar, Box, Container, Typography } from "@material-ui/core"
import * as React from "react"

export default () => {
  return (
    <>
      <AppBar position="fixed">
        <Typography variant="h4" color="inherit">
          遅延バッチ
        </Typography>
      </AppBar>
      <Container>
        <Box my={7}>
          <Lines />
        </Box>
      </Container>
    </>
  )
}

