'use client'
import Input from '@/components/input/Input'
import Link from 'next/link'
import React, { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import  {signIn} from 'next-auth/react'
interface InitialStateProps{
    email:string,
    password:string
}
const initialState:InitialStateProps = {
    email: '',
    password: ''
}
const page = () => {
    const router = useRouter()
    const [state, setState] = useState(initialState)
    const handleChange =(e:any)=>{
        setState({...state,[e.target.name]:e.target.value})
    }
    const onSubmit = (event:FormEvent)=>{
        event.preventDefault()
        signIn('credentials',{
            ...state,
            redirect:false,
        })
        .then((callback)=>{
            if(callback?.ok){
                router.refresh()
            }
            if(callback?.error){
                throw new Error("Wrong Credentials ")
            }
        })
        router.push('/')
    }
    return (
        <div>
            <form className='w-96 mx-auto' onSubmit={onSubmit}>
                <div className='flex flex-col justify-center h-[450px] w-[350px] mx-auto gap-2'>
                    <Input name='email' placeholder='Email' value={state.email} id='email' onChange={handleChange} type='text' label='email' />
                    <Input name='password' placeholder='Password' value={state.password} id='password' onChange={handleChange} type='password' label='password' />
                    <button type='submit' className='text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>Login</button>
                </div>

                <div className=''>
                    create account  ?<Link href={'/register'}>sign up </Link>
                </div>
            </form>
        </div>
    )
}

export default page