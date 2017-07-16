import React, { Component } from 'react'
import { Card, CardSection, InputField, Button } from './common'
import { connect } from 'react-redux'
import {pathOr} from 'ramda'
import firebase from 'firebase'


class LoginForm extends Component {

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
                 value={pathOr('', ['auth', 'password'], props)}
                 onChangeText={ (text) => props.onPasswordChange(text)}
          />
        </CardSection>

        <CardSection>
          <Button onPress={props.onButtonPress(props.auth.email, props.auth.password)}>
            Login
          </Button>
        </CardSection>
      </Card>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

const mapActionsToProps = (dispatch) => ({
  onEmailChange: (text) => dispatch({ type: 'EMAIL_CHANGED', payload: text }),
  onPasswordChange: (text) => dispatch({ type: 'PASSWORD_CHANGED', payload: text }),
  onButtonPress: (email, password) => (e) => {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(user => {
          dispatch({ type: 'LOGIN_SUCESS', payload: user })
        })
}

})
const connector = connect(mapStateToProps, mapActionsToProps)

export default connector(LoginForm)
