import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Provider } from 'react-redux'
import firebase from 'firebase'
import store from './store'
import LoginForm from './src/components/loginForm'

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
      <View>
        <LoginForm />
      </View>
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
