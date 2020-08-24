import React, { useEffect } from 'react'

import './style.scss'
import { useDispatch } from 'react-redux'
import { deleteAuth } from '../../redux/appReducer'

let dispatch = {}

export default function Header(props) {

  dispatch = useDispatch()
  useEffect(() => {
    setHeader()
  },[])
  sessionStorage.setItem(
      "cartProds", JSON.stringify(props.cartProds)
  )

    return (
      <header>
        <div>
          <a href="#home" className="logo"><b>TotSystems Chat</b></a>
          <nav className="cd-main-nav-wrapper">
            <ul className="cd-main-nav">

              <li><a href="#work">Work</a></li>
              <li><a href="#fun">Fun</a></li>

            {(!props.auth ||
            props.auth.timer < Date.now()) && 
              <li><a href="#auth">Войти</a></li>
            }
            {props.auth.timer > Date.now() && 
              <li><a href="#home" onClick={logout}>Выйти</a></li>
            }
            </ul>
          </nav>

          <a className="cd-nav-trigger">Menu<span></span></a>

        </div>
      </header>
    )
}

function setHeader() {
	function q(i) { return document.querySelector(i) }

	//mobile version - open/close navigation
	q('.cd-nav-trigger').addEventListener('click', function(e){
    e.preventDefault()
    q('header').classList.toggle('nav-is-visible')
		q('.cd-main-nav').classList.toggle('nav-is-visible')
	})

  window.addEventListener( 'hashchange', () => {
    q('.cd-main-nav').classList.remove('moves-out')
    q('.cd-main-nav').classList.remove('nav-is-visible')
    q('header').classList.remove('nav-is-visible')
    if (sessionStorage.auth && sessionStorage.auth.timer < Date.now()) logout()
  })
}

export function logout() {
  sessionStorage.auth = false
  dispatch(deleteAuth())
}