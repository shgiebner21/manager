import React, { Component } from 'react'
import { View, Text } from 'react-native'
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
      databaseURL: process.env.DB_URL_SECRET,
      projectId: "manager-2669a",
      storageBucket: process.env.BUCKET_SECRET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID
    })
  }

  render() {
    return (
      <Router sceneStyle={{ paddingTop: 65 }}>
        <View>
          <Scene key="auth">
            <Scene key="login"  component={LoginForm} title="Please Login" />
          </Scene>

          <Scene key="main">
            <Scene key="employeeList" component={EmployeeList} title="Employees"
                   onRight={ () => Actions.employeeCreate() } rightTitle="Add >"
                   initial />
                 <Scene key="employeeCreate" component={EmployeeCreate} title="Create Employee" />
          </Scene>
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
