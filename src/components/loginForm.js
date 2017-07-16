import React, { Component } from 'react'
import { Card, CardSection, InputField, Button } from './common'

class LoginForm extends Component {
  render() {
    return (
      <Card>
        <CardSection>
          <InputField label='Email'
                 placeholder='g@email.com' />
        </CardSection>

        <CardSection>
          <InputField secureTextEntry
                 label='Password'
                 placeholder='acb12_3' />
        </CardSection>

        <CardSection>
          <Button>Login</Button>
        </CardSection>
      </Card>
    )
  }
}

export default LoginForm
