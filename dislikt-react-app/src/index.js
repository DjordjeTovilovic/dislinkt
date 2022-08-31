import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import axios from "axios";

const root = ReactDOM.createRoot(document.getElementById("root"));

axios.interceptors.request.use(function (config) {
  const loggedInUser = JSON.parse(window.localStorage.getItem('loggedInUser'))
  // if (loggedInUser) {
    // const token = `Bearer ${loggedInUser.accessToken}`
    const token = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiN2FmZGFiZmQtOGIyZi00MDQ3LWIxMmEtMjE0YTA2MTgzNTBiIiwiZW1haWwiOiJlbWFAZ2EuY29tIiwidXNlcm5hbWUiOiJ1c2VyIiwicGFzc3dvcmQiOiIkMmIkMTAkaVU2SThMRGtoZml3OGJxbGtkUEdtdVU5ajR4dDBkSzRqbXYuOVhDY2tUbnRMWVF2M2xoV3EifSwic3ViIjoiN2FmZGFiZmQtOGIyZi00MDQ3LWIxMmEtMjE0YTA2MTgzNTBiIiwiaWF0IjoxNjYxOTUwMDc5LCJleHAiOjE2NjQ1NDIwNzl9.xIHZqeKXshgaTK0dBZu31KdbHvlQgJ8XaEK7TwP_F5o`
    config.headers['Authorization'] = token
  // }
  return config
})

root.render(
  <App />
);
