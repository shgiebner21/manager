import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { ListView } from 'react-native'
import {set, lensProp} from 'ramda'

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2 })

const initialState = {
  email: '',
  password: '',
  user: '',
  error: '',
  loading: false
}
const initialEmployee = {
  name: '',
  phone: '',
  shift: ''
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

const employee = (state = initialEmployee, action) => {
  switch (action.type) {
    case 'NAME_CHANGED':
      return set(lensProp('name'), action.payload, state)
    case 'PHONE_CHANGED':
      return set(lensProp('phone'), action.payload, state)
    case 'DAY_CHANGED':
      return set(lensProp('shift'), action.payload, state)
    case 'DAY_RESET':
      return initialEmployee
    default:
      return state
  }
}

const employees = (state = {}, action) => {
  switch (action.type) {
    case 'EMPLOYEE_FETCH_SUCCESS':
    console.log('Fetch_Success action is ', action.payload)
      return action.payload
    default:
      return state
  }
}
const dataSource = (state=ds.cloneWithRows([]), action) => {
  switch (action.type) {
    case 'EMPLOYEE_FETCH_SUCCESS':
      return ds.cloneWithRows(action.payload)
    default:
      return state
  }
}


const store = createStore (
  combineReducers({
    auth,
    employee,
    employees,
    dataSource
  }),
  applyMiddleware(thunk)
)

export default store
