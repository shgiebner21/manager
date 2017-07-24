import React, { Component } from 'react'
import { Picker, Text } from 'react-native'
import { connect } from 'react-redux'
import firebase from 'firebase'
import { pathOr, map } from 'ramda'
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
                  onValueChange={ day => props.onDayChange(day) }
          >
            { map(pickerDay, shiftDays) }
          </Picker>
        </CardSection>

        <CardSection>
          <Button>Create Employee</Button>
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
  employee: state.employee
})
const mapActionsToProps = (dispatch) => ({
  onNameChange: (text) => dispatch({ type: 'NAME_CHANGED', payload: text }),
  onPhoneChange: (text) => dispatch({ type: 'PHONE_CHANGED', payload: text }),
  onDayChange: (day) => dispatch({ type: 'DAY_CHANGED', payload: day })
})

const connector = connect(mapStateToProps, mapActionsToProps)

export default connector(EmployeeCreate)
