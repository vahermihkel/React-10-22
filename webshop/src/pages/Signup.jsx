import { useContext } from "react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/AuthContext";

function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB7LcT04nCv-uyd_5xwNKf00n6HWpYrkcc";
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const addUser = () => {
    const newUser = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      returnSecureToken: true
    }
    fetch(url, {method: "POST", body: JSON.stringify(newUser)})
      .then(res => res.json())
      .then(json => {
        if (json.error) {
          setMessage(json.error.message);
        } else {
          authCtx.login(json.idToken);
          navigate("/admin");
        }
      })
  }

  return ( 
    <div>
      <div>{message}</div>
      <label>E-mail</label> <br />
      <input ref={emailRef} type="text" /> <br />
      <label>Parool</label> <br />
      <input ref={passwordRef} type="password" /> <br />
      <button onClick={addUser}>Registreeru</button>
    </div> );
}

export default Signup;