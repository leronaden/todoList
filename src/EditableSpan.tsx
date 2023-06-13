import React, {ChangeEvent, FC, useState} from 'react';
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    title: string
    changeTitle: (newTitle: string) => void

}

const EditableSpan: FC<EditableSpanPropsType> = (props) => {
    const [isEditMode, setIsEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState(props.title)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onEditMode = () => setIsEditMode(true)
    const offEditMode = () => {
        props.changeTitle(title)
        setIsEditMode(false)
    }

    return (
        isEditMode

            ?  <TextField label={"Enter task name"}
                          variant={"filled"}
                          autoFocus
                onChange={onChangeHandler}
                onBlur={offEditMode}
                value={title}/>
            : <span onDoubleClick={onEditMode}>

                {props.title}</span>

    );
};

export default EditableSpan;
