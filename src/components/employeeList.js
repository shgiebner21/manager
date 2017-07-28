import React, { Component } from 'react'
import { ListView, View, Text } from 'react-native'
import { connect } from 'react-redux'
import firebase from 'firebase'
import ListItem from './listItem'


class EmployeeList extends Component {
  componentWillMount() {
    const { currentUser } = firebase.auth()

    this.props.employeesFetch(currentUser)
  }
  componentWillReceiveProps(nextProps) {

  }

  renderRow(employee) {
    return <ListItem employee={employee} />
  }

  render() {
    console.log('dataSource is ', this.props.dataSource._dataBlob)


    return (

        <ListView enableEmptySections
                  dataSource={this.props.dataSource}
                  renderRow={this.renderRow}
        />

    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  employees: state.employees,
  dataSource: state.dataSource
})
const mapActionsToProps = (dispatch) => ({
  employeesFetch: (user) => {
    firebase.database().ref(`/users/${user.uid}/employees`)
      .on('value', snapshot => {
        dispatch({ type: 'EMPLOYEE_FETCH_SUCCESS', payload: snapshot.val() })
      })
  }
})

const connector = connect(mapStateToProps, mapActionsToProps)

export default connector(EmployeeList)
