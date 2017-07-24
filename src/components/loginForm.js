import React, { Component } from 'react'
import { Text } from 'react-native'
import { Card, CardSection, InputField, Button, Spinner } from './common'
import { connect } from 'react-redux'
import {pathOr} from 'ramda'
import firebase from 'firebase'
import { Actions } from 'react-native-router-flux'


class LoginForm extends Component {

renderButton() {
  const props = this.props
  if (props.loading) {
    return <Spinner size='large' />
  }
    return (

      <Button onPress={props.onButtonPress(props.auth.email, props.auth.password)}>
        Login
      </Button>
    )
}

passwordText() {
  const props = this.props
  if (props.auth.password.length < 6) {
    return <Text style={styles.errorText}>(password must have six or more characters)</Text>
  }
    return <Text style={{ color: 'grey' }}  >(password must have six or more characters)</Text>
}

  render() {
  const props = this.props

    return (
      <Card>
        <CardSection>
          <InputField label='Email'
                 placeholder='g@email.com'
                 value={pathOr('', ['auth', 'email'], props)}
                 onChangeText={ (text) => props.onEmailChange(text)}
          />
        </CardSection>

        <CardSection>
          <InputField secureTextEntry
                 label='Password'
                 placeholder='P@sswe_rd'
                 placeholderTextColor='red'
                 value={pathOr('', ['auth', 'password'], props)}
                 onChangeText={ (text) => props.onPasswordChange(text)}
                 keyboardType='email-address'
          />
        </CardSection>
        <CardSection>
          { this.passwordText() }
        </CardSection>

        <Text style={styles.errorText}>{props.auth.error}</Text>

        <CardSection>
          {this.renderButton() }
        </CardSection>
      </Card>
    )
  }
}

const styles = {
  errorText: {
    fontSize: 14,
    alignItems: 'center',
    color: 'red'
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

const mapActionsToProps = (dispatch) => ({
  onEmailChange: (text) => dispatch({ type: 'EMAIL_CHANGED', payload: text }),
  onPasswordChange: (text) => dispatch({ type: 'PASSWORD_CHANGED', payload: text }),
  onButtonPress: (email, password) => (e) => {

    dispatch({ type: 'LOGGING_IN' })
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user))
      .catch( () => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(user => loginUserSuccess(dispatch, user))
          .catch( () => loginUserFail(dispatch))
      })
  }

})


{/* ////// helper functions   //////*/}

const loginUserSuccess = (dispatch, user) => {
  dispatch({ type: 'LOGIN_SUCCESS', payload: user })
    Actions.employeeList()
}
const loginUserFail = (dispatch) => {
  dispatch({ type: 'LOGIN_FAIL' })
}


const connector = connect(mapStateToProps, mapActionsToProps)

export default connector(LoginForm)
