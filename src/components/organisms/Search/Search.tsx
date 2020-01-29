import * as React from 'react'
import styled from 'styled-components';
import { Input } from '@/components/molecules/form';
import { Button as B } from '@/components/atoms/ui';

export type Props = {
    label?: string
    word: string
    onInput: (e: any) => void
    clear?: () => void
    onUpdate: () => void
}

const Button = styled(B)`
    margin: '0.8rem';
`;

export const Search = (props: Props) =>
    <>
        <Input {...props} />
        <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={props.onUpdate}
        >
            最新化
        </Button>
    </>;
