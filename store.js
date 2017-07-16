import { createStore, combineReducers, applyMiddleware } from 'redux'
import { ListView } from 'react-native'
import thunk from 'redux-thunk'


const store = createStore (
  combineReducers({

    managers: (state=[], action) => {
      switch (action.type) {
        case 'SET_MANAGERS':
          return action.payload
        default:
          return state
      }
    }
    
  }),
  applyMiddleware(thunk)
)

export default store
