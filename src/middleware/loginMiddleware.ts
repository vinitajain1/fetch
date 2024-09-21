import { loginError, loginStart, loginSuccess, User } from "../redux/authSlice";
import { updateSnackBar } from "../redux/notificationSnackbarSlice";
import { AppDispatch } from "../redux/store";
import { Severity } from "../types/types";

export const login = (user:User) => async (dispatch: AppDispatch) => {
    dispatch(loginStart());
    try {
      await fetch('https://frontend-take-home-service.fetch.com/auth/login', {
        method:"POST",
        credentials: 'include',
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify(user)
      });
      dispatch(loginSuccess(user));
    } catch (error: any) {
      dispatch(loginError('Login Failed!'));
      dispatch(updateSnackBar({open:true,message:"Authentication Failed!",severity:Severity.ERROR}));
    }
  };

export default login;