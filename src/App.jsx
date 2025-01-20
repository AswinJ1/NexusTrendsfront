import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFoundpage from "./pages/NotFoundpage";
import ProtectedRoute from "./components/ProtectedRoute";
import PostListings from './pages/PostListings';
import HomePage from './pages/HomePage';
import AddPost from './pages/AddPost';
import Postpage from './pages/Postpage';
import EditPost from './pages/EditPost';
import MyPostpage from './pages/MyPostpage';
import EditProfile from './pages/EditProfile';
import ProfileView from './pages/ProfileView';

function Logout() {
    localStorage.clear();
    return <Navigate to="/login" />;
}

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    <ProtectedRoute>
                        <HomePage />
                    </ProtectedRoute>
                } />
                <Route path="/editprofile" element={<EditProfile />} />
                <Route path="/profileview" element={<ProfileView />} />
                <Route path="/postlist" element={<PostListings />} />
                <Route path="/mypostlist" element={<MyPostpage />} />
                <Route path="/post-add" element={<AddPost />} />
                <Route path="/post/:id" element={<Postpage />} />
                <Route path="/post/update/:id" element={<EditPost />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<NotFoundpage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
