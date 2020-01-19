import * as React from 'react'
import { storiesOf } from '@storybook/react';
import { useState } from "react";
import { Input } from './Input';

storiesOf('molecules/form', module)
    .add('input', () => <Input word='input word' onInput={() => {}}/>)
    .add('input with clear button', () => {

        const [word, setWord] = useState('input word');

        const onInput = (e: Event) => {
            const value = (e.currentTarget as HTMLInputElement).value;
            setWord(value);
        };

        const clear = () => setWord('');

        return <Input word={word} onInput={onInput} clear={clear} />
    });
