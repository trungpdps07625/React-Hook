import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { Actions } from '../store/actions/RootAction';
import  TableUsers  from '../components/user/tableUser'

const User = (props) => {
   
    useEffect(() => {
        props.Actions.readListUser(10, 1);

    }, [props.Actions])

    return (
        <React.Fragment>
            <TableUsers 
                getData      = {props.listUser.data}
                loadingTable = {props.listUser.loading}
                readListUser = {props.Actions.readListUser}
                createListUser = {props.Actions.createListUser}
                updateListUser = {props.Actions.updateListUser}
                deleteListUser = {props.Actions.deleteListUser}
            />
        </React.Fragment>
    )
}
export default connect(
    (state) => ({
        listUser: state.UserReducer.listUser
    }),
    (dispatch) => ({
        Actions: bindActionCreators(Object.assign(Actions.ActionsUser), dispatch)
    })
)(User);