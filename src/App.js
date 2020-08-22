import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import './App.scss';
import Auth, { loginHTML, signupHTML } from './components/auth/Auth';
import Footer from './components/Footer';
import Header from './components/header/Header';

import { routing } from './modules/routing';

import Home from './components/Home'
import Messages from "./components/Messages";

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(routing())
  },[])

  const workMessages = useSelector(
    state => state.messages.work
  )
  const funMessages = useSelector(
    state => state.messages.fun
  )
  const route = useSelector(
    state => state.app.route
  )
  const auth = useSelector(
    state => state.app.auth
  )

  return (
    <div className="App">

      <Header auth={auth} />
      <main>

        { (route === '' || route === '#home') &&
          <Home auth={auth} />
        }

        { (route === '#auth' ||
        route === '#login') &&
        (!auth || auth.timer < Date.now()) &&
          <Auth method={loginHTML} />
        }

        {route === '#signup' &&
        (!auth || auth.timer < Date.now()) &&
          <Auth method={signupHTML} />
        }

        { route === `#work` &&
        (auth && auth.timer > Date.now()) &&
          <Messages
          auth={auth}
          messages={workMessages}
          type={'WORK'} />
        }

        { route === `#fun` &&
        (auth && auth.timer > Date.now()) &&
          <Messages
          auth={auth}
          messages={funMessages}
          type={'FUN'} />
        }

        { (route === `#work` || route === `#fun`) &&
          (!auth || auth.timer < Date.now()) &&
        <a href="#auth"><button>Войти</button></a>
        }
      </main>
      <Footer />

    </div>
  );
}

export default App;