import React from 'react'


// ======================
//   TodoItem component
// ======================
const TodoItem = ({todo, deleteTodo, toggleTodo}) => (
  <div data-testid="todo-item">
    <button onClick={deleteTodo}>X</button>
    <label htmlFor={`todo-${todo.id}`} >
      <input
        type="checkbox"
        id={`todo-${todo.id}`}
        onChange={toggleTodo}
        checked={todo.completed}
      />
      {todo.text}
    </label>
  </div>
)


export {TodoItem}
