import React from "react"
import PropTypes from "prop-types"
import Item from "./Item"
import styled from "styled-components"

const Styled = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: space-around;
  justify-content: center;
`

export default function Catalog({ items, message = "Nothing to show" }) {
  return (
    <Styled>
      {items.length > 0 ? (
        items.map((item) => (
          <Item
            id={item._id}
            name={item.name}
            price={item.price}
            rating={item.avgRating}
            isOnSale={item.isOnSale}
            image={item.imageUrl}
            key={item._id}
          />
        ))
      ) : (
        <div className="message">{message}</div>
      )}
    </Styled>
  )
}

Catalog.propTypes = {
  items: PropTypes.array,
  message: PropTypes.string,
}
