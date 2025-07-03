"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import "./search.scss";

import search_btn_dark from "./search-dark.png";
import search_btn_light from "./search-light.png";
import Link from "next/link";
import { global_api } from "../../app/_app";
import { AccessContext } from "../../context/context";

const Search = () => {
  // Qidiruv inputi uchun holat
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestedFilms, setSuggestedFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userData, films, setFilms, filmsDepartment } = useContext(AccessContext);
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

  const formatFilmNameForURL = (name) => {
    return name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  };
  // useEffect(() => {
  //   const fetchAllFilms = async () => {
  //     setLoading(true);
  //     try {
  //       const fetchAllFilms = await fetch(`${global_api}/movies/`);
  //       if (!fetchAllFilms.ok) {
  //         throw new Error("Filmlar olishda xatolik");
  //       }
  //       const filmsData = await fetchAllFilms.json();
  //       setFilms(filmsData);
  //     } catch (error) {
  //       setError(error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchAllFilms();
  // }, []);

  const handleSearchInput = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (films && query.length > 1) {
      const suggestions = films.filter((film) =>
        film.movies_name.toLowerCase().includes(query)
      );
      setSuggestedFilms(suggestions);
    } else {
      setSuggestedFilms([]);
    }
  };

  const clearInput = () => {
    setSearchQuery("");
    setModal(false);
  };

  const handleFilmSelect = (filmName, filmId) => {
    setSearchQuery(filmName);
    setSuggestedFilms([]);
  };


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}.${month}.${year} ${hours}:${minutes}`;
  };

  return (
    <div id="search-films-users">
      <div className="search">
        <div className="search-btns">
          <button onClick={() => setModal(true)}>
            Search music or artist
            <img className="logo-dark" src={search_btn_dark.src} alt="" />
            <img className="logo-light" src={search_btn_light.src} alt="" />
          </button>
        </div>
        <div className={`film-user-modal-shape ${modal ? "active" : ""}`}></div>
        <div className={`film-user-modal ${modal ? "active" : ""}`} ref={modalRef}>
          <div className="input-cont">
            <input
              id="search-input"
              type="text"
              placeholder="Search song or artist name..."
              value={searchQuery}
              onChange={handleSearchInput}
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
              Close
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

            {/* Qidiruv bor va film topilgan bo'lsa */}
            {suggestedFilms.length > 0 && (
              <div className="suggestions">
                {suggestedFilms.map((music) => (
                  <div key={music.id}>
                    <Link
                      href={`/${music.add_departments}/${formatFilmNameForURL(
                        filmsDepartment.find(
                          (dep) => dep.id === music.add_departments
                        )?.department_name || "Unknown"
                      )}/${music.id}/${formatFilmNameForURL(music.movies_name)}`}
                      onClick={() => {
                        handleFilmSelect(music.movies_name, music.id);
                        clearInput();
                      }}
                    >
                      <div className="s-left">
                        <span>{music.movies_name}</span>
                      </div>
                      <div className="s-right">
                        <img src={music.movies_preview_url} alt="" />
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
