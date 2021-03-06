import React, { useContext } from "react"
import { Link, NavLink } from "react-router-dom"
import logo from "../Assets/logo.svg"
import styled from "styled-components"
import { Context as CartContext } from "../State/Cart"

const Styled = styled.header`
  width: 100%;
  padding: 0em 1em 0em 0rem;
  box-sizing: border-box;
  background-color: blue;
  display: flex;
  color: white;
  a {
    color: white;
  }
  img {
    height: 4rem;
  }
  h2 {
    margin-top: auto;
    margin-bottom: auto;
    margin-right: auto;
    a {
      text-decoration: none;
    }
  }
  nav {
    margin-top: auto;
    margin-bottom: auto;
    a {
      padding: 0.5rem;
      margin-left: 0.5rem;
    }
    .active {
      background-color: blue;
      color: white;
      font-weight: 1000;
    }
  }
`

export default function Header() {
  const { itemCount: cartSize } = useContext(CartContext)

  return (
    <Styled>
      <img src={logo} alt="" />
      <h2>
        <Link to="/">Store</Link>
      </h2>
      <nav>
        <NavLink exact to="/">
          Home
        </NavLink>
        <NavLink
          isActive={(match, location) => {
            return location.search.includes("isOnSale=true")
          }}
          to="/list?isOnSale=true"
        >
          Deals
        </NavLink>
        <NavLink to="/cart">Cart {cartSize > 0 && cartSize}</NavLink>
      </nav>
    </Styled>
  )
}
