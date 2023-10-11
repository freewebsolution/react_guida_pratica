import React from "react";
import TodoItem from "./TodoItem";


const TodoList = ({todos, onTodoUpdate}) => {
  const todoItems = todos.map((t, idx) => (
    <TodoItem key={idx} done={t.done} text={t.text} updateTodo= {onTodoUpdate} />
  ));
  return (
    <ul className="list-group pb-3">
      {todoItems}
    </ul>
  );
};

export default TodoList;
