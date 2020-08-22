import React, {useEffect} from 'react'
import {useDispatch} from "react-redux";
import { Rest } from '../modules/fetch'
import { setMessages } from '../redux/messagesReducer';
import close from '../assets/close.svg'
import edit from '../assets/pencil.svg'

export default function Messages(props) {
  const dispatch = useDispatch()
  let where
  if (props.type === 'WORK') where = "workMessages"
  if (props.type === 'FUN') where = "funMessages"

  const getMessages = () => {
    Rest.getMessagesByTheme(where, props.auth.idToken)
      .then(json => {
        if (!json) {
          dispatch(setMessages([], props.type))
        }
        else {
          dispatch(setMessages(json, props.type))
        }
      })
  }

  useEffect(() => getMessages(), [])

  return (
    <div className="messages">
      {props.auth.timer > Date.now() &&
      <form className="message_form" id="newMessage"
            onSubmit={postNewMessage}
      >
        <button>send</button>
        <textarea rows="3" id="textMessage" placeholder="Написать сообщение" />
        <label htmlFor="textMessage">Написать</label>
      </form>
      }
      <div style={{height: 35}}></div>
      {props.messages.map( i =>
        <div className="message" key={i.id} id={i.id}>
          { i.email === props.auth.email &&
          <div className="messageIcons">
            <div className="editIcon"
                 onClick={() => toEdit(i)}
            >
              <img src={edit} alt="edit" />
            </div>
            <div className="removeIcon"
                 onClick={() => deleteMessage(i.id)}
            >
              <img src={close} alt="close" />
            </div>
          </div>
          }
          <div>{i.text}</div>
          ({i.email.split("@")[0]}) :
          {new Date(i.date).toLocaleDateString()}
        </div>
      )}
      <div id="formEditMessage">
        <form className="textfield--float-label message_form">
          <textarea rows="7" id="editedMessage" />
          <label htmlFor="editedMessage">Редактирование сообщения</label>
          <button onClick={(e) => editMessage(e)}>save</button>
        </form>
      </div>
    </div>
  )

  function postNewMessage(e) {
    e.preventDefault()

    if (props.auth.timer > Date.now() &&
      e.target.elements.textMessage.value) {

      let messageToSend = {
        text: e.target.elements.textMessage.value,
        email: props.auth.email,
        date: Date.now()
      }
      Rest.new(messageToSend, where, props.auth.idToken)
        .then(() => {
          document.getElementById('textMessage').value = ''
          getMessages()
        })
    } else {
      document.getElementById('textMessage')
        .insertAdjacentText('beforeend', 'Сообщение пусто или необходимо авторизоваться')
    }
  }
  function deleteMessage(id) {
    Rest.delete(where, id, props.auth.idToken)
      .then(() => getMessages() )
  }
  function editMessage(e) {
    e.preventDefault()
    let messageToSend = {
      text: document.getElementById('editedMessage').value,
      email: props.auth.email,
      date: Date.now()
    }
    let id = document.querySelector('#formEditMessage button').value
    Rest.update(messageToSend, where, id, props.auth.idToken)
      .then(() => {
        getMessages()
        document.getElementById('editedMessage').value = ''
        document.getElementById('formEditMessage').style.display = 'none'
      })
  }
  function toEdit(i) {
    document.getElementById('formEditMessage').style.display = 'block'
    document.getElementById('editedMessage').value = i.text
    document.querySelector('#formEditMessage button').value = i.id
  }
}