import React, { Component } from 'react'
import { View } from 'react-native'
import { Provider } from 'react-redux'
import { Scene, Router } from 'react-native-router-flux'
import firebase from 'firebase'
import { Actions } from 'react-native-router-flux'
import store from './store'
import LoginForm from './src/components/loginForm'
import EmployeeList from './src/components/employeeList'
import EmployeeCreate from './src/components/employeeCreate'

class App extends Component {
  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyA4Qf2KqtlgSyi-SLY7aXImmpRY-G8NtFo",
      authDomain: "manager-2669a.firebaseapp.com",
      databaseURL: "https://manager-2669a.firebaseio.com",
      projectId: "manager-2669a",
      storageBucket: "manager-2669a.appspot.com",
      messagingSenderId: "1022241608684"
    })
  }

  render() {
    return (
      <Router>
        <View>
              <Scene key="login" component={LoginForm} title="Please Login" initial />

              <Scene key="employeeList" component={EmployeeList} title="Employees"
                     onRight={ () => Actions.employeeCreate() } rightTitle="Add >"
               />
              <Scene key="employeeCreate" component={EmployeeCreate} title="Create Employee" />
        </View>
      </Router>
    )
  }
}




export default () => {
  return (
    <Provider store={store} >
      <App />
    </Provider>
  )
}
