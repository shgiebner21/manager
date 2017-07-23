import { createStore, combineReducers, applyMiddleware } from 'redux'
import { ListView } from 'react-native'
import thunk from 'redux-thunk'
import {set, lensProp} from 'ramda'

const initialState = {
  email: '',
  password: '',
  user: '',
  error: '',
  loading: false
}

const auth = (state = initialState, action) => {
      switch (action.type) {
        case 'EMAIL_CHANGED':
          return set(lensProp('email'), action.payload, state)
        case 'PASSWORD_CHANGED':
          return set(lensProp('password'), action.payload, state)
        case 'LOGIN_SUCCESS':
          return { user: action.payload, loading: false, error: 'Login successful',
                   ...state }
        case 'LOGIN_FAIL':
          return { error: 'Authentication failed.',loading: false, password: '' }
        case 'LOGGING_IN':
          return { loading: true, error: '', ...state }
        default:
          return state
      }
    }

const employee = (state = {}, action) => {
  switch (action.type) {
    case 'NAME_CHANGED':
      return set(lensProp('name'), action.payload, state)
    case 'PHONE_CHANGED':
      return set(lensProp('phone'), action.payload, state)
    default:
      return state
  }
}


const store = createStore (
  combineReducers({
    auth,
    employee
  }),
  applyMiddleware(thunk)
)

export default store
