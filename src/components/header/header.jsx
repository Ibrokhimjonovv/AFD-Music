"use client";

import React, { useContext, useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import Link from "next/link";

// Style
import "./header.scss";

// Images
import logo_dark from "./logo.png";
import logo_light from "./logo.png";
import sun from "./sunny-day 1.png";
import moon from "./galaxy 1.png";
import user_img from "./profile_image.png";
import menuIcon_dark from "../../assets/images/icon-dark.png";
import menuIcon_light from "../../assets/images/icon-light.png";
import Search from "../search-user-and-films-desktop/search";
import SearchM from "../search-user-and-film-mobile/search";

const Header = () => {

  const [canvas, setCanvas] = useState(false);
  const handleClickCanvas = (e) => {
    e.stopPropagation();
    setCanvas(!canvas);
  };
  const handleCanvasClick = (e) => {
    e.stopPropagation();
  };
  useEffect(() => {
    const handleBodyClick = () => {
      setCanvas(false);
    };

    document.body.addEventListener("click", handleBodyClick);

    return () => {
      document.body.removeEventListener("click", handleBodyClick);
    };
  }, []);

  useEffect(() => {
    if (canvas) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [canvas]);

  return (
    <header>
      {/* <marquee behavior="" direction="">Saytda vaqtinchalik texnik ishlar olib borilmoqda!</marquee> */}
      <div className="header-container">
        <div className="logo">
          <Link href="/">
            <img className="logo-dark" src={logo_dark.src} alt="" />
          </Link>
        </div>
        <Search />
        {/* <div className="theme">
          <input
            type="checkbox"
            name="theme"
            id="check"
            checked={isDarkMode}
            onChange={handleChange}
          />
          <label htmlFor="check">
            <span></span>
            <img src={sun.src} alt="" />
            <img src={moon.src} alt="" />
          </label>
        </div> */}
        <div className="profile">
          <Link href="/notifications">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ionicon"
              viewBox="0 0 512 512"
            >
              <path
                d="M427.68 351.43C402 320 383.87 304 383.87 217.35 383.87 138 343.35 109.73 310 96c-4.43-1.82-8.6-6-9.95-10.55C294.2 65.54 277.8 48 256 48s-38.21 17.55-44 37.47c-1.35 4.6-5.52 8.71-9.95 10.53-33.39 13.75-73.87 41.92-73.87 121.35C128.13 304 110 320 84.32 351.43 73.68 364.45 83 384 101.61 384h308.88c18.51 0 27.77-19.61 17.19-32.57zM320 384v16a64 64 0 01-128 0v-16"
                fill="none"
                stroke="#8a8d94"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
              />
            </svg>
            <span id="count">{0}</span>
          </Link>
          <Link href="/profile">
            <span>John</span>
            {/* <span>{userLoading ? "Yuklanmoqda..." : userData?.username}</span> */}
            <img
              src={
                user_img.src
              }
              alt="Profile"
            />
          </Link>
          {/* {access ? (
            <>
              <Link href="/profile">
                <span>{userLoading ? "Yuklanmoqda..." : userData?.username}</span>
                <img
                  src={
                    userData?.profile_image
                      ? `${global_domen}${userData.profile_image}`
                      : userData?.profileImageUrl || user_img.src
                  }
                  alt="Profile"
                />
              </Link>
            </>
          ) : (
            <Link href="/login">
              <span>Kirish</span>
              <img src={user_img.src} alt="" />
            </Link>
          )} */}
        </div>

        <div className="qr">
          <Link href="/notifications">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ionicon"
              viewBox="0 0 512 512"
            >
              <path
                d="M427.68 351.43C402 320 383.87 304 383.87 217.35 383.87 138 343.35 109.73 310 96c-4.43-1.82-8.6-6-9.95-10.55C294.2 65.54 277.8 48 256 48s-38.21 17.55-44 37.47c-1.35 4.6-5.52 8.71-9.95 10.53-33.39 13.75-73.87 41.92-73.87 121.35C128.13 304 110 320 84.32 351.43 73.68 364.45 83 384 101.61 384h308.88c18.51 0 27.77-19.61 17.19-32.57zM320 384v16a64 64 0 01-128 0v-16"
                fill="none"
                stroke="#8a8d94"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
              />
            </svg>
            <span id="count">{0}</span>
          </Link>
          <div className="menu-icon" onClick={handleClickCanvas}>
            <img className="logo-dark" src={menuIcon_dark.src} alt="Menu Icon" />
            <img className="logo-light" src={menuIcon_light.src} alt="Menu Icon" />
          </div>
        </div>
        <div
          className={
            canvas
              ? "active-canvas menu-offcanvas-container"
              : "menu-offcanvas-container"
          }
          onClick={handleCanvasClick}
        >
          <div className="profile">
            {/* {access ? (
              <Link href="/profile" onClick={() => setCanvas(false)}>
                <span>{userData?.name || userData?.username}</span>
                <img
                  src={
                    userData?.profile_image
                      ? `${global_domen}${userData.profile_image}`
                      : userData?.profileImageUrl || user_img.src
                  }
                  alt="Profile"
                />
              </Link>
            ) : (
              <Link href="/login" onClick={() => setCanvas(!canvas)}>
                <span>Kirish</span>
                <img src={user_img.src} alt="" />
              </Link>
            )} */}
            <Link href="/profile">
              <span>John</span>
              {/* <span>{userLoading ? "Yuklanmoqda..." : userData?.username}</span> */}
              <img
                src={
                  user_img.src
                }
                alt="Profile"
              />
            </Link>
          </div>
          <div className="search mob-v">
            <SearchM c={setCanvas} />
          </div>
          {/* <div className="theme">
            <input
              type="checkbox"
              name="theme"
              id="check"
              checked={isDarkMode}
              onChange={handleChange}
            />
            <label id="theme-label" htmlFor="check">
              <span></span>
              <img src={sun.src} alt="" />
              <img src={moon.src} alt="" />
            </label>
          </div> */}

          <div className="social">
            <Link href="https://t.me/afdplatformuz" target="_blank">
              <i className="bx bxl-telegram" style={{ color: "#777e90" }}></i>
              Telegram
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
