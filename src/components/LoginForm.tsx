import { Button, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Card from '@mui/material/Card';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { User } from '../redux/authSlice';
import login from '../middleware/loginMiddleware';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../redux/store';

export default function LoginForm() {
    const [email, setEmail] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [emailError, setEmailError] = useState<boolean>(false);
    const [nameError, setNameError] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const handleNameChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
        validateName(event.target.value);
        setName(event.target.value);
    }
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        validateEmail(event.target.value);
        setEmail(event.target.value);
    };
    const validateName = (name)=>{
        if(name){
            setNameError(false);
            return false;
        }else{
            setNameError(true);
            return true;
        }
    }
    const validateEmail = (email)=>{
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.match(emailRegex)) {
            setEmailError(true);
            return false;
        } else {
            setEmailError(false);
            return true;
        }
    }
    const handleLoginButtonClick=async(e)=>{
        let isValid = !emailError && !nameError;
        if(isValid){
            const user:User = {name,email}
            try{
                await dispatch(login(user));
                navigate("/dashboard/browse");
            }catch(e){

            }
        }
    }
    return (
        <Card className='shadow-custom bg-white ' variant="outlined">
            <form className='p-20 flex flex-col gap-8'>
                <h1 className="text-customPurple text-2xl font-bold">Log In</h1>
                <TextField label="Username" variant="outlined" onChange={handleNameChange} error={nameError} />
                <TextField label="Email" variant="outlined" onChange={handleEmailChange} error={emailError} />
                <Button onClick={handleLoginButtonClick} role="button" variant="outlined">Submit</Button>
            </form>
        </Card>
      
    );
  }