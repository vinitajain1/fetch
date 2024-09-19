import { loginError, loginStart, loginSuccess, User } from "../redux/authSlice";
import { AppDispatch } from "../redux/store";

export const login = (user:User) => async (dispatch: AppDispatch) => {
    dispatch(loginStart());
    try {
      const response = await fetch('https://frontend-take-home-service.fetch.com/auth/login', {
        method:"POST",
        credentials: 'include',
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify(user)
      });
      dispatch(loginSuccess(user));
    } catch (error: any) {
      dispatch(loginError(error.message || 'Something went wrong'));
    }
  };

export default login;