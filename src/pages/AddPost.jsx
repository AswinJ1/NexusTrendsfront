import React, { useEffect, useState } from 'react'
import api from "../api"
import Navigationpage from '../components/Navigationpage';
const AddPost = () => {
    const [posts,setPosts] =useState([]);
    const [body,setBody]=useState("")
    const [title,setTitle]=useState("")
    const [category, setCategory] = useState("science");
    const [picture, setPicture] = useState(null);
    
    useEffect(()=>{
        getPosts();
    },[])
   const getPosts = () =>{
    api
       .get("/api/posts/")
       .then((res) => res.data)
       .then((data) => { setPosts(data); console.log(data)})
       .catch((err) => alert(err));

   };

   const deletePost = (id) => {
    

    api

       .delete(`/api/posts/delete/${id}`)
       .then((res) => {
        if (res.status === 204) alert("Post deleted!");
        else alert("Failed to delete post.");
        getPosts();
       }).catch((error) => alert(error));
       

   };


   const createPost = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("category", category);
    formData.append("title", title);
    formData.append("body", body);
    if (picture) {
        formData.append("picture", picture);  // Attach picture if selected
    }

    api
        .post("/api/posts/", formData, {
            headers: {
                "Content-Type": "multipart/form-data", // Set proper header for file uploads
            },
        })
        .then((res) => {
            if (res.status === 201) alert("Post created!") ;
            
            else alert("Failed to create post.");
            getPosts();
        })
        .catch((err) => alert(err));
};




  return (

<>
<Navigationpage></Navigationpage>
<section className="bg-indigo-50">
        <div className="container m-auto max-w-2xl py-24">
          <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            <form onSubmit={createPost}>
              <h2 className="text-3xl text-center font-semibold mb-6">Add Post</h2>

              <div className="mb-4">
                <label
                  htmlFor="category"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  className="border rounded w-full py-2 px-3"
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="IT">IT</option>
                  <option value="Defence">Defence</option>
                  <option value="Science">Science</option>
                  <option value="Medical">Medical</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Post Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="e.g., Beautiful Apartment in Miami"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="border rounded w-full py-2 px-3"
                  rows="4"
                  placeholder="Add any job duties, expectations, requirements, etc."
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                ></textarea>
              </div>

              <h3 className="text-2xl mb-5">Post Photo</h3>

              <div className="mb-4">
                <label
                  htmlFor="picture"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Photo
                </label>
                <input
                  type="file"
                  id="picture"
                  name="picture"
                  className="border rounded w-full py-2 px-3"
                  onChange={(e) => setPicture(e.target.files[0])}
                />
              </div>

              <div>
                <button
                  className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Add Post
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

</>
   
  )
}

export default AddPost
