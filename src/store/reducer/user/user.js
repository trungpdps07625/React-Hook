import { handleActions , combineActions } from 'redux-actions';
import { readUserAction } from '../../actions/user/readUser';
import { createUserAction } from '../../actions/user/createUser';
import { deleteUserAction } from '../../actions/user/deleteUser';
import { updateUserAction } from '../../actions/user/updateUser';

let initState = {
    listUser: {
        data: [],
        error: {
            errorCode: "",
            message: ""
        },
        loading: false
    },
}

const UserReducer = handleActions({
    [combineActions(
        // read
        readUserAction.readListUserStart,
        readUserAction.readListUserSuccess,
        readUserAction.readListUserFail,

        // create
        createUserAction.createListUserStart,
        createUserAction.createListUserSuccess,
        createUserAction.createListUserFail,

        // delete
        deleteUserAction.deleteListUserStart,
        deleteUserAction.deleteListUserSuccess,
        deleteUserAction.deleteListUserFail,

        // update
        updateUserAction.updateListUserStart,
        updateUserAction.updateListUserSuccess,
        updateUserAction.updateListUserFail,
    ).toString()]: (state , action) => {
        return {...state, ...action.payload}
    }
}, initState);
console.log(UserReducer);

export default UserReducer;
