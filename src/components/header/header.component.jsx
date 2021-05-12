import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/firebase.util";

import { connect } from "react-redux";

import { ReactComponent as Logo } from "../../assets/crown.svg";
import "./header.style.scss";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";

const Header = ({ currentUser, cartHidden }) => {
  return (
    <div className="header">
      <Link className="headr-logo-container" to="/">
        <Logo className="logo" />
      </Link>
      <div className="header-options">
        <Link className="option" to="/shop">
          SHOP
        </Link>
        <Link className="option" to="/contact">
          CONTACT
        </Link>
        {currentUser ? (
          <div className="option" onClick={() => auth.signOut()}>
            SIGN OUT
          </div>
        ) : (
          <Link className="option" to="/signin">
            SIGN IN
          </Link>
        )}
        <CartIcon />
      </div>
      {!cartHidden ? <CartDropdown /> : null}
    </div>
  );
};

const mapStateToProps = ({
  user: { currentUser },
  cartReducer: { hidden },
}) => ({
  currentUser: currentUser,
  cartHidden: hidden,
});

export default connect(mapStateToProps)(Header);
