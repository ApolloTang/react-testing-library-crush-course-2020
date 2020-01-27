import { 
  actionNames 
} from './action'


const initialState = []


function reducer(
  state = initialState,
  action
) {
  switch (action.type) {
    case actionNames.todos_add: {
      const newTodo = action && action.payload && action.payload.newTodo
      return [...state, newTodo]
    }
    case actionNames.todos_delete: {
      const id = action && action.payload && action.payload.id
      return state.filter(prevTodo=>prevTodo.id !==id)
    }
    case actionNames.todos_toggle: {
      const id = action && action.payload && action.payload.id
      return state.map(
        prevTodo => {
          if (id===prevTodo.id) {
            return {...prevTodo, completed:!prevTodo.completed}
          }
          return prevTodo
        }
      )
    }
    default:
      return state
  }
}

export {
  initialState,
  reducer
}

