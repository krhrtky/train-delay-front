import * as React from 'react'
import { storiesOf } from '@storybook/react';
import { LineTable } from './LineTable';

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
    .add('LineTable/empty', () => <LineTable {...emptyProps} />)
.add('LineTable/fill', () => <LineTable {...linesProps} />);
