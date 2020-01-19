import * as React from 'react'
import { storiesOf } from '@storybook/react';
import Update from './Update';

const onClick = () => console.log('onClick');

storiesOf('UI', module).add('Update', () => <Update handleClick={onClick} />);
