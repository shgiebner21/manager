import React, { Component } from 'react'
import { Picker, Text } from 'react-native'
import { connect } from 'react-redux'
import firebase from 'firebase'
import { pathOr, map } from 'ramda'
import { Actions } from 'react-native-router-flux'
import { Card, CardSection, InputField, Button } from './common'


const shiftDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday',
         'Friday', 'Saturday', 'Sunday']

const pickerDay = (day) => {
 return <Picker.Item key={day} label={day} value={day} />
}

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
                       keyboardType='numeric'
          />
        </CardSection>

        <CardSection>
          <Text style={ styles.pickerTextStyle }>Shift</Text>
          <Picker style={{ flex: 1 }}
                  selectedValue={props.shift}
                  onValueChange={ (itemValue, itemIndex) => props.onDayChange( itemValue ) }
          >
            { map(pickerDay, shiftDays) }
          </Picker>
        </CardSection>

        <CardSection>
          <Button onPress={props.onButtonPress(props.employee.name, props.employee.phone, props.employee.shift )}
          >Create Employee</Button>
        </CardSection>
      </Card>
    )
  }
}

const styles = {
  pickerTextStyle: {
    fontSize: 18,
    paddingLeft: 20
  }
}

const mapStateToProps = (state) => ({
  employee: state.employee,
  auth: state.auth
})
const mapActionsToProps = (dispatch) => ({
  onNameChange: (text) => dispatch({ type: 'NAME_CHANGED', payload: text }),
  onPhoneChange: (text) => dispatch({ type: 'PHONE_CHANGED', payload: text }),
  onDayChange: (shift) => dispatch({ type: 'DAY_CHANGED', payload: shift }),
  onButtonPress: (name, phone, shift) => (e) => {
    const { currentUser } = firebase.auth()
    console.log(`/users/${currentUser.uid}/employees`)
    firebase.database().ref(`/users/${currentUser.uid}/employees`)
      .push({ name, phone, shift })
      Actions.popTo('employeeList')
      dispatch({ type: 'DAY_RESET' })
  }
})

const connector = connect(mapStateToProps, mapActionsToProps)

export default connector(EmployeeCreate)
