'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { FormEvent } from 'react';
import { AuthUtils } from '../../utils/sigin.utils';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';

const Sigin = () => {
    const router  = useRouter()    
    const {locale} = useParams()
    console.log(locale);
    
    const queryClient = useQueryClient()
    const loginAuth = useMutation({
        mutationFn: AuthUtils.createUser,
        onSuccess: () => {
            toast.success("succes login")
            queryClient.invalidateQueries({queryKey: ['login']})
            setTimeout(() => {
                router.push(`/${locale}`)
            }, 1500)
        },
        onError:(err) =>{
            console.log(err);
            toast.error('Error mini')
        }
    })
    const handleLogin = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.currentTarget;
        const login = form.login.value;
        const password = form.password.value;
        loginAuth.mutate({
            login,
            password,
            device:{
                firebaseToken:"",
                deviceId: Math.random().toString(),
                type:'WEB',
                name: window.navigator.userAgent
            },
        })
        console.log(loginAuth.variables);        
    }
    return (
        <div className='px-3'>
            <form onSubmit={handleLogin} className=" max-w-sm mt-20 md:mt-[150px] mx-auto border rounded-[8px] p-5 shadow-xl ">
                <h2 className='text-[22px] font-bold text-center my-3'>Login</h2>
                <input defaultValue='admin@gmail.com' name='login' className='w-full p-1 border rounded-lg pl-3' type="text" placeholder='Login'/>
                <input defaultValue={123} name='password' className='w-full p-1 border rounded-lg pl-3 mt-2' type="password" placeholder='*********'/>
                <button type='submit' className='w-full p-2 mt-3 bg-green-600 text-white text-[18px] font-semibold text-center rounded-xl'>Login</button>
            </form>
        </div>
    );
};

export default Sigin;