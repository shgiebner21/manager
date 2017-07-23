import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'

class EmployeeList extends Component {
  render() {
    return (
      <View>
        <Text>Employee</Text>
        <Text>Employee</Text>
        <Text>Employee</Text>
        <Text>Employee</Text>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

const connector = connect(mapStateToProps)

export default connector(EmployeeList)
