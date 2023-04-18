import React from 'react'
import { useState} from 'react';
import {useForm} from 'react-hook-form';
import {useLogin} from './hooks/auth';

const Login = () => {
    const {login, isLoading} = useLogin();
    const {register, handleSubmit, reset} = useForm();
    async function handleLogin(e){
      await login({email: e.email, password: e.password});
      reset();
    }

  return (
    <div className = "Login">
        <div className = "Login-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit((e)=>handleLogin(e))}>
                <input type="text" placeholder = "usename@gmail.com" required {...register("email")}
                />
               <input type="password" placeholder = "password" required {...register("password")}
                />
                <button type="submit"> Log in</button>
            </form>
            <p>Test username: test@gmail.com</p>
            <p>Test password: testpassword</p>
        </div>
    </div>
  )
}

export default Login