import { Alert, Snackbar } from "@mui/material"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootStoreState } from "../redux/store";
import { updateSnackBar } from "../redux/notificationSnackbarSlice";

const NotificationSnackbar = ()=>{
    const snackbarState = useSelector((store:RootStoreState)=>store.notificationSnackbarSlice)
    const dispatch = useDispatch<AppDispatch>();
    const handleOnClose = ()=>{
        dispatch(updateSnackBar({open:false}))
    }
    return (
        <Snackbar role="alert" anchorOrigin={{ vertical:'top', horizontal:'right' }} open={snackbarState.open} autoHideDuration={5000} onClose={handleOnClose}>
            <Alert onClose={handleOnClose} severity={snackbarState.severity}>
                {snackbarState.message}
            </Alert>
        </Snackbar>
    )
}

export default NotificationSnackbar;