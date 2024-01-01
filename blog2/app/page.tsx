import SingleBlog from "./../components/blog/SingleBlog"
import getBlogs from "./actions/getBlogs"
import getCurrentUser from "./actions/getCurrentUser"

interface Props {
  name: string,
  imageSrc: string,
  description: string
  id: string
}
export default async function Home() {

  const currentUser = await getCurrentUser()
  const blogs = await getBlogs()


  console.log("currentUser", currentUser)
  return (
    <main className="w-full ">
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 lg:mx-8 gap-[30px] max-w-sm mx-auto md:max-w-none  md:mx-0 m-10 ">
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
