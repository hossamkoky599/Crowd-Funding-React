// forget_password.jsx
import { useState } from "react";
import "../assets/css/forget_password.css";

export default function ForgetPassword() {
  const [isOk, setIsOk] = useState(false);

  function update() {
    setIsOk(!isOk);
  }

  return (
    <div>
      <div className="card d-margin">
        <div>
          <h1 className="ph-center">Forgot password</h1>
        </div>
        <hr />
        <form>
          <div className="margin-everywhere">
            <label className="margin-everywhere" htmlFor="exampleInputEmail1">
              <b>Enter registered email</b>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="type here"
            />
            <button onClick={update} type="button" className="btn">
              forget password
            </button>
          </div>

          {isOk && (
            <p className="ph-center">
              A link has been sent to this email, use that link to change the password.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
