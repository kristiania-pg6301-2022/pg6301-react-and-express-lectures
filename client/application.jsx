import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { FrontPage } from "./pages/frontPage";
import { ListMovies } from "./pages/listMovies";
import { AddNewMovie } from "./pages/addNewMovie";
import React, { useContext } from "react";

import "./application.css";
import { LoginPage } from "./pages/loginPage";
import { useLoading } from "./useLoading";
import { MoviesApiContext } from "./moviesApiContext";
import { Profile } from "./pages/profile";

function UserActions({ user }) {
  if (!user || Object.keys(user).length === 0) {
    return <Link to={"/login"}>Login</Link>;
  }

  return (
    <>
      <Link to={"/profile"}>
        {user.google?.name ? `Profile for ${user.google.name}` : "Profile"}
      </Link>
      <Link to={"/login/endsession"}>Log out</Link>
    </>
  );
}

export function Application() {
  const { fetchLogin } = useContext(MoviesApiContext);
  const { data, error, loading, reload } = useLoading(fetchLogin);

  if (error) {
    return <div>Error: {error.toString()}</div>;
  }
  if (loading) {
    return <div>Please wait...</div>;
  }

  return (
    <BrowserRouter>
      <header>
        <Link to={"/"}>Front page</Link>
        <Link to={"/movies"}>Movies</Link>
        <div className="menu-divider" />
        <UserActions user={data?.user} />
      </header>
      <main>
        <Routes>
          <Route path={"/"} element={<FrontPage />} />
          <Route path={"/movies"} element={<ListMovies />} />
          <Route path={"/movies/new"} element={<AddNewMovie />} />
          <Route
            path={"/login/*"}
            element={<LoginPage config={data.config} reload={reload} />}
          />
          <Route path={"/profile"} element={<Profile user={data?.user} />} />
          <Route path={"*"} element={<h1>Not found</h1>} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
