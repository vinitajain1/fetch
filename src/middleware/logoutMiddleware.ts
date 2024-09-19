import { User } from "../redux/authSlice";
import { AppDispatch } from "../redux/store";

export const logoutMiddleware = () => async (dispatch: AppDispatch) => {
    dispatch({ type: "logout" });
  };
export default logoutMiddleware;