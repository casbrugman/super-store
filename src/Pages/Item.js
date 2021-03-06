import React, { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import Rating from "../Components/Rating"
import Sale from "../Components/Sale"
import { ColorBox, Button, Input } from "../Components/Styles"
import useItem from "../Hooks/useItem"
import { Context as CartContext, actions } from "../State/Cart"

const Styled = styled.div`
  @media (orientation: landscape) {
    box-sizing: border-box;
    width: 70rem;
    max-width: 100%;
    margin: 0rem auto;
    padding: 5rem 5rem;
  }
  @media (orientation: portrait) {
    margin: 1rem 3rem 3rem;
  }
`

const seperation = 2

const ProductImg = styled.img`
  @media (orientation: landscape) {
    width: calc(50% - ${seperation / 2.0}rem);
    float: left;
    padding-right: ${seperation / 2.0}rem;
  }
  @media (orientation: portrait) {
    display: block;
    margin: auto;
    max-width: 100%;
  }
`

const Info = styled.div`
  @media (orientation: landscape) {
    width: calc(50% - ${seperation / 2.0}rem);
    float: right;
    padding-left: ${seperation / 2.0}rem;
  }
  input {
    margin-right: 1rem;
  }
  span {
    display: inline-block;
  }
`

const StyledButton = styled(Button)`
  width: 6rem;
`

const StockWarning = styled(ColorBox)`
  background-color: lightpink;
`

const CartWarning = styled(ColorBox)`
  background-color: lightblue;
`

const Error = styled(ColorBox)`
  background-color: lightpink;
  margin: 0rem auto;
  width: fit-content;
`

export default function Item() {
  const params = useParams()

  const { item, isLoading, error } = useItem(params.id)

  const [quantity, setQuantity] = useState(0)

  const { items: cart, dispatch } = useContext(CartContext)

  useEffect(() => {
    if (item && item.stockCount > 0) {
      setQuantity(1)
    }
  }, [item])

  function quantityChanged(event) {
    const { value } = event.target
    setQuantity(Number(value))
  }

  const inCart = (cart[params.id] && cart[params.id].amount) || 0

  function addToCart() {
    if (quantity > item.stockCount || item.stockCount === 0) {
      alert("Insufficient Stock")
      return
    }

    dispatch({
      type: actions.set,
      id: item._id,
      item: item,
      amount: quantity + inCart,
    })
    alert(`Added ${quantity} to cart`)
  }

  return (
    <Styled>
      {item ? (
        <div>
          <ProductImg src={item.imageUrl} alt={item.name} />
          <Info>
            <h2>{item.name}</h2>
            {item.isOnSale && <Sale>On Sale</Sale>}
            <Rating score={item.avgRating} />
            <p>{item.description}</p>
            <h3>${item.price}</h3>
            <p>
              <Input
                type="number"
                min="1"
                max={item.stockCount}
                value={quantity}
                onChange={(event) => quantityChanged(event)}
                step="1"
              />
              <span>In stock: {item.stockCount}</span>
            </p>
            <StyledButton onClick={(event) => addToCart(event)}>
              Add to cart
            </StyledButton>
            {(item.stockCount < 1 || quantity > item.stockCount) && (
              <StockWarning>Insufficient stock!</StockWarning>
            )}
            {inCart > 0 && (
              <CartWarning>
                {inCart} of this item is currently in your cart.
              </CartWarning>
            )}
          </Info>
        </div>
      ) : (
        !isLoading && <Error>{error.toString()}</Error>
      )}
    </Styled>
  )
}
