import axiost from 'axios';
import { loginStart, loginFailure, loginSuccess, registerStart, registerSuccess, registerFailure, logOutStart, logOutSuccess, logOutFailure } from './authSlice';
import {
    getUsersStart,
    getUsersSuccess,
    getUsersFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
    addUserStart,
    addUserSuccess,
    addUserFailure
} from './userSlice';
import {
    getPlacesStart,
    getPlacesSuccess,
    getPlacesFailure,
    deletePlaceStart,
    deletePlaceSuccess,
    deletePlaceFailure,
    updatePlaceStart,
    updatePlaceSuccess,
    updatePlaceFailure,
    addPlaceStart as createPlaceStart,
    addPlaceSuccess as createPlaceSuccess,
    addPlaceFailure as createPlaceFailure,
} from './placeSlice';
import {
    getTypePlacesFailure, getTypePlacesStart, getTypePlacesSuccess,
    deleteTypePlaceStart, deleteTypePlaceSuccess, deleteTypePlaceFailure,
    updateTypePlaceStart, updateTypePlaceSuccess, updateTypePlaceFailure,
    addTypePlaceStart, addTypePlaceSuccess, addTypePlaceFailure
} from './typePlaceSlice';
import {
    getPlaces2Start, getPlaces2Success, getPlaces2Failure, deletePlace2Start, deletePlace2Success, deletePlace2Failure, updatePlace2Start, updatePlace2Success, updatePlace2Failure, addPlace2Start as createPlace2Start,
    addPlace2Success as createPlace2Success,
    addPlace2Failure as createPlace2Failure,
} from './place2Slice';
import ld from '../data/load.gif'
import { addNewsStart, addNewsSuccess, deleteNewsFailure, deleteNewsStart, getNewsFailure, getNewsStart, getNewsSuccess, updateNewsFailure, updateNewsStart, updateNewsSuccess } from './newsSlice';
// const host = 'http://localhost:8000/';
const host = "https://kltn-pdoe.onrender.com"
export const loading = () => {
    return (
        <div
            id='loading-screen'
            style={{
                position: 'fixed',
                zIndex: '99999',
                width: '100vw',
                height: '100vh',
                display: 'none',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                left: '0px',
                top: '0px',

            }}>
            <img src={ld} alt="" style={{
                width: '10rem',
                height: '10rem',
                objectFit: 'contain'
            }} />
        </div>
    )
}
export function showLoadingScreen() {
    document.getElementById("loading-screen").style.display = "flex";
}

export function hideLoadingScreen() {
    document.getElementById("loading-screen").style.display = "none";

}

export const showConfirm = (message) => {
    return window.confirm(message) ? hideLoadingScreen() : hideLoadingScreen();
};

export const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance.toFixed(2); // Distance in km
  };

// Get Weather
export const getWeather = async () => {
    try {
        const res = await axiost.get(`https://api.weatherapi.com/v1/forecast.json?q=An%20Giang&days=14&lang=vi&key=48cf1935cce6440886911534241306`,
            { headers: { 'Content-Type': 'application/json' } }
        );
        localStorage.setItem('weather', JSON.stringify(res?.data));
    } catch (err) {
        return err.response?.data;
    }
};


// Auth
export const loginUser = async (user, dispatch, navigate) => {
    showLoadingScreen()
    dispatch(loginStart());
    try {
        const res = await axiost.post(`${host}v1/auth/login/`, user);
        dispatch(loginSuccess(res.data));
        navigate('/kltn');
    } catch (err) {
        dispatch(loginFailure());
        alert("Tài khoản hoặc mật khẩu không đúng!");
        hideLoadingScreen()
    }
};

export const logOut = async (dispatch) => {
    showLoadingScreen()
    dispatch(logOutStart());
    setTimeout(() => {
        try {
            dispatch(logOutSuccess());
        } catch (err) {

            dispatch(logOutFailure());
        }
    }, 1000);
}

