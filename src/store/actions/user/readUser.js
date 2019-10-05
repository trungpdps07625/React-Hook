import { createAction } from 'redux-actions';
import Axios from 'axios'

// Call API //
const readAPI = "http://localhost:8000/api/customer/get-customer";

// Actions //
const readListUserStart = createAction("READ_LIST_USER_START");
const readListUserSuccess = createAction("READ_LIST_USER_SUCCESS");
const readListUserFail = createAction("READ_LIST_USER_FAIL");

const readListUser = (limit,pageNum) => async ( dispatch , getState ) => {
    dispatch(readListUserStart({
        listUser: {
            ...getState().UserReducer.listUser,
            loading: true,
        }
    }))

    const pager = {limit,pageNum}

    try {
        const res = await Axios.get(readAPI, {params: pager});
        const Success = res.status === 200;
        console.log(res);
        // console.log(Success);
        
        if(Success) {
            // console.log(res);
            
            dispatch(readListUserSuccess({
                listUser: {
                    ...getState().UserReducer.listUser,
                    loading: false,
                    data: res.data.data,
                }
            }))
        } else {
            dispatch(readListUserFail({
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
        dispatch(readListUserFail({
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

export const readUserAction = {
    readListUser,
    readListUserStart,
    readListUserSuccess,
    readListUserFail,
}



