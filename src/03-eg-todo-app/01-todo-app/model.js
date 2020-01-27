import uniqueId from 'lodash/uniqueId'


// ======================================
// Example of Todos data shape in reducer
// ======================================
const exampleData_todos = [
  {
    id: '123',
    timeStamp: 1571009860554,
    text: 'do something',
    completed: true
  },
  {
    id: '124',
    timeStamp: 1571009869999,
    text: 'do something',
    completed: true
  }
]







// =============
// make new Todo
// =============

const makeNewTodo = (todoText) => ({
  id: uniqueId(),
  text: todoText,
  timeStamp: Date.now(),
  completed: false
})


export {
  exampleData_todos,

  makeNewTodo,

}
