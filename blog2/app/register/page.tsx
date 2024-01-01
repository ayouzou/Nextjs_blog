'use client'
import axios from 'axios';
import Input from '../../components/input/Input'
import React, { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
interface InitialStateProps{
    name:string,
    email:string,
    password:string
}

const initialState:InitialStateProps = {
    name: '',
    email: '',
    password: ''
}
export default function page() {
    const [state, setState] = useState(initialState)
    const router = useRouter()
    const onSubmit = (event:FormEvent)=>{
        event.preventDefault()
        axios.post('/api/register',state)
        .then(()=>{
            router.refresh()
        })
        .then(()=>{
            setTimeout(()=>{
                router.push('/login')
            },2500)
        })
        .catch((err:any)=>{
                console.log(err)
        })
      
    }
    const handleChange =(e:any)=>{
        setState({...state,[e.target.name]:e.target.value})
        console.log(e.target.value)
    }
   
    return (
        <form className='w-96 mx-auto' onSubmit={onSubmit}>
            <div className='flex flex-col justify-center h-[450px] w-[350px] mx-auto gap-2'>
                <Input name='name' placeholder='Name' value={state.name} id='name' onChange={handleChange} type='text'  label='name'/>
                <Input name='email' placeholder='Email' value={state.email} id='email' onChange={handleChange} type='text' label='email'/>
                <Input name='password' placeholder='Password' value={state.password} id='password' onChange={handleChange} type='password' label='password' />
                <button type='submit' className='text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>Register</button>
            </div>
          
          <div className=''>
            do you have an account ?<Link href={'/login'}>sign in </Link> 
          </div>
        </form>
    )
}
