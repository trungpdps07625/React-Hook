import { createAction } from 'redux-actions';
import Axios from 'axios'

// Call API //
const updateAPI = "http://localhost:8000/api/customer/update-customer";

// Actions //
const updateListUserStart = createAction("UPDATE_LIST_USER_START");
const updateListUserSuccess = createAction("UPDATE_LIST_USER_SUCCESS");
const updateListUserFail = createAction("UPDATE_LIST_USER_FAIL");

const updateListUser = (data) => async ( dispatch , getState ) => {
    dispatch(updateListUserStart({
        listUser: {
            ...getState().UserReducer.listUser,
            loading: true,
        }
    }))

    const dataUser = data;

    try {
        const res = await Axios.put(updateAPI , dataUser);
        const Success = res.status === 200;
        console.log(res);
        console.log(Success);
        
        if(Success) {
            console.log(res);
            
            dispatch(updateListUserSuccess({
                listUser: {
                    ...getState().UserReducer.listUser,
                    loading: false,
                    updateUser: res.data.data
                }
            }))
        } else {
            dispatch(updateListUserFail({
                listUser: {
                    ...getState().UserReducer.listUser,
                    loading: false,
                    error: {
                        errorCode: "",
                        message: "Please retry, Undefind"
                    }
                }
            }))
        }
    } catch (error) {
        dispatch(updateListUserFail({
            listUser: {
                ...getState().UserReducer.listUser,
                loading: false,
                error: {
                    errorCode: "",
                    message: error
                }
            }
        }))
    }
    
}

export const updateUserAction = {
    updateListUser,
    updateListUserStart,
    updateListUserSuccess,
    updateListUserFail,
}



