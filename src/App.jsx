import { useEffect, useState } from "react";
import Layout, { LeftCol, RightCol } from "./components/Layout";
import ListNames from "./components/ListNames";
import User from "./components/User";
import { NoListView } from "./components/NoListView";
import ListView from "./components/ListView";
import  NewListButton  from "./components/NewListButton";
import { deleteData, getData, patchData, postData } from "./utils";
import ReactModal from "react-modal";
import ErrorModal from "./components/ErrorModal";
import { v4 as uuidv4 } from 'uuid';

export default function App() {
  const [user, setUser] = useState({});
  const [lists, setLists] = useState([]);
  const [listIdx, setListIdx] = useState(-1);
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    getData("/user").then((retUser) => setUser(retUser));
    getData("/lists").then((retLists) => setLists(retLists));
  }, []);

  const selectListByIdx = (idx) => {
    setListIdx(idx);
    const listId = lists[idx].id;
    getData(`/todos?listId=${listId}`).then((retTodos) => {
      setTodos(retTodos);
    });
  };

  const addToListCount = (listIdx, num) => {
    const tmpLists = [...lists];
    tmpLists[listIdx] = { ...tmpLists[listIdx] };
    tmpLists[listIdx].undone_count += num;
    setLists(tmpLists);
  };

  const handleCreateTodo = (text) => {
    const listId = lists[listIdx].id;
    postData(`/todos`, { listId, text, done: false }).then((newTodo) => {
      setTodos([newTodo, ...todos]);
      addToListCount(listIdx, 1);
  
      // Incrementa undone_count nel server JSON
      const updatedList = { ...lists[listIdx] };
      updatedList.undone_count += 1;
      patchData(`/lists/${updatedList.id}`, updatedList);
    }).catch((e) =>
      setError(`Errore durante la creazione dell'attività: ${e.status}`)
    );
  };
  

  const handleUpdateTodo = (id, data) => {
    const todoIdx = todos.findIndex((t) => t.id === id);
    const preTodo = todos[todoIdx];
  
    patchData(`/todos/${id}`, data).then((patchedTodo) => {
      const tmpTodos = [...todos];
      tmpTodos[todoIdx] = patchedTodo;
      setTodos(tmpTodos);
  
      const isTodoStatusChanged = preTodo.done !== patchedTodo.done;
  
      // Aggiorna undone_count nel server JSON e nello stato React
      if (isTodoStatusChanged) {
        const listIdx = lists.findIndex((l) => l.id === patchedTodo.listId);
        addToListCount(listIdx, preTodo.done ? 1 : -1);
  
        // Aggiorna undone_count nel server JSON
        const updatedList = { ...lists[listIdx] };
        if (preTodo.done) {
          updatedList.undone_count += 1;
        } else {
          updatedList.undone_count -= 1;
        }
        patchData(`/lists/${updatedList.id}`, updatedList);
      }
    });
  };
  

  const handleDeleteTodo = (id) => {
    deleteData(`/todos/${id}`).then(() => {
      // Decrementa undone_count nel server JSON
      const todoIdx = todos.findIndex((t) => t.id === id);
      const todo = todos[todoIdx];
      const listIdx = lists.findIndex((l) => l.id === todo.listId);
      const updatedList = { ...lists[listIdx] };
      if (!todo.done) {
        updatedList.undone_count -= 1;
        patchData(`/lists/${updatedList.id}`, updatedList);
      }
  
      const tmpTodos = [...todos];
      tmpTodos.splice(todoIdx, 1);
      setTodos(tmpTodos);
  
      addToListCount(listIdx, todo.done ? 0 : -1);
    });
  };
  
  
  

  const handleCreateList = () => {
    const newList = {
      name: "Nuova elenco",
      id: uuidv4(), // Genera un nuovo UUID per la lista
      undone_count:0
    };
  
    postData("/lists", newList).then((newList) => {
      setLists([...lists, newList]);
      setListIdx(lists.length);
      setTodos([]);
    });
  };

  const handleDeleteList = (id) => {
    deleteData(`/lists/${id}`).then((deletedList) => {
      const listIdx = lists.findIndex((l) => l.id === id);

      const tmpLists = [...lists];
      tmpLists.splice(listIdx, 1);
      setLists(tmpLists);

      setListIdx(-1);
    });
  };

  const handleUpdateListName = (id, name) => {
    patchData(`/lists/${id}`, { name }).then((patchedList) => {
      const listIdx = lists.findIndex((l) => l.id === id);
      const tmpLists = [...lists];
      tmpLists[listIdx] = patchedList;
      setLists(tmpLists);
    });
  };

  return (
    <>
      <ReactModal isOpen={Boolean(error)}>
        <ErrorModal message={error} onConfirm={() => setError(false)} />
      </ReactModal>
      <Layout>
        <LeftCol>
          <User name={user.name} image={user.image}>
            <NewListButton onCreateList={handleCreateList} />
          </User>
          <hr />
          <ListNames
            lists={lists}
            selectedListIdx={listIdx}
            onListClick={selectListByIdx}
          />
        </LeftCol>
        <RightCol>
          {listIdx === -1 ? (
            <NoListView />
          ) : (
            <ListView
              list={lists[listIdx]}
              todos={todos}
              onTodoCreate={handleCreateTodo}
              onTodoDelete={handleDeleteTodo}
              onTodoUpdate={handleUpdateTodo}
              onListDelete={handleDeleteList}
              onListNameUpdate={handleUpdateListName}
            />
          )}
        </RightCol>
      </Layout>
    </>
  );
}