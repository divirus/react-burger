import { createSlice } from '@reduxjs/toolkit'
import { mockUserData } from '../utils/user-mock';
import { 
    LOGIN_API_URL, 
    REGISTER_API_URL, 
    FORGOT_PASSWORD_API_URL, 
    RESET_PASSWORD_API_URL, 
    LOGOUT_API_URL, 
    TOKEN_API_URL, 
    USER_API_URL 
} from "../utils/api";
import { getCookie, setCookie, deleteCookie } from '../utils/cookie';

export const getUser = () => {
  return (dispatch: any) => {
    dispatch(userSlice.actions.request());
    fetch(USER_API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getCookie('accessToken')
      }
    } as RequestInit)
    .then(res => {
      if (!res.ok && res.status >= 500) {
        throw Error(res.statusText);
        }
      return res.json();
      })
    .then((data) => {
      if (data.success === true) {
        dispatch(userSlice.actions.setName(data.user.name));
        dispatch(userSlice.actions.setEmail(data.user.email));
        dispatch(userSlice.actions.setAuthorization(true));
        dispatch(userSlice.actions.success(data));
      } else if (data.message === 'You should be authorised') {
        dispatch(userSlice.actions.setAuthorization(false));
        dispatch(userSlice.actions.success(data));
      } else if (data.message === 'jwt expired') {
        refreshToken()
        .then((refresh_res) => {
          if (!refresh_res.ok && refresh_res.status >= 500) {
            throw Error(refresh_res.statusText);
          }
          return refresh_res.json();
        })
        .then((refresh_data) => {
          if (refresh_data.success === true) {
            setCookie('accessToken', refresh_data.accessToken, { path: '/' });
            setCookie('refreshToken', refresh_data.refreshToken, { path: '/' });
            fetch(USER_API_URL, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: getCookie('accessToken'),
              }
            } as RequestInit)
            .then(res => {
              if (!res.ok && res.status >= 500) {
                throw Error(res.statusText);
                }
              return res.json();
              })
            .then((data) => {
              if (data.success) {
                dispatch(userSlice.actions.setName(data.user.name));
                dispatch(userSlice.actions.setEmail(data.user.email));
                dispatch(userSlice.actions.setAuthorization(true));
                dispatch(userSlice.actions.success(data));
              } else if (data.message === 'You should be authorised') {
                dispatch(userSlice.actions.setAuthorization(false));
                dispatch(userSlice.actions.success(data));
              } else {
                throw Error(data.message);
              }
            })
            .catch((error) => {
              dispatch(userSlice.actions.setAuthorization(false));
              dispatch(userSlice.actions.failed())
              console.log(error);
            })
          } else {
            throw Error(refresh_data.message);
          }
        })
        .catch((error) => {
          dispatch(userSlice.actions.setAuthorization(false));
          dispatch(userSlice.actions.failed())
          console.log(error);
        });
      } else {
        throw Error(data.message);
      }
    })
    .catch((error) => {
      dispatch(userSlice.actions.setAuthorization(false));
      dispatch(userSlice.actions.failed())
      console.log(error);
    })
  }
}

export const setUser = (user: any) => {
  return (dispatch: any) => {
    dispatch(userSlice.actions.request());
    fetch(USER_API_URL, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getCookie('accessToken')
      },
      body: JSON.stringify({
        "email": user.email,
        "password": user.password,
        "name": user.name,
      })
    } as RequestInit)
    .then(res => {
      if (!res.ok && res.status >= 500) {
        throw Error(res.statusText);
        }
      return res.json();
      })
    .then((data) => {
      if (data.success === true) {
        dispatch(userSlice.actions.setName(data.user.name));
        dispatch(userSlice.actions.setEmail(data.user.email));
        dispatch(userSlice.actions.success(data));
      } else if (data.message === 'jwt expired') {
        refreshToken()
        .then((refresh_res) => {
          if (!refresh_res.ok && refresh_res.status >= 500) {
            throw Error(refresh_res.statusText);
          }
          return refresh_res.json();
        })
        .then((refresh_data) => {
          if (refresh_data.success === true) {
            setCookie('accessToken', refresh_data.accessToken, { path: '/' });
            setCookie('refreshToken', refresh_data.refreshToken, { path: '/' });
            fetch(USER_API_URL, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: getCookie('accessToken'),
              },
              body: JSON.stringify({
                "email": user.email,
                "password": user.password,
                "name": user.name,
              })
            } as RequestInit)
            .then(res => {
              if (!res.ok && res.status >= 500) {
                throw Error(res.statusText);
                }
              return res.json();
              })
            .then((data) => {
              if (data.success) {
                dispatch(userSlice.actions.setName(data.user.name));
                dispatch(userSlice.actions.setEmail(data.user.email));
                dispatch(userSlice.actions.success(data));
              } else {
                throw Error(data.message);
              }
            })
            .catch((error) => {
              dispatch(userSlice.actions.failed())
              console.log(error);
            })
          } else {
            throw Error(refresh_data.message);
          }
        })
        .catch((error) => {
          dispatch(userSlice.actions.failed())
          console.log(error);
        });
      } else {
        throw Error(data.message);
      }
    })
    .catch((error) => {
      dispatch(userSlice.actions.failed())
      console.log(error);
    })
  }
}

