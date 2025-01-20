import React from 'react'
import Card from './Card'
import {Link } from 'react-router-dom'

function HomeCard() {
  return (
    <section className="py-4 dark:bg-gray-900" >
    <div className="container-xl lg:container m-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg ">
       <Card>
       <h2 className="text-2xl font-bold">Explore Our Blog</h2>
          <p className="mt-2 mb-4">
          Dive into the latest trends shaping defense, medical, IT, and more!

          </p>
           <Link  to={`/post/${post.id}`} className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-sm transition-all" >
           Read More
          </Link>
       </Card>
       <Card bg='bg-indigo-100'>
       <h2 className="text-2xl font-bold">Contribute to Our Blog</h2>
          <p className="mt-2 mb-4">
          Write a guest post and inspire our community!
          </p>
          <Link
            to="/post-add"
            className="inline-block bg-indigo-500 text-white rounded-lg px-4 py-2 hover:bg-indigo-600"
          >
            Submit a Post
          </Link>
       </Card>
      </div>
    </div>
  </section>
  )
}

export default HomeCard
