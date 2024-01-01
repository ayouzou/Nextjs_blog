import SingleBlog from "./../components/blog/SingleBlog"
import getBlogs from "./actions/getBlogs"
import getCurrentUser from "./actions/getCurrentUser"

interface Props {
  name: string,
  imageSrc: string,
  description: string
  id:string
}
export default async function Home() {

  const currentUser = await getCurrentUser()
  const blogs = await getBlogs()


  console.log("blogs", blogs)
  return (
    <main className="flex min-h-screen flex-col items-left justify-between ">
      <div className="flex m-10 gap-5">
        {blogs.map((item: Props) => {
           return <SingleBlog
              data={item}
              key={item.id}
              currentUser={currentUser}
            />
        })}
      </div>
    </main>
  )
}
