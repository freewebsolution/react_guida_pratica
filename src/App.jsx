import "./App.css";
import "./assets/css/master.css";
import Layout, { LeftCol, RightCol } from "./components/Layout";
import User from "./components/User";
import ListNames from "./components/ListNames";
import TodoList from "./components/TodoList";
import { useState } from "react";
import TodoCreator from "./components/TodoCreator";
import { v4 as uuid } from "uuid";
import NoListView from "./components/NoListView";

const user = {
  name: "Lucio",
  id: 1,
  image: "https://github.com/freewebsolution.png",
};

const initialTodos = [
  { listId: 2, id: 1, done: false, text: "Prima attività" },
  { listId: 2, id: 2, done: true, text: "Seconda attività" },
  { listId: 2, id: 3, done: false, text: "Terza attività" },
];

const initialLists = [
  { id: 1, name: "Importante", undone_count: 0 },
  { id: 2, name: "Film da vedere", undone_count: 2 },
  { id: 3, name: "Libri da leggere", undone_count: 0 },
];

function App() {
  const [listIdx, setListIdx] = useState(-1);
  const [todos, setTodos] = useState([]);
  const [allTodos, setAllTodos] = useState(initialTodos);
  const [allLists, setAllLists] = useState(initialLists);

  const selectListByIdx = (idx) => {
    setListIdx(idx);
    setTodos(allTodos.filter((t) => t.listId === allLists[idx].id));
  };

  const handleCreateTodo = (text) => {
    const newTodo = {
      listId: allLists[listIdx].id,
      id: uuid(),
      done: false,
      text: text,
    };
    setAllTodos([...allTodos, newTodo]);
    setTodos([...todos, newTodo]);
   addToListCount(listIdx,1);

  };

  const handleUpdateTodo = (id, data) => {
    const todoIdx = allTodos.findIndex((t) => t.id === id);
    const preTodo = allTodos[todoIdx];
    const updatedTodo = {
      ...preTodo,
      ...data,
    };

    const tmpTodos = [...allTodos];
    tmpTodos[todoIdx] = updatedTodo;
    setAllTodos(tmpTodos);
    setTodos(tmpTodos.filter((t) => t.listId === updatedTodo.listId));

    const isTodoStatusChanged = preTodo.done !== updatedTodo.done;
    if(isTodoStatusChanged){
     addToListCount(listIdx,preTodo.done ? 1 : -1)
    }

  };

  const handleDeleteTodo = (id) => {
    const todoIdx = todos.findIndex((t) => t.id === id);
    const todo = todos[todoIdx];

    const tmpTodos = [...todos];
    tmpTodos.splice(todoIdx, 1);
    setTodos(tmpTodos);

    addToListCount(listIdx, todo.done ? 0 : -1);
  };

  const addToListCount = (listIdx, num) => {
    const tmpLists = [...allLists];
    tmpLists[listIdx] = {...tmpLists[listIdx]};
    tmpLists[listIdx].undone_count += num;
    setAllLists(tmpLists);
  }
  return (
    <Layout>
      <LeftCol>
        <User name={user.name} image={user.image} />
        <hr />
        <ListNames
          lists={allLists}
          selectedListIdx={listIdx}
          onListClick={selectListByIdx}
        />
      </LeftCol>
      <RightCol>
        {listIdx === -1 ? (
          <NoListView />
        ) : (
          <>
            <TodoList todos={todos} onTodoUpdate={handleUpdateTodo} onTodoDelete={handleDeleteTodo}/>
            <TodoCreator onCreate={handleCreateTodo} />
          </>
        )}
      </RightCol>
    </Layout>
  );
}

export default App;