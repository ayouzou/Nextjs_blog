'use client'

import axios from "axios"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ChangeEvent, FormEvent, useState } from "react"
import toast from "react-hot-toast"
import ImageUpload from "../input/ImageUpload"
import Input from "../input/Input"
import getCurrentUser from "@/app/actions/getCurrentUser"



interface BlogProps {
    name?: string
    description?: string
    imageSrc?: any
    blogId?: string
    curentUser:string
}


interface InitalStateProps {
    name: string,
    description: string
    imageSrc: string

}


const initialState: InitalStateProps = {
    name: '',
    description: '',
    imageSrc: ''
}


export default  function BlogId({ name, description, imageSrc, blogId,curentUser }: BlogProps) {
    const router = useRouter()
    const [onActive, setOnActive] = useState(false);
    const [isLoading, setIsLoading] = useState(false)

    const [state, setState] = useState(initialState)

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setState({ ...state, [event.target.name]: event.target.value });
    }
    const onSubmit = (event: FormEvent) => {
        setIsLoading(true)
        event.preventDefault()

        if (state.name && !state.name.trim() || !state.description.trim()) {
            toast.error('Please fill in all fields');
            return;
        }
        axios.put(`/api/blogs/${blogId}`, state)
            .then(() => {
                toast.success('updated successfully')
                router.refresh()

            })
            .catch((err) => {
                throw new Error(err)
            })
            .finally(() => {
                setIsLoading(false)
            })
            setOnActive(false)
    }

    const onDelete = (event: FormEvent) => {
        setIsLoading(true)
        event.preventDefault();
        axios.delete(`/api/blogs/${blogId}`)
            .then(() => {
                toast.success('deleted successfully')
                router.refresh()
                router.push('/')
            })
            .catch((err) => {
                throw new Error(err)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }
    const setCustomValue = (id: any, value: any) => {
        setState((prevValues) => ({
            ...prevValues,
            [id]: value,
        }));
    };


    return (
        <div className="w-full mx-auto py-16 px-12 flex flex-col gap-4">
            <div className="flex">
                <div>
                    <Image src={imageSrc} width={707} height={20} className="h-96" alt='Image' />
                </div>
                <div className="flex flex-col  m-10">
                    <span>{name}</span>
                    <span>{description}</span>
                </div>
            </div>
            {
                curentUser ? <div className="flex justify-end gap-2">
                <button onClick={() => setOnActive(!onActive)} className="uppercase text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">edit</button>
                <button disabled={isLoading} className="uppercase text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={onDelete}>Delete</button>
            </div>:""

            }
            


            {/* {onActive && (

                <form onSubmit={onSubmit} className="flex">
                    <div>
                        <ImageUpload value={state.imageSrc} onChange={(value) => setCustomValue('imageSrc', value)} />
                    </div>
                    <div className='flex flex-col justify-center h-[450px] w-[350px] mx-auto gap-2'>
                        <Input placeholder='Name' id="name" type='text' value={state.name} name='name' onChange={handleChange} />
                        <Input placeholder='Description' id="description" type='text' value={state.description} name='description' onChange={handleChange} />
                        <div>
                        </div>
                        <button type='submit' disabled={isLoading}>Submit</button>
                    </div>
                </form>
            )} */}


            {onActive && (
                <div className="fixed inset-0 overflow-y-auto ">
                    <div className="flex items-center justify-center min-h-screen ">
                        <div className="fixed inset-0 bg-black opacity-50"></div>
                        <div className="relative bg-white rounded-lg p-8  w-[900px] ">
                            <button
                                onClick={()=>setOnActive(false)}
                                className="absolute top-0 font-bold right-0 m-4 text-red-500 hover:text-red-600"
                            >
                                X
                            </button>
                            <form onSubmit={onSubmit} className="flex ">
                                <div className="w-[50%]">
                                    <ImageUpload value={state.imageSrc} onChange={(value) => setCustomValue('imageSrc', value)} />
                                </div>
                                <div className="flex flex-col justify-center gap-2">
                                    <Input placeholder='Name' id="name" type='text' value={state.name} name='name' onChange={handleChange} />
                                    <Input big placeholder='Description' id="description" type='text' value={state.description} name='description' onChange={handleChange} />
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="m-10 uppercase text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                                    >
                                        Update
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}













        </div>
    )
}