"use client";

import React, { useRef, useEffect, useContext, useState } from 'react';
import Link from 'next/link';
import { AccessContext } from '@/context/context';
import logo_dark from "../header/logo.png";
import logo_light from "../header/logo.png";

import { global_api } from '../../app/_app';

// Styles
import "./footer.scss";

const Footer = () => {
  const form = useRef();
  const [loading_1, setLoading_1] = useState(false);
  const [success, setSuccess] = useState(null)
  const { access, userData, filmsDepartment } = useContext(AccessContext);


  const formatFilmNameForURL = (name) => {
    return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  };

  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-item">
          <div className="logo">
            <Link href="/">
              <img className="logo-dark" src={logo_dark.src} alt="" />
              <img className="logo-light" src={logo_light.src} alt="" />
            </Link>
          </div>
          <p>
            Listen to music with ease and pleasure
          </p>
          {/* <p>
                This site is not for dubbing studios, but rather for posting films from other studios. Of course, the source of the film will also be indicated!
                </p> */}
          <div className="links">
            {/* <Link href="#">
                        <i className="bx bxl-facebook-circle" style={{ color: '#777e90' }}></i>
                    </Link>
                    <Link href="#">
                        <i className="bx bxl-twitter" style={{ color: '#777e90' }}></i>
                    </Link> */}
            {/* <Link href="https://instagram.com/afd_platform" target='_blank'>
                        <i className="bx bxl-instagram" style={{ color: '#777e90' }}></i>
                    </Link> */}
            <Link href="https://t.me/afdplatformuz" target='_blank'>
              <i className="bx bxl-telegram" style={{ color: '#777e90' }}></i>
            </Link>
          </div>
        </div>
        {/* <div className="footer-item">
                <ul>
                    <li>
                        <h3><Link to="#">Bosh sahifa</Link></h3>
                    </li>
                    <li>
                        {
                          access ? (
                            <Link to="/profile">Profil</Link>
                          ) : (
                            <Link to="/login">Kirish</Link>
                          )
                        }
                    </li>
                    <li>
                        <Link to="/">Bo'limlar</Link>
                    </li>
                    <li>
                        <Link to="#">Batafsil ma'lumot</Link>
                    </li>
                </ul>
            </div> */}
        <div className="footer-item">
          <ul>
            <li>
              <h3>Pages</h3>
              {/* <h3><Link to="#">Departments</Link></h3> */}
            </li>
            <li>
              <Link href="/login">Sign in</Link>
            </li>
            <li>
              <Link href="/signup">Sign up</Link>
            </li>
          </ul>
        </div>
        <div className="footer-item">
          <ul>
            <li>
              <h3>For Help</h3>
              {/* <h3>Help</h3> */}
            </li>
            <li>
              {
                access ? (
                  <form ref={form} onSubmit={sendEmail}>
                    <input type="email" name='user_email' defaultValue={(userData && userData.email) || ""} required placeholder='Email' />
                    {/* <input type="text" name='user_phone' placeholder='Telefon raqam' required /> */}
                    <input type="text" name='user_phone' placeholder='Phone number' required />
                    {/* <textarea name="message" id="" placeholder='Savol yoki murojatni yozing' required> */}
                    <textarea name="message" id="" placeholder='Write your questions' required>
                    </textarea>
                    {/* <button type='submit'>{loading_1 ? "Yuborilmoqda..." : "Yuborish"}</button> */}
                    <button type='submit'>{loading_1 ? "Sending..." : "Send"}</button>
                    <p>{success}</p>
                  </form>
                ) : (
                  <form>
                    <input type="email" name='ggg' placeholder='Email' disabled />
                    {/* <input type="text" name='hhhh' placeholder='Telefon raqam' disabled /> */}
                    <input type="text" name='hhhh' placeholder='Phone number' disabled />
                    {/* <textarea name="message" id="" placeholder='Savol yoki murojatni yozing' disabled> */}
                    <textarea name="message" id="" placeholder='Write your questions' disabled>
                    </textarea>
                    {/* <button type='submit' disabled>Yuborish</button> */}
                    <button type='submit' disabled>Send</button>
                    {/* <p>Iltimos oldin shaxsiy xisobingizga kiring!</p> */}
                    <p>Please login your account!</p>
                  </form>
                )
              }
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer