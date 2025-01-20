import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api'; // Your Axios API instance
import { toast } from 'react-toastify';

const EditPost = () => {
  const { id } = useParams(); // Get post ID from URL
  const navigate = useNavigate();

  const [post, setPost] = useState({
    title: '',
    body: '',
    category: 'Science',
    picture: null,
  });
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);

  // Fetch post by ID
  useEffect(() => {
    const fetchPost = () => {
      api
        .get(`/api/posts/${id}/`)
        .then((res) => {
          setPost(res.data);
          setLoading(false);
        })
        .catch((err) => {
          toast.error('Error fetching post');
          setLoading(false);
        });
    };

    fetchPost();
  }, [id]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle post update
  const handleUpdate = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', post.title);
    formData.append('body', post.body);
    formData.append('category', post.category);

    if (file) {
      formData.append('picture', file);
    }

    api
      .put(`/api/posts/update/${id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success('Post updated successfully');
          navigate(`/post/${id}`); // Redirect to the post page after update
        } else {
          toast.error('Failed to update post');
        }
      })
      .catch((err) => {
        toast.error('Error updating post');
      });
  };

  if (loading) return <div>Loading...</div>;
  if (!post) return <div>Post not found</div>;

  return (
    <section className="bg-indigo-50">
      <div className="container m-auto py-10 px-6">
        <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
          <h2 className="text-3xl font-bold mb-4">Edit Post</h2>

          <form onSubmit={handleUpdate}>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Category</label>
              <select
                name="category"
                value={post.category}
                onChange={handleChange}
                className="border rounded w-full py-2 px-3"
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
                name="title"
                value={post.title}
                onChange={handleChange}
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="Enter post title"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Description</label>
              <textarea
                name="body"
                value={post.body}
                onChange={handleChange}
                className="border rounded w-full py-2 px-3"
                rows="4"
                placeholder="Enter description"
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Post Photo</label>
              <input
                type="file"
                name="picture"
                onChange={handleFileChange}
                className="border rounded w-full py-2 px-3"
              />
            </div>

            <div>
              <button
                type="submit"
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full"
              >
                Update Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditPost;
