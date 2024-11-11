import React from "react";
import { UsersProvider } from "./contexts/users";
import { PostsProvider } from "./contexts/posts";
import Login from "./components/Login/login";
import Feed from "./components/Feed/feed";
import Profile from "./components/Profile/profile";
import Posts from "./components/Post/post.jsx";
import Footer from "./components/Footer/footer";
import Header from "./components/Header/header.jsx";
import Friends from "./components/Friends/friends";
import Navbar from "./components/Navbar/navbar";
import Create from "./components/Create/create.jsx";
import Notifications from "./components/Notifications/notifications.jsx";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/Login";

  return (
    <PostsProvider>
      <UsersProvider>
          {!isLoginPage && <Navbar />}
          {!isLoginPage && <Header />}
          <Routes>
            <Route path="/" element={<Navigate to="/Login"/>}/>
            <Route path="/Login" element={<Login />} />
            <Route path="/MyFeed" element={<Feed />} />
            <Route path="/MyProfile" element={<Profile userId={localStorage.getItem('profileId')}/>} />
            <Route path="/MyProfile/Posts" element={<Posts />} />
            <Route path="/FriendProfile" element={<Friends userId={localStorage.getItem('profileId')}/>} />
            <Route path="/Create" element={<Create />} />
            <Route path="/Notifications" element={<Notifications />} />
          </Routes>
          {!isLoginPage && <Footer />}
      </UsersProvider>
    </PostsProvider>
  )
}

export default App
