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
    // const token = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiN2FmZGFiZmQtOGIyZi00MDQ3LWIxMmEtMjE0YTA2MTgzNTBiIiwiZW1haWwiOiJlbWFAZ2EuY29tIiwidXNlcm5hbWUiOiJ1c2VyIiwicGFzc3dvcmQiOiIkMmIkMTAkaVU2SThMRGtoZml3OGJxbGtkUEdtdVU5ajR4dDBkSzRqbXYuOVhDY2tUbnRMWVF2M2xoV3EifSwic3ViIjoiN2FmZGFiZmQtOGIyZi00MDQ3LWIxMmEtMjE0YTA2MTgzNTBiIiwiaWF0IjoxNjYxOTUwMDc5LCJleHAiOjE2NjQ1NDIwNzl9.xIHZqeKXshgaTK0dBZu31KdbHvlQgJ8XaEK7TwP_F5o`
    const token = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE2YWE1MTUtNzRkNy00MGQzLThiMDAtMjk1MjQxMWMxNzEyIiwiZW1haWwiOiJlbWFpbDNAZ21hLmNvbSIsInVzZXJuYW1lIjoidXNlcjMiLCJiaW8iOiJiaW8iLCJpbWFnZSI6InVybCIsInBhc3N3b3JkIjoiJDJiJDEwJGlVNkk4TERraGZpdzhicWxrZFBHbXVVOWo0eHQwZEs0am12LjlYQ2NrVG50TFlRdjNsaFdxIn0sInN1YiI6IjYxNmFhNTE1LTc0ZDctNDBkMy04YjAwLTI5NTI0MTFjMTcxMiIsImlhdCI6MTY2MTk1NjgyNCwiZXhwIjoxNjY0NTQ4ODI0fQ.47x60gM4cmfI-oTz8L8iNgvA5QHsGf6xjux4FQRzeC4`
    config.headers['Authorization'] = token
  // }

  return config
})

root.render(
          <React.StrictMode>

            <App />
          </React.StrictMode>
);
