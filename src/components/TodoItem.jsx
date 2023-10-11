import React from "react";
import StatusCheckbox from "./StatusCheckbox";
import TodoText from "./TodoText";
import ButtonDelete from "./ButtonDelete";

const todoClasses =
  "d-flex align-items-center list-group-item border rounded-1 my-1";

const TodoItem = ({ id,done, text,updateTodo }) => {
  return (
    <li className={todoClasses}>
      <StatusCheckbox done={done} onChange={() => updateTodo(id,{done:!done})} />
      <TodoText done={done} text={text} />
      <ButtonDelete/>
    </li>
  );
};

export default TodoItem;
