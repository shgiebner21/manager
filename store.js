import { createStore, combineReducers, applyMiddleware } from 'redux'
import { ListView } from 'react-native'
import thunk from 'redux-thunk'
import {set, lensProp} from 'ramda'

const managers = (state=[], action) => {
      switch (action.type) {
        case 'SET_MANAGERS':
          return action.payload
        default:
          return state
      }
    }
const auth = (state= [], action) => {
  console.log('action is ', action)
      switch (action.type) {
        case 'EMAIL_CHANGED':
          return set(lensProp('email'), action.payload, state)
        case 'PASSWORD_CHANGED':
          return set(lensProp('password'), action.payload, state)
        case 'LOGIN_SUCESS':
          return action.payload
        default:
          return state
      }
    }


const store = createStore (
  combineReducers({
    managers,
    auth
  }),
  applyMiddleware(thunk)
)

export default store
