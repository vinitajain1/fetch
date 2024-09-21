import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { User } from "../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootStoreState } from "../redux/store";
import logoutMiddleware from "../middleware/logoutMiddleware";
export default function Header(){
    const user:User = useSelector((store:RootStoreState)=>store.authSlice.user); 
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const handleLogout = async()=>{
        await fetch("https://frontend-take-home-service.fetch.com/auth/logout",{
            credentials:'include',
            method:"POST"
        });
        dispatch(logoutMiddleware());
        navigate("/")
    }
    return (
            <header className="pl-10 pr-20 py-7 flex justify-between bg-customBackground w-full">
                <h1 className="text-5xl font-bold text-customPurple">FETCH</h1>
                <nav aria-label="main navigation">
                    <ul className="p-0 m-0 list-none flex gap-8 text-xl font-bold text-customPurple">
                        <li>
                            <span>Hello, {user?.name.toLocaleUpperCase()}</span>
                        </li>
                        <li className="cursor-pointer">
                            <Link role="button" aria-label="View your favorite dogs and find a match" to={"./favorites"}>Favorites</Link>
                        </li>
                        <li className="cursor-pointer">
                            <Link role="button" aria-label="Browse dogs for adoption" to={"./browse"}>Adopt a Dog</Link>
                        </li>
                        <li className="cursor-pointer">
                            <Link to={"/"} role="button" aria-label="Logout from account" onClick={handleLogout}>Logout</Link>
                        </li>
                    </ul>
                </nav>
            </header>
    )
    
}