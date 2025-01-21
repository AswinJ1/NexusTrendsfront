import React, { useEffect, useState } from 'react';
import { FaMapMarker } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import api from "..api";
import Navigationpage from '../components/Navigationpage';

const MyPostpage = () => {
    const [posts, setPosts] = useState([]);
    const [showFullDescription, setShowFullDescription] = useState({});

    useEffect(() => {
        getPosts();
    }, []);

    const getPosts = () => {
        api
            .get("https://blogapi-qm9m.onrender.com/api/myposts/")
            .then((res) => res.data)
            .then((data) => {
                setPosts(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    };

    const toggleDescription = (postId) => {
        setShowFullDescription((prevState) => ({
            ...prevState,
            [postId]: !prevState[postId],
        }));
    };

    return (
        <>
            <div className="fixed top-0 left-0 w-full bg-white shadow z-50">
                <Navigationpage />
            </div>
            <section className="pt-16 bg-indigo-50 ">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-gray-100 dark:bg-slate-950">
                    {posts.length === 0 ? (
                        <p className="text-center text-gray-500">Loading posts...</p>
                    ) : (
                        posts.map((post) => (
                            <div
                                key={post.id}
                                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden "
                            >
                                {/* Image Section */}
                                <div className="h-48 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                                    {post.picture ? (
                                        <img
                                            src={post.picture}
                                            alt={post.title}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <div className="h-full w-full flex items-center justify-center text-white font-bold">
                                            No Image
                                        </div>
                                    )}
                                </div>

                                {/* Card Content */}
                                <div className="p-6">
                                    <div className="text-sm text-gray-500 uppercase tracking-wide font-semibold mb-2">
                                        {post.category}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                                        {post.title}
                                    </h3>

                                    <p className="text-gray-600 mb-4">
                                        {showFullDescription[post.id]
                                            ? post.body
                                            : `${post.body.substring(0, 90)}...`}
                                    </p>

                                    <button
                                        onClick={() => toggleDescription(post.id)}
                                        className="text-indigo-500 hover:text-indigo-700 font-medium transition-colors"
                                    >
                                        {showFullDescription[post.id] ? 'Less' : 'More'}
                                    </button>

                                    <div className="flex items-center mt-6 text-gray-700">
                                        <FaMapMarker className="text-orange-600 text-lg mr-2" />
                                        <span>{post.created_at}</span>
                                    </div>
                                </div>

                                {/* Bottom Section */}
                                <div className="border-t border-gray-200 p-4 flex justify-between items-center">
                                    <div>
                                        <strong className="text-gray-700">Author:</strong> {post.author.username}
                                    </div>
                                    <Link
                                        to={`/post/${post.id}`}
                                        className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-sm transition-all"
                                    >
                                        Read More
                                    </Link>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </section>
        </>
    );
};

export default MyPostpage;
