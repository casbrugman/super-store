export const url = "https://gp-super-store-api.herokuapp.com"

async function _fetch(query) {
  try {
    const response = await fetch(query)
    const json = await response.json()
    return json
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function fetchList(params) {
  try {
    return _fetch(`${url}/item/list/${params}`)
  } catch (error) {
    throw error
  }
}

async function fetchItem(id) {
  try {
    return _fetch(`${url}/item/${id}`)
  } catch (error) {
    throw error
  }
}

export { fetchList, fetchItem }
