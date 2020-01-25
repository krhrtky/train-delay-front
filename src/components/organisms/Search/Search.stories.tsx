import * as React from 'react'
import { storiesOf } from '@storybook/react';
import { Search } from "./Search";

const props = {
    word: '',
    onInput: e => {},
    onUpdate: () => {},
    clear: () => {},
};

storiesOf('organisms/search', module)
    .add('input', () => <Search {...props} />);
