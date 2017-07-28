import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import firebase from 'firebase'

class EmployeeList extends Component {
  componentWillMount() {
    const { currentUser } = firebase.auth()
    console.log('currentUser is ', currentUser)
    this.props.employeesFetch(currentUser)

  }

  render() {

    return (
      <View>
        <Text>Employee</Text>
        <Text>Employee</Text>
        <Text>Employee</Text>
        <Text>Employee</Text>
        <Text>Employee</Text>
        <Text>Employee</Text>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  employees: state.employees
})
const mapActionsToProps = (dispatch) => ({
  employeesFetch: (user) => {
    console.log('inside employeesFetch')
    firebase.database().ref(`/users/${user.uid}/employees`)
      .on('value', snapshot => {
        dispatch({ type: 'EMPLOYEE_FETCH_SUCCESS', payload: snapshot.val() })
      })
  }
})

const connector = connect(mapStateToProps, mapActionsToProps)

export default connector(EmployeeList)
