import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton, ThemeProvider, useThemeProps} from "@mui/material";
import {ThemeOptions} from '@mui/material/styles';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistId: string
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    filter: FilterValuesType
    changeTaskTitle: (id: string, title: string, todolistId: string) => void
    changeTodoListTitle: (title: string, todolistId: string) => void
}

export function Todolist(props: PropsType) {
    const addTask = (title: string) => {

        props.addTask(title, props.todolistId);
    }

    const removeTodolist = () => props.removeTodolist(props.id)

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);
    const changeTodoListTitle = (newTitle: string) => props.changeTodoListTitle(newTitle, props.todolistId)


    return <div>
        <h3>
            <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
            <IconButton onClick={removeTodolist}
                        size={"medium"}
                        color={"primary"}
            >
                <RemoveCircleIcon/>
            </IconButton>


        </h3>
        <AddItemForm addItem={props.addTask} todolistId={props.id}/>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                    }
                    const changeTaskTitle = (newTitle: string) => props.changeTaskTitle(t.id, newTitle, props.todolistId)

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>


                        <Checkbox onChange={onChangeHandler}
                                    checked={t.isDone} />


                        <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>



                        <IconButton onClick={onClickHandler}
                                    size={"small"}
                                    color={"primary"}
                        >
                            <RemoveCircleIcon/>
                        </IconButton>

                    </li>
                })
            }
        </ul>
        <div>

            <Button
                sx={{mr: "2px"}}
                variant="contained"
                color={props.filter === 'all' ? "secondary" : "primary"}
                size="small"
                onClick={onAllClickHandler}>All
            </Button>
            <Button
                sx={{mr: "2px"}}
                variant="contained"
                color={props.filter === 'active' ? "secondary" : "primary"}
                size="small"
                onClick={onActiveClickHandler}>Active
            </Button>
            <Button
                variant="contained"
                color={props.filter === 'completed' ? "secondary" : "primary"}
                size="small"
                onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
}


