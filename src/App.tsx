import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {
    const todolistId1 = v1();
    const todolistId2 = v1();

    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "React", isDone: true},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: false},
            {id: v1(), title: "Forst", isDone: true}
        ]
    });


    function removeTask(id: string, todolistId: string) {
        //достанем нужный массив по todolistId и получим ссылочку на один из двух массивов:
        const todolistTasks = tasks[todolistId];
        // перезапишем в этом объекте массив для нужного тудулиста отфилтрованным массивом:
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id != id)})
    }

    function addTask(title: string, todolistId: string) {
        const NewTask = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todolistId]: [NewTask, ...tasks[todolistId]]})
    }

    function changeTaskStatus(id: string, isDone: boolean, todolistId: string) {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === id ? {...t, isDone: isDone} : t)})
    }

    function changeTaskTitle(id: string, title: string, todolistId: string) {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === id ? {...t, title: title} : t)})
    }

    function addTodoList(title: string) {
        const newTodoId = v1()
        const newTodo: TodolistType = {
            id: newTodoId,
            title: title,
            filter: "all"
        }
        setTodolists([...todolists, newTodo])
        setTasks({...tasks, [newTodoId]: []})
    }

    function changeTodoListFilter(filter: FilterValuesType, todolistId: string) {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter: filter} : tl))
    }

    function changeTodoListTitle(title: string, todolistId: string) {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, title: title} : tl))
    }

    function removeTodolist(todolistId: string) {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
    }


    const todoListsComponents: Array<JSX.Element> = todolists.map(tl => {

        let tasksForTodolist = tasks[tl.id];

        if (tl.filter === "active") {
            tasksForTodolist = tasks[tl.id].filter(t => t.isDone === false);
        }
        if (tl.filter === "completed") {
            tasksForTodolist = tasks[tl.id].filter(t => t.isDone === true);
        }

        return (
            <Grid item>
                <Paper
                    sx={{p: "20px"}}>
                    <Todolist
                        key={tl.id}
                        id={tl.id}
                        todolistId={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        filter={tl.filter}

                        removeTask={removeTask}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        changeTaskTitle={changeTaskTitle}

                        removeTodolist={removeTodolist}
                        changeFilter={changeTodoListFilter}
                        changeTodoListTitle={changeTodoListTitle}
                    />
                </Paper>
            </Grid>
        )
    })

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        TodoLists
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid
                    container
                    sx={{p: "10px 0"}}
                >
                    <AddItemForm addItem={addTodoList} todolistId={'props.id'}/>
                </Grid>
                <Grid container spacing={4}>
                    {todoListsComponents}
                </Grid>
            </Container>
        </div>
    );
}

export default App;

