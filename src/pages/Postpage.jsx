import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api'; // Your Axios API instance
import { toast } from 'react-toastify';
import Navigationpage from '../components/Navigationpage';

const PostPage = () => {
  const { id } = useParams(); // Get post ID from URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState(null); // To track which comment is being replied to
  const navigate = useNavigate();

  // Fetch post by ID
  useEffect(() => {
    const fetchPost = () => {
      api
        .get(`https://blogapi-qm9m.onrender.com/api/posts/${id}/`)
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

  // Fetch comments for this post
  useEffect(() => {
    const fetchComments = () => {
      api
        .get(`https://blogapi-qm9m.onrender.com/api/comments/?post=${id}`) // Fetch comments related to this post
        .then((res) => {
          setComments(res.data);
        })
        .catch((err) => {
          toast.error('Error fetching comments');
        });
    };

    fetchComments();
  }, [id]);

  // Handle post deletion
  const handleDelete = () => {
    const confirm = window.confirm('Are you sure you want to delete this post?');
    if (!confirm) return;

    api
      .delete(`https://blogapi-qm9m.onrender.com/api/posts/delete/${post.id}/`) // Add the trailing slash here
      .then((res) => {
        if (res.status === 204) {
          toast.success('Post deleted successfully');
          navigate('/postlist'); // Redirect to posts list page after deletion
        } else {
          toast.error('Failed to delete post');
        }
      })
      .catch((err) => {
        toast.error('Error deleting the post');
      });
  };

  // Handle redirect to update form
  const handleUpdate = () => {
    navigate(`https://blogapi-qm9m.onrender.com/post/update/${id}`);
  };

  // Handle comment submission
  const handleCommentSubmit = (e) => {
    e.preventDefault();

    const commentData = {
      body: newComment,
      post: id,
      parent: replyingTo || null, // Include parent ID if replying to a comment
    };

    api
      .post('https://blogapi-qm9m.onrender.com/api/comments/', commentData)
      .then((res) => {
        toast.success('Comment posted successfully');
        setNewComment(''); // Clear the comment field
        setReplyingTo(null); // Reset reply state
        // Add the newly posted comment to the state
        setComments((prevComments) => [
          ...prevComments,
          res.data, // Assuming the response contains the newly posted comment
        ]);
      })
      .catch((err) => {
        console.error(err);
        toast.error('Error posting comment');
      });
  };

  // Handle reply to a comment
  const handleReply = (commentId) => {
    setReplyingTo(commentId); // Set the comment to reply to
  };

  // Handle comment deletion
  const handleCommentDelete = (id) => {
    const confirm = window.confirm('Are you sure you want to delete this comment?');
    if (!confirm) return;

    api
      .delete(`https://blogapi-qm9m.onrender.com/api/comments/${id}/delete/`)
      .then(() => {
        toast.success('Comment deleted successfully');
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.id !== id)
        ); // Remove deleted comment from state
      })
      .catch(() => {
        toast.error('Error deleting comment');
      });
  };

  if (loading) return <div>Loading...</div>;
  if (!post) return <div>Post not found</div>;

  return (
    <>
    <Navigationpage></Navigationpage>
    <section className="bg-indigo-50 dark:bg-slate-900">
      <div className="container m-auto py-10 px-6">
        <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left ">
          <div className="text-gray-500 mb-4">{post.category}</div>
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center mb-4">
            {post.author.profile_pic ? (
              <img
                src={post.author.profile_pic}
                alt={`${post.author.username}'s profile`}
                className="h-10 w-10 rounded-full mr-2"
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-gray-300 mr-2 flex items-center justify-center text-white font-bold">N/A</div>
            )}
            <div className="text-gray-500">{post.author.username}</div>
          </div>
          <div className="text-gray-500 mb-4">{post.body}</div>
          <div className="h-full w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            {post.picture ? (
              <img
                src={post.picture} // Use the picture from the post object
                className="h-full w-full object-cover"
                alt="Post visual"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-white font-bold">
                No Image
              </div>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h3 className="text-indigo-800 text-lg font-bold mb-6">Post Actions</h3>
          <div className="flex space-x-4">
            <button
              onClick={handleDelete}
             
            >
             <img src="/del.png" alt=""  />
            </button>
            <button
              onClick={handleUpdate}
              
            >
              <img src="/edit.png" alt="" />
            </button>
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h3 className="text-indigo-800 text-lg font-bold mb-6">Comments</h3>
          {comments.map((comment) => (
            <div key={comment.id} className="mb-6">
              {/* Main Comment */}
              <div className="p-4 bg-gray-100 rounded-lg">
                <div className="flex items-center mb-2">
                  {comment.name.profile_pic ? (
                    <img
                      src={comment.name.profile_pic}
                      alt={`${comment.name.username}'s profile`}
                      className="h-8 w-8 rounded-full mr-2"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-gray-300 mr-2 flex items-center justify-center text-white font-bold">N/A</div>
                  )}
                  <div className="text-gray-800 font-bold">{comment.name.username}</div>
                </div>
                <div className="text-gray-600">{comment.body}</div>
                <div className="mt-3 flex space-x-4">
                  <button
                    className=""
                    onClick={() => handleReply(comment.id)}
                  >
                    <img src="/reply.png" alt="" />
                  </button>
                  <button
                    
                    onClick={() => handleCommentDelete(comment.id)}
                  >
                    <img src="/delete.png" alt="" />
                  </button>
                </div>
              </div>

              {/* Replies */}
             {/* Render Replies Only If They Exist */}
      {comment.replies?.length > 0 && (
        <div className="mt-4 ml-8 border-l-2 border-gray-300 pl-4">
          {comment.replies.map((reply) => (
            <div key={reply.id} className="mb-3 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                {reply.name.profile_pic ? (
                  <img
                    src={reply.name.profile_pic}
                    alt={`${reply.name.username}'s profile`}
                    className="h-6 w-6 rounded-full mr-2"
                  />
                ) : (
                  <div className="h-6 w-6 rounded-full bg-gray-300 mr-2 flex items-center justify-center text-white font-bold">N/A</div>
                )}
                <div className="text-gray-700">
                  <span className="font-bold">Reply to {comment.name.username}</span> by{" "}
                  <span className="text-blue-600 font-medium">{reply.name.username}</span>
                </div>
              </div>
              <div className="text-gray-600 mt-1">{reply.body}</div>
            </div>
          ))}
        </div>
      )}
            </div>
          ))}
        </div>

        {/* Add a Comment */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h3 className="text-indigo-800 text-lg font-bold mb-6">Add a Comment</h3>
          <form onSubmit={handleCommentSubmit}>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full p-3 border rounded-lg mb-4"
              placeholder="Add a comment..."
              rows="4"
            />
            <button
              type="submit"
            
            >
              <img src="/send.png" alt="" />
            </button>
          </form>
        </div>
      </div>
    </section>
    </>
  );
};

export default PostPage;
