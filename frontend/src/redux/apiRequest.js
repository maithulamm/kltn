import axiost from 'axios';
import { loginStart, loginFailure, loginSuccess, registerStart, registerSuccess, registerFailure, logOutStart, logOutSuccess, logOutFailure } from './authSlice';
import { getUsersStart, getUsersSuccess, getUsersFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure } from './userSlice';
import { getPlacesStart, getPlacesSuccess, getPlacesFailure } from './placeSlice';

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axiost.post('https://kltn-pdoe.onrender.com/v1/auth/login', user);
        dispatch(loginSuccess(res.data));
        navigate('/home');
    } catch (err) {
        dispatch(loginFailure());
        alert("Tài khoản hoặc mật khẩu không đúng!");
    }
};

export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        const res = await axiost.post('https://kltn-pdoe.onrender.com/v1/auth/register', user);
        dispatch(registerSuccess());
        navigate('/login');
        //alert("Đăng ký thành công!");
    } catch (err) {
        dispatch(registerFailure());
    }
};

export const getAllUser = async (accessToken, dispatch) => {
    dispatch(getUsersStart());
    try {
        const res = await axiost.get('https://kltn-pdoe.onrender.com/v1/user/', {
            headers: {
                Token: `Bearer ${accessToken}`,
            },
        });
        dispatch(getUsersSuccess(res.data));
    } catch (err) {
        dispatch(getUsersFailure());
    }
};

export const getAllPlace = async (accessToken, dispatch) => {
    dispatch(getPlacesStart());
    try {
        const res = await axiost.get('https://kltn-pdoe.onrender.com/v1/place/', {
            headers: {
                Token: `Bearer ${accessToken}`,
            },
        });
        dispatch(getPlacesSuccess(res.data));
    } catch (err) {
        dispatch(getPlacesFailure());
    }
};


export const deleteUser = async (id, accessToken, dispatch) => {
    dispatch(deleteUserStart());
    try {
        const res = await axiost.delete("https://kltn-pdoe.onrender.com/v1/user/"+id, {
            headers: {
                Token: `Bearer ${accessToken}`,
            },
        });
        dispatch(deleteUserSuccess(res.data));
    } catch (err) {
        dispatch(deleteUserFailure(err.response.data));
        //alert("Không thể xóa!");
    }
}

export const logOut = async (dispatch, navigate, accessToken, id) => {
    dispatch(logOutStart());
    try {
        // await axiost.post('https://kltn-pdoe.onrender.com/v1/auth/logout', id , {
        //     headers: {
        //         Token: `Bearer ${accessToken}`,
        //     },
        // });
        dispatch(logOutSuccess());
        navigate('/admin/login');
    } catch (err) {
        
        dispatch(logOutFailure());
    }
}

