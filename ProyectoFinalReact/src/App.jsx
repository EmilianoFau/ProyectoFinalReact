import React from "react";
import { UsersProvider } from "./contexts/users";
import { PostsProvider } from "./contexts/posts";
import Login from "./components/Login/login";
import Feed from "./components/Feed/feed";
import Profile from "./components/Profile/profile";
import Posts from "./components/Posts/posts";
import Friends from "./components/Friends/friends";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <PostsProvider>
      <UsersProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/Login"/>}/>
            <Route path="/Login" element={<Login />} />
            <Route path="/MyFeed" element={<Feed />} />
            <Route path="/MyProfile" element={<Profile />} />
            <Route path="/MyProfile/Posts" element={<Posts />} />
            <Route path="/FriendProfile" element={<Friends />} />
          </Routes>
        </BrowserRouter>
      </UsersProvider>
    </PostsProvider>
  )
}

export default App
