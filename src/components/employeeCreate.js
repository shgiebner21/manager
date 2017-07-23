import React, { Component } from 'react'
import { connect } from 'react-redux'
import firebase from 'firebase'
import { pathOr } from 'ramda'
import { Card, CardSection, InputField, Button } from './common'

class EmployeeCreate extends Component {
  render() {
    const props = this.props

    return (
      <Card>
        <CardSection>
          <InputField  label='Name'
                       placeholder='firstName'
                       onChangeText={ (text) => props.onNameChange(text) }
                       value={pathOr('', ['employee', 'name'], props)}
          />
        </CardSection>
        <CardSection>
          <InputField  label='Phone'
                       placeholder='555-555-5555'
                       onChangeText={ (text) => props.onPhoneChange(text) }
                       value={pathOr('', ['employee', 'phone'], props)}
          />
        </CardSection>
        <CardSection>
          <Button>Create Employee</Button>
        </CardSection>
      </Card>
    )
  }
}

const mapStateToProps = (state) => ({
  employee: state.employee
})
const mapActionsToProps = (dispatch) => ({
  onNameChange: (text) => dispatch({ type: 'NAME_CHANGED', payload: text }),
  onPhoneChange: (text) => dispatch({ type: 'PHONE_CHANGED', payload: text })
})

const connector = connect(mapStateToProps, mapActionsToProps)

export default connector(EmployeeCreate)
