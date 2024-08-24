import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../home/style.css";

export default function Navigation() {
  const token = useSelector(
    (state) => state.login.token || state.register.token
  );
  const sessionToken = window.sessionStorage.getItem("Token");
  const sessionUser = window.sessionStorage.getItem("User");
  //     const sessionIsAdmin = window.sessionStorage.getItem("isAdmin");

  const navigate = useNavigate();

  //     console.log("User:", sessionUser);
  //     console.log("isAdmin:", sessionIsAdmin);

  const handleLogout = async () => {
    try {
      sessionStorage.removeItem("Token");
      sessionStorage.removeItem("User");
      sessionStorage.removeItem("isAdmin");
      alert("Logged Out!");
      navigate("/");
    } catch (error) {
      alert("Failed to logout.");
    }
  };

  //   if (sessionIsAdmin === "true") {
  //     return (
  //       <div className="nav-bar">
  //         <nav className="navbar navbar-expand-lg bg-body-tertiary">
  //           <div className="container-fluid">
  //             <a className="navbar-brand" href="/">
  //               Home
  //             </a>
  //             <button
  //               className="navbar-toggler"
  //               type="button"
  //               data-bs-toggle="collapse"
  //               data-bs-target="#navbarNavAltMarkup"
  //               aria-controls="navbarNavAltMarkup"
  //               aria-expanded="false"
  //               aria-label="Toggle navigation"
  //             >
  //               <span className="navbar-toggler-icon"></span>
  //             </button>
  //             <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
  //               <div className="navbar-nav">
  //                 {(!token || !sessionToken) && (
  //                   <Link to="/register" className="nav-link">
  //                     Register
  //                   </Link>
  //                 )}
  //                 {(!token || !sessionToken) && (
  //                   <Link to="/login" className="nav-link">
  //                     Login
  //                   </Link>
  //                 )}
  //                 {(token || sessionToken) && sessionUser && (
  //                   <Link to={`/update/${sessionUser}`} className="nav-link">
  //                     Account
  //                   </Link>
  //                 )}
  //                 {(token || sessionToken) && sessionUser && (
  //                   <Link to={`/getCart/${sessionCart}`} className="nav-link">
  //                     Cart
  //                   </Link>
  //                 )}

  //                 <Link to={`/product`} className="nav-link">
  //                   Product
  //                 </Link>

  //                 <Link to={`/users`} className="nav-link">
  //                   Users
  //                 </Link>
  //                 {sessionUser && (
  //                   <button
  //                     type="button"
  //                     className="btn btn-danger"
  //                     onClick={handleLogout}
  //                   >
  //                     Logout
  //                   </button>
  //                 )}
  //               </div>
  //             </div>
  //           </div>
  //         </nav>
  //       </div>
  //     );
  //   } else {
  return (
    <div>
      <nav class="navbar">
        <div class="navbar-container">
          <a href="/" class="navbar-brand">
            Home
          </a>
          <div class="navbar-nav">
            {(!token || !sessionToken) && (
              <Link to="/register" class="nav-link">
                Register
              </Link>
            )}
            {(!token || !sessionToken) && (
              <Link to="/login" class="nav-link">
                Login
              </Link>
            )}
            {(token || sessionToken) && sessionUser && (
              <>
                <Link to={`/createPost/user/${sessionUser}`} class="nav-link">
                  Account
                </Link>
                <button
                  type="button"
                  class="btn btn-danger"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
