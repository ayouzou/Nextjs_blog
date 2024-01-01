import getBlogById from '@/app/actions/getBlogsById'
import getCurrentUser from '@/app/actions/getCurrentUser'
import BlogId from '@/components/blog/BlogId'
import React from 'react'
interface IParams {
    blogId: string
}
export default async function page({ params }: { params: IParams }) {
    const blog = await getBlogById(params)
    const curentUser = await getCurrentUser();

    const date = blog?.createdAt
    const date2 = new Date(date ?? 2023).toDateString()
    return (
        <div className=''>
            <div>
                <BlogId
                    name={blog?.name}
                    description={blog?.description}
                    blogId={blog?.id}
                    imageSrc={blog?.imageSrc}
                    curentUser={curentUser}
                />
            </div>
        </div>
    )
}
