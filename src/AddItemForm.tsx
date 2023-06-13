import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import {Button, IconButton, TextField} from "@mui/material";


export type AddItemFormPropsType = {
    addItem: (title: string, id: string) => void
    todolistId: string
}

export const AddItemForm = (props: AddItemFormPropsType) => {
    const [title, setTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const addTask = () => {
        const newTitle = title.trim();
        if (newTitle !== "") {
            props.addItem(newTitle, props.todolistId);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === "Enter") {
            addTask();
        }
    }
    return (
        <div>
            <TextField id={"standard-basic"}
                       variant={"standard"}
                       value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       label={'Enter Title'}
            />


            <Button
                variant={"contained"}
                onClick={addTask}
                size={"small"}
                color={"primary"}
                endIcon={<AddCircleOutlineOutlinedIcon/>}
                sx={{ml: "4px"}}
            >
                ADD
            </Button>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

