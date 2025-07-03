"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import "./search.scss";

import search_btn_dark from "./search-dark.png";
import search_btn_light from "./search-light.png";
import Link from "next/link";
import { global_api } from "../../app/_app";
import { AccessContext } from "../../context/context";

const SearchM = ({ c }) => {
  // Qidiruv inputi uchun holat
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestedFilms, setSuggestedFilms] = useState([]);
  const [error, setError] = useState(null);
  const { films, setFilms, userData, filmsDepartment } = useContext(AccessContext);
  const [modal, setModal] = useState(false);
  const searchInputRef = useRef(null); // Input uchun ref
  const modalRef = useRef(null); // Modal uchun yangi ref

  useEffect(() => {
    if (modal) {
      // Kichik kechikish bilan focus qilish
      const timer = setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [modal]);

  // Modal tashqarisiga bosganda yopish
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModal(false);
      }
    };

    if (modal) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modal]);

  
  useEffect(() => {
    if (modal && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [modal]);

  const clearInput = () => {
    setSearchQuery("");
    setModal(false);
    c(false);
  };


  return (
    <div id="search-films-users-mob">
      <div className="search">
        <div className="search-btns">
          <button onClick={() => setModal(true)}>
            Search music or artist
            <img className="logo-dark" src={search_btn_dark.src} alt="" />
            <img className="logo-light" src={search_btn_light.src} alt="" />
          </button>
          {/* <button onClick={() => setModal(true)}>
            Do'stlar qidirish
            <img className="logo-dark" src={search_btn_dark} alt="" />
            <img className="logo-light" src={search_btn_light} alt="" />
          </button> */}
        </div>
        <div className={`film-user-modal-shape ${modal ? "active" : ""}`}></div>
        <div className={`film-user-modal ${modal ? "active" : ""}`} ref={modalRef} >
          <div className="input-cont">
            <input
              id="search-input"
              type="text"
              placeholder="Search music or artist name..."
              value={searchQuery}
              autoComplete="off" // "false" emas, "off" bo'lishi kerak
              ref={searchInputRef} // Ref ni qo'shish
            />
            <img className="logo-dark" src={search_btn_dark.src} alt="" />
            <button
              onClick={() => {
                setModal(false);
                setSearchQuery("");
                setSuggestedFilms([]);
              }}
            >
              Chiqish
            </button>
          </div>
          <div className="suggest-films-users-cont">
            {/* Foydalanuvchi hech narsa yozmagan bo'lsa */}
            {!searchQuery && (
              <h2>
                Listen and enjoy :<span>)</span>
              </h2>
            )}

            {searchQuery.length === 1 && (
              <h2>
                Type at least 2 letters
                {/* {userData?.lastName && ","}{" "}
                <span>
                  {userData?.lastName
                    ? /[aáoóeéuúiy]$/i.test(userData.lastName) // Ayol ismi uchun tekshirish
                      ? "Lady"
                      : "Mister"
                    : ""}{" "}
                  {""}
                </span>
                :<span>)</span> */}
              </h2>
            )}

            {/* Qidiruv bor, lekin hech qanday film topilmagan bo'lsa */}
            {searchQuery.length > 1 && suggestedFilms.length === 0 && (
              <h2>
                Sorry, it seems we don't have this kind of music yet:
                <span>(</span>
              </h2>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchM;
