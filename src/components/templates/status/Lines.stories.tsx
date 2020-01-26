import * as React from 'react'
import { storiesOf } from '@storybook/react';
import { Props, Lines } from './Lines'

const onLoading = {
    loading: true,
    lines: [{
        name: '山手線',
        notice: true,
    }],
    handleClick: (e) => {},
    word: '',
    onInput: (e) => {},
    onUpdate: () => {},
    clear: () => {},
};

const afterLoading = {
    loading: false,
    lines: [{
        name: '山手線',
        notice: true,
    }],
    handleClick: (e) => {},
    word: '',
    onInput: (e) => {},
    onUpdate: () => {},
    clear: () => {},
};

storiesOf('templates/status', module)
    .add('lines loading', () => <Lines {...onLoading} />)
    .add('after loading', () => <Lines {...afterLoading} />);
