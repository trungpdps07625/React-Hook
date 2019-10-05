import { createAction } from 'redux-actions';
import Axios from 'axios'

// Call API //
const deleteAPI = "http://localhost:8000/api/customer/delete-customer";

// Actions //
const deleteListUserStart = createAction("DELETE_LIST_USER_START");
const deleteListUserSuccess = createAction("DELETE_LIST_USER_SUCCESS");
const deleteListUserFail = createAction("DELETE_LIST_USER_FAIL");

const deleteListUser = (uuid) => async ( dispatch , getState ) => {
    dispatch(deleteListUserStart({
        listUser: {
            ...getState().UserReducer.listUser,
            loading: true,
        }
    }))

    const deleteId = { uuid };

    try {
        const res = await Axios.delete(deleteAPI ,{data: deleteId});
        const Success = res.status === 200;        
        if(Success) {
            console.log(res);
            
            dispatch(deleteListUserSuccess({
                listUser: {
                    ...getState().UserReducer.listUser,
                    loading: false,
                    // data: {...getState().UserReducer.listUser[0].filter((item) => item.uuid !== deleteId)}
                }
            }))
        } else {
            dispatch(deleteListUserFail({
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
        dispatch(deleteListUserFail({
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

export const deleteUserAction = {
    deleteListUser,
    deleteListUserStart,
    deleteListUserSuccess,
    deleteListUserFail,
}



