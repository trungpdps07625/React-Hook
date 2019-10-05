import { createAction } from 'redux-actions';
import Axios from 'axios'

// Call API //
const readAPI = "http://localhost:8000/api/customer/create-customer";

// Actions //
const createListUserStart = createAction("READ_LIST_USER_START");
const createListUserSuccess = createAction("READ_LIST_USER_SUCCESS");
const createListUserFail = createAction("READ_LIST_USER_FAIL");

const createListUser = (full_name , phone , address) => async ( dispatch , getState ) => {
    dispatch(createListUserStart({
        listUser: {
            ...getState().UserReducer.listUser,
            loading: true,
        }
    }))

    const dataUser = {
        full_name,
        phone,
        address
    }

    try {
        const res = await Axios.post(readAPI , dataUser);
        const Success = res.status === 200;
        console.log(res);
        console.log(Success);
        
        if(Success) {
            console.log(res);
            
            dispatch(createListUserSuccess({
                listUser: {
                    ...getState().UserReducer.listUser,
                    loading: false,
                    createUser: res.data.data
                }
            }))
        } else {
            dispatch(createListUserFail({
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
        dispatch(createListUserFail({
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

export const createUserAction = {
    createListUser,
    createListUserStart,
    createListUserSuccess,
    createListUserFail,
}



