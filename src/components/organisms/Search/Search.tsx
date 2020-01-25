import * as React from 'react'
import { Input } from "@/components/molecules/form";
import { Button } from "@material-ui/core";

type Props = {
    label?: string
    word: string
    onInput: (e: any) => void
    clear?: () => void
    onUpdate: () => void
}
export const Search = (props: Props) => (
    <>
        <Input {...props} />
        <Button
            variant="contained"
            color="primary"
            size="small"
            style={{margin: '0.8rem'}}
            onClick={props.onUpdate}
        >
            最新化
        </Button>
    </>
);