export const register = (user: any, redirectCallback: any) => {
  return (dispatch: any) => {
    dispatch(userSlice.actions.request());
    fetch(REGISTER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "email": user.email,
        "password": user.password,
        "name": user.name,
      })
    } as RequestInit)
    .then(res => {
      if (!res.ok && res.status >= 500) {
        throw Error(res.statusText);
        }
      return res.json();
      })
    .then((data) => {
      if (data.success) {
        dispatch(userSlice.actions.setEmail(data.user.email));
        dispatch(userSlice.actions.setName(data.user.name));

        setCookie('accessToken', data.accessToken, { path: '/' });
        setCookie('refreshToken', data.refreshToken, { path: '/' });

        dispatch(userSlice.actions.setAuthorization(true));
        dispatch(userSlice.actions.success(data));
        redirectCallback();
      } else {
        throw Error(data.message);
      }
    })
    .catch((error) => {
      dispatch(userSlice.actions.setAuthorization(false));
      dispatch(userSlice.actions.failed())
      console.log(error);
    })
  }
}

export const login = (user: any, redirectCallback: any) => {
  return (dispatch: any) => {
    dispatch(userSlice.actions.request());
    fetch(LOGIN_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "email": user.email,
        "password": user.password
      })
    } as RequestInit)
    .then(res => {
      if (!res.ok && res.status >= 500) {
        throw Error(res.statusText);
        }
      return res.json();
      })
    .then((data) => {
      if (data.success) {
        dispatch(userSlice.actions.setEmail(data.user.email));
        dispatch(userSlice.actions.setName(data.user.name));

        setCookie('accessToken', data.accessToken, { path: '/' });
        setCookie('refreshToken', data.refreshToken, { path: '/' });

        dispatch(userSlice.actions.setAuthorization(true));
        dispatch(userSlice.actions.success(data));
        redirectCallback();
      } else {
        throw Error(data.message);
      }
    })
    .catch((error) => {
      dispatch(userSlice.actions.setAuthorization(false));
      dispatch(userSlice.actions.failed())
      console.log(error);
    })
  }
}

export const forgotPassword = (email: any, redirectCallback: any) => {
  return (dispatch: any) => {
    dispatch(userSlice.actions.request());
    fetch(FORGOT_PASSWORD_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "email": email
      })
    } as RequestInit)
    .then(res => {
      if (!res.ok && res.status >= 500) {
        throw Error(res.statusText);
        }
      return res.json();
      })
    .then((data) => {
      if (data.success) {
        dispatch(userSlice.actions.success(data));
        redirectCallback();
      } else {
        throw Error(data.message);
      }
    })
    .catch((error) => {
      dispatch(userSlice.actions.failed())
      console.log(error);
    })
  }
}

export const resetPassword = (code: any, password: any, redirectCallback: any) => {
  return (dispatch: any) => {
    dispatch(userSlice.actions.request());
    fetch(RESET_PASSWORD_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "password": password,
        "token": code
      })
    } as RequestInit)
    .then(res => {
      if (!res.ok && res.status >= 500) {
        throw Error(res.statusText);
        }
      return res.json();
      })
    .then((data) => {
      if (data.success) {
        dispatch(userSlice.actions.success(data));
        redirectCallback();
      } else {
        throw Error(data.message);
      }
    })
    .catch((error) => {
      dispatch(userSlice.actions.failed())
      console.log(error);
    })
  }
}

export const logout = (redirectCallback: any) => {
  const refreshToken = getCookie('refreshToken');

  return (dispatch: any) => {
    dispatch(userSlice.actions.request());
    fetch(LOGOUT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "token": refreshToken
      })
    } as RequestInit)
    .then(res => {
      if (!res.ok && res.status >= 500) {
        throw Error(res.statusText);
        }
      return res.json();
      })
    .then((data) => {
      if (data.success) {
        deleteCookie('accessToken');
        deleteCookie('refreshToken');
  
        dispatch(userSlice.actions.resetUserData());
        dispatch(userSlice.actions.setAuthorization(false));
        dispatch(userSlice.actions.success(data));
        redirectCallback();
      } else {
        throw Error(data.message);
      }
    })
    .catch((error) => {
      dispatch(userSlice.actions.failed())
      console.log(error);
    })
  }
}

export const refreshToken = () => {
  return fetch(TOKEN_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "token": getCookie('refreshToken')
    })
  } as RequestInit)
}

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {
      password: mockUserData.password,
      email: '',
      name: '',
    },
    userRequest: false,
    userFailed: false,
    userSuccess: false,
    isAuthorized: false
  },
  reducers: {
    request(state) {
      state.userRequest = true;
      state.userFailed = false;
      state.userSuccess = false;
    },
    failed(state) {
      state.userFailed = true;
      state.userRequest = false;
      state.userSuccess = false;
    },
    success(state, action) {
      state.userSuccess = true;
      state.userRequest = false;
      state.userFailed = false;
    },
    setName(state, action) {
      state.user = {
        ...state.user,
        name: action.payload
        }
    },
    setPassword(state, action) {
      state.user = {
        ...state.user,
        password: action.payload
        }
    },
    setEmail(state, action) {
      state.user = {
        ...state.user,
        email: action.payload
      }
    },
    setOrders(state, action) {
      state.user = {
        ...state.user
      }
    },
    resetStatus(state) {
      state.userFailed = false;
    },
    resetUserData(state) {
      state.user.name = '';
      state.user.email = '';
      state.user.password = mockUserData.password;
    },
    setAuthorization(state, action) {
      state.isAuthorized = action.payload;
    },
    checkAuthorization(state) {
      state.isAuthorized = ((getCookie('accessToken') !== undefined) &&
        (getCookie('refreshToken') !== undefined));
    }
  }
}) 