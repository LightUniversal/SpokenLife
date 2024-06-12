import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import {
  RouterProvider,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import store from "./store";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import "./asset/index.css";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";
import HomeScreen from "./screens/HomeScreen";
import PracticeScreen from "./screens/PracticeScreen";
import QuestionScreen from "./screens/QuestionScreen";
import Profile from "./screens/Profile"
import QuizApp from "./screens/QuizApp";
import Earn from "./screens/Earn";
import SelectSubject from "./screens/SelectSubject";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" index={true} element={<HomeScreen />}></Route>
      <Route path="/register" element={<RegisterScreen />}></Route>
      <Route path="/login" element={<LoginScreen />}></Route>
      <Route path="/profile/:id" element={<ProfileScreen />}></Route>
      <Route path="/practice" element={<PracticeScreen />}></Route>
      <Route path="/profile" element={<Profile />}></Route>
      <Route path="/quiz/:id" element={<QuizApp />}></Route>
      <Route path="/earnasyoulearn" element={<Earn />}></Route>
      <Route path="/selectsubject" element={<SelectSubject />}></Route>
      <Route path="/practicequestions" element={<QuestionScreen />}></Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);
