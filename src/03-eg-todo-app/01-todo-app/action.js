const actionNames = {
  todos_add: 'todos_add',
  todos_delete: 'todos_delete',
  todos_toggle: 'todos_toggle',
}



const todos_add = (newTodo) => ({
  type: actionNames.todos_add,
  payload: {newTodo}
})
const todos_delete = (id) => ({
  type: actionNames.todos_delete,
  payload: {id}
})
const todos_toggle = (id) => ({
  type: actionNames.todos_toggle,
  payload: {id}
})


const actions = {
  todos_add,
  todos_delete,
  todos_toggle
}




export {
  actionNames,
  actions
}

