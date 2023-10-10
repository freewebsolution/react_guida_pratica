import "./App.css";
import "./assets/css/master.css";
import Layout, { LeftCol, RightCol } from "./components/Layout";
import User from "./components/User";
import ListNames from "./components/ListNames";
import TodoList from "./components/TodoList";

const user = {
  name: "Lucio",
  id: 1,
  image: "https://github.com/freewebsolution.png",
};

const todos = [
  { listId: 2, id: 1, done: false, text: "Prima attività" },
  { listId: 2, id: 2, done: true, text: "Seconda attività" },
  { listId: 2, id: 3, done: false, text: "Terza attività" },
];

const lists = [
  { id: 1, name: "Importante", undone_count: 0 },
  { id: 2, name: "Film da vedere", undone_count: 2 },
  { id: 3, name: "Libri da leggere", undone_count: 0 },
];

function App() {
  return (
    <Layout>
      <LeftCol>
        <User name={user.name} image={user.image} />
        <hr />
        <ListNames lists={lists} selectedListIdx={1} />
      </LeftCol>
      <RightCol>
        <TodoList todos={todos} />
      </RightCol>
    </Layout>
  );
}

export default App;