export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        const res = await axiost.post(`${host}v1/auth/register/`, user);
        dispatch(registerSuccess());
        navigate('/kltn/login');
        alert(res);
    } catch (err) {
        dispatch(registerFailure());
    }
};

// User
export const getAllUser = async (accessToken, dispatch) => {
    dispatch(getUsersStart());
    try {
        const res = await axiost.get(`${host}v1/user/`, {
            headers: {
                Token: `Bearer ${accessToken}`,
            },
        });
        dispatch(getUsersSuccess(res.data));
    } catch (err) {
        dispatch(getUsersFailure());
    }
};


export const deleteUser = async (id, accessToken, dispatch) => {
    dispatch(deleteUserStart());
    try {
        const res = await axiost.delete(`${host}v1/user/del/${id}`, {
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

export const updateUser = async (user, accessToken, dispatch) => {
    dispatch(updateUserStart());
    try {
        const res = await axiost.put(`${host}v1/user/update/${user.id}`, user, {
            headers: {
                Token: `Bearer ${accessToken}`,
            },
        });
        dispatch(updateUserSuccess(res.data));
    } catch (err) {
        dispatch(updateUserFailure());
    }
}

export const addUser = async (user, accessToken, dispatch) => {
    dispatch(addUserStart());
    try {
        const res = await axiost.post(`${host}v1/user/add/`, user, {
            headers: {
                Token: `Bearer ${accessToken}`,
            },
        });
        dispatch(addUserSuccess(res.data));
    } catch (err) {
        dispatch(addUserFailure());
    }
}



// Place

export const getAllPlace = async (accessToken, dispatch) => {
    dispatch(getPlacesStart());
    try {
        const res = await axiost.get(`${host}v1/place/`, {
            headers: {
                Token: `Bearer ${accessToken}`,
            },
        });
        dispatch(getPlacesSuccess(res.data));
    } catch (err) {
        dispatch(getPlacesFailure());
    }
};

export const addPlace = async (place, accessToken, dispatch) => {
    dispatch(createPlaceStart());
    try {
        const res = await axiost.post(`${host}v1/place/add/`, place, {
            headers: {
                Token: `Bearer ${accessToken}`,
            },
        });
        dispatch(createPlaceSuccess(res.data));
    } catch (err) {
        dispatch(createPlaceFailure());
    }
};

export const deletePlace = async (id, accessToken, dispatch) => {
    dispatch(deletePlaceStart());
    try {
        const res = await axiost.delete(`${host}v1/place/del/${id}`, {
            headers: {
                Token: `Bearer ${accessToken}`,
            },
        });
        dispatch(deletePlaceSuccess(res.data));
    } catch (err) {
        dispatch(deletePlaceFailure());
    }
};

export const updatePlace = async (place, accessToken, dispatch) => {
    dispatch(updatePlaceStart());
    try {
        const res = await axiost.put(`${host}v1/place/update/` + place.id, place, {
            headers: {
                Token: `Bearer ${accessToken}`,
            },
        });
        dispatch(updatePlaceSuccess(res.data));
    } catch (err) {
        dispatch(updatePlaceFailure());
    }
};

// Place2

export const getAllPlace2 = async (accessToken, dispatch) => {
    dispatch(getPlaces2Start());
    try {
        const res = await axiost.get(`${host}v1/place2/`, {
            headers: {
                Token: `Bearer ${accessToken}`,
            },
        });
        dispatch(getPlaces2Success(res.data));
    } catch (err) {
        dispatch(getPlaces2Failure());
    }
};

export const addPlace2 = async (place, accessToken, dispatch) => {
    dispatch(createPlace2Start());
    try {
        const res = await axiost.post(`${host}v1/place2/add/`, place, {
            headers: {
                Token: `Bearer ${accessToken}`,
            },
        });
        dispatch(createPlace2Success(res.data));
    } catch (err) {
        dispatch(createPlace2Failure());
    }
};

export const deletePlace2 = async (id, accessToken, dispatch) => {
    dispatch(deletePlace2Start());
    try {
        const res = await axiost.delete(`${host}v1/place2/del/${id}`, {
            headers: {
                Token: `Bearer ${accessToken}`,
            },
        });
        dispatch(deletePlace2Success(res.data));
    } catch (err) {
        dispatch(deletePlace2Failure());
    }
};

export const updatePlace2 = async (place, accessToken, dispatch) => {
    dispatch(updatePlace2Start());
    try {
        const res = await axiost.put(`${host}v1/place2/update/` + place.id, place, {
            headers: {
                Token: `Bearer ${accessToken}`,
            },
        });
        dispatch(updatePlace2Success(res.data));
    } catch (err) {
        dispatch(updatePlace2Failure());
    }
};

// TypePlace

export const getAllTypePlace = async (accessToken, dispatch) => {
    dispatch(getTypePlacesStart());
    try {
        const res = await axiost.get(`${host}v1/type/`, {
            headers: {
                Token: `Bearer ${accessToken}`,
            },
        });
        dispatch(getTypePlacesSuccess(res.data));
    } catch (err) {
        dispatch(getTypePlacesFailure());
    }
}

export const deleteTypePlace = async (id, accessToken, dispatch) => {
    dispatch(deleteTypePlaceStart());
    try {
        const res = await axiost.delete(`${host}v1/type/del/${id}`, {
            headers: {
                Token: `Bearer ${accessToken}`,
            },
        });
        dispatch(deleteTypePlaceSuccess(res.data));
    } catch (err) {
        dispatch(deleteTypePlaceFailure());
    }
}

export const updateTypePlace = async (typePlace, accessToken, dispatch) => {
    dispatch(updateTypePlaceStart());
    try {
        const res = await axiost.put(`${host}v1/type/update/${typePlace.id}`, typePlace, {
            headers: {
                Token: `Bearer ${accessToken}`,
            },
        });
        dispatch(updateTypePlaceSuccess(res.data));
    } catch (err) {
        dispatch(updateTypePlaceFailure());
    }
}

export const addTypePlace = async (typePlace, accessToken, dispatch) => {
    dispatch(addTypePlaceStart());
    try {
        const res = await axiost.post(`${host}v1/type/add/`, typePlace, {
            headers: {
                Token: `Bearer ${accessToken}`,
            },
        });
        dispatch(addTypePlaceSuccess(res.data));
    } catch (err) {
        dispatch(addTypePlaceFailure());
    }
}

// News
export const getAllNews = async (accessToken, dispatch) => {
    dispatch(getNewsStart());
    try {
        const res = await axiost.get(`${host}v1/news/`, {
            headers: {
                Token: `Bearer ${accessToken}`,
            },
        });
        dispatch(getNewsSuccess(res.data));
    } catch (err) {
        dispatch(getNewsFailure());
    }
};

export const addNews = async (news, accessToken, dispatch) => {
    dispatch(addNewsStart());
    try {
        const res = await axiost.post(`${host}v1/news/add/`, news, {
            headers: {
                Token: `Bearer ${accessToken}`,
            },
        });
        dispatch(addNewsSuccess(res.data));
    } catch (err) {
        dispatch([]);
    }
};

export const deleteNews = async (id, accessToken, dispatch) => {
    dispatch(deleteNewsStart());
    try {
        const res = await axiost.delete(`${host}v1/news/del/${id}`, {
            headers: {
                Token: `Bearer ${accessToken}`,
            },
        });
        dispatch(deleteNewsStart(res.data));
    } catch (err) {
        dispatch(deleteNewsFailure());
    }
}

export const updateNews = async (news, accessToken, dispatch) => {
    dispatch(updateNewsStart());
    try {
        const res = await axiost.put(`${host}v1/news/update/${news.id}`, news, {
            headers: {
                Token: `Bearer ${accessToken}`,
            },
        });
        dispatch(updateNewsSuccess(res.data));
    } catch (err) {
        dispatch(updateNewsFailure());
    }
}