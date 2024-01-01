'use client'

import { SafeBlogs, SafeUser } from "@/types"
import { useRouter } from 'next/navigation'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { BsFillPencilFill } from 'react-icons/bs'
import axios from "axios"
import toast from "react-hot-toast"

interface BlogProps {
    key: string,
    data: SafeBlogs,
    currentUser?: SafeUser | null
}

export default function SingleBlog({ data, key, currentUser }: BlogProps) {
    const isCurrentUserAuthor = currentUser && data.userId === currentUser.id;
    const router = useRouter()
    console.log(data)
    const onDelete =()=>{
        axios.delete(`/api/blogs/${data.id}`)
        .then(()=>{
            toast.success('Successfully deleted!')
            router.refresh()
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    return (
        <div className="w-[1100px] border-2 p-4">
            <div>
                <div className="flex gap-2 justify-between items-center">
                    {/* <Image src={data.imageSrc} width={400} height={300} alt="Blog image" /> */}

                    <img src={data.imageSrc} alt="" />
                </div>
                <div className="w-[530px] flex flex-col gap-4 leading-[1.5]">
                    <h1>{data.name}</h1>
                    <p>{data.description}</p>
                </div>

                {isCurrentUserAuthor && (
                    <div className="flex gap-2">
                        <RiDeleteBin5Line onClick={onDelete} className=" cursor-pointer text-[1.5rem]" />
                        <BsFillPencilFill onClick={() => router.push(`/blogs/${data.id}`)} className=" cursor-pointer text-[1.2rem]" />
                    </div>
                )}
            </div>
        </div>
    );
}
