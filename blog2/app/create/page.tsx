'use client'

import { ChangeEvent, FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import Input from "../../components/input/Input"
import ImageUpload from "@/components/input/ImageUpload"
import { toast } from 'react-hot-toast'
import axios from 'axios'
interface InitialStateProps  {
    name?: string,
    imageSrc: string,
    description: string
}
const initialState: InitialStateProps  = {
    name: '',
    imageSrc: '',
    description: ''
}

export default function page() {
    const [state, setState] = useState(initialState)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const onSubmit = (event: FormEvent) => {
        event.preventDefault()

        if (state.name && !state.name.trim() || !state.description.trim()) {
            toast.error('Please fill in all fields');
            return;
        }
        setIsLoading(true)
      
        axios.post('/api/blogs',state)
        .then(() => {
            toast.success('Created successfully')
            router.refresh()
            router.push('/')
            // router.push('/')
        })
    }
    function handleChange(event:ChangeEvent<HTMLInputElement>) {
        setState({ ...state, [event.target.name]: event.target.value });
    }
    const setCustomValue = (id: any, value: any) => {
        setState((prevValues) => ({
            ...prevValues,
            [id]: value,
        }));
    };
    return (
        <form onSubmit={onSubmit} className='flex'>
            <div className="w-96 m-10 ">
                <ImageUpload value={state.imageSrc} onChange={(value) => setCustomValue('imageSrc', value)} />
            </div>
            <div className='flex flex-col justify-center h-[550px] w-[550px]  gap-2'>
                <Input placeholder='Blog header' id='name' type='text' value={state.name} name='name' onChange={handleChange} />
                <Input big placeholder='Blog content or description' id='description' type='text' value={state.description} name='description' onChange={handleChange} />
                <button type='submit' className="ml-10 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center  mb-2" disabled={isLoading}>Submit</button>
            </div>
        </form>
    )
}
