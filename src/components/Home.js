import React from 'react'
import {logout} from "./header/Header";

export default function Home(props) {

    return (
        <div className="homeGallery">
            <li><a href="#work">Work</a></li>
            <li><a href="#fun">Fun</a></li>

            {(!props.auth ||
              props.auth.timer < Date.now()) &&
            <li><a href="#auth">Войти</a></li>
            }
            {props.auth.timer > Date.now() &&
            <li><a href="#home" onClick={logout}>Выйти</a></li>
            }
        </div>
    )
}
