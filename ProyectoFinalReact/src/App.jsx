import React from "react";
import { UsersProvider } from "./contexts/users";
import Login from "./components/Login/login";
import Feed from "./components/Feed/feed";
import Profile from "./components/Profile/profile";
import Posts from "./components/Posts/posts";
import Friends from "./components/Friends/friends";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <UsersProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/MyFeed" element={<Feed />} />
          <Route path="/MyProfile" element={<Profile />} />
          <Route path="/MyProfile/Posts" element={<Posts />} />
          <Route path="/FriendProfile" element={<Friends />} />
        </Routes>
      </BrowserRouter>
    </UsersProvider>
  )
}

export default App
