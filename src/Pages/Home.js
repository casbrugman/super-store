import React, { useState, useEffect } from "react"
import Catalog from "../Components/Catalog/Catalog"
import Api from "../Lib/Api"

export default function Home() {
  const [items, setItems] = useState([])
  const [errorMsg, setErrorMsg] = useState()
  const [isLoading, setLoading] = useState(true)

  useEffect(function () {
    async function fetchData() {
      try {
        let items = await Api.getItems()
        setItems(items)
        setErrorMsg()
      } catch (error) {
        setErrorMsg("Could not fetch items")
        return error
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <div>
      <Catalog items={items} message={errorMsg} isLoading={isLoading} />
    </div>
  )
}
