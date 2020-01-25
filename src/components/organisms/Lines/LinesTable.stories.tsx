import * as React from 'react'
import { storiesOf } from '@storybook/react';
import { LinesTable } from './LinesTable';

const emptyProps = {
    lines: [],
    handleClick: (e: Event) => {e.preventDefault()}
};

const linesProps = {
    lines: [{
        name: '山手線',
        notice: true,
    }],
    handleClick: (e: Event) => {e.preventDefault()}
};

storiesOf('molecules/lines', module)
    .add('LineTable/empty', () => <LinesTable {...emptyProps} />)
.add('LineTable/fill', () => <LinesTable {...linesProps} />);
