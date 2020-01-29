import * as React from "react"
import { AppBar, Box, Container, Typography } from '@/components/atoms/ui';
import { Lines } from '@/components/pages/Lines';

export default () =>
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
    </>;
