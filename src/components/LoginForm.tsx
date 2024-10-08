import { Button, TextField } from '@mui/material';
import Card from '@mui/material/Card';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
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
            return true;
        }else{
            setNameError(true);
            return false;
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
        let isValidEmail = validateEmail(email) 
        let isValidName = validateName(name);
        if(isValidEmail && isValidName){
            const user:User = {name,email}
            try{
                await dispatch(login(user));
                navigate("/dashboard/browse");
            }catch(e){

            }
        }
    }
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          handleLoginButtonClick(event);
        }
      };
    return (
        <Card className='shadow-custom bg-white ' variant="outlined">
            <form className='p-20 flex flex-col gap-8' aria-labelledby='login-title' onKeyDown={handleKeyPress}>
                <h1 id='login-title' className="text-customPurple text-2xl font-bold">Log In</h1>
                <TextField label="Username" variant="outlined" onChange={handleNameChange} error={nameError} required/>
                <TextField label="Email" variant="outlined" onChange={handleEmailChange} error={emailError} required/>
                <Button onClick={handleLoginButtonClick} role="button" variant="outlined" aria-label='submit login form'>Submit</Button>
            </form>
        </Card>
      
    );
  }