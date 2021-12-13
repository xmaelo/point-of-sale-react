import store from './reducer'

const url ="http://restau.gh-raphia.net/php-websocket-app/public/"
export const endpoint = url+"api/"
export const imageBase = url+"uploads/"

export const websocketUrl = "ws://restau.gh-raphia.net:3001"

// const url = "http://localhost:8000/"
// export const imageBase = url+"uploads/"
// export const endpoint = url+"api/"





function request_get1(path, header){

    const r = fetch(endpoint+path, {
         method: 'GET',
         headers: {
           'authorization': !header ? store.getState().header : header,
           'Content-Type': 'application/json'
      }
    }).then(
      (response) => response.json()
    ).then(
      (responseJson) => {
        return responseJson;
      }
    )
    return r;
}
export function request_delete(path, header){

    const r = fetch(endpoint+path, {
         method: 'DELETE',
         headers: {
           'authorization': !header ? store.getState().header : header,
           'Content-Type': 'application/json'
      }
    }).then(
      (response) => true
    ).then(
      (responseJson) => {
        return responseJson;
      }
    )
    return r;
}

export const request_get = request_get1

  
export function request_post(path, body, header){
  const head = !header? store.getState().header : null
  console.log('head head head head head', head)
    const r = fetch(endpoint+path, {
         method: 'POST',
         headers: {
          'authorization': head,
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(
      (response) => response.json()
    ).then(
      (responseJson) => {
        return responseJson;
      }
    )
    return r;
}

export function request_patch(path, body, header){
    const r = fetch(endpoint+path, {
         method: 'PATCH',
         headers: {
          'authorization': !header? 'Bearer '+store.getState().header : null,
          'Content-Type': 'application/merge-patch+json'
      },
      body: JSON.stringify(body)
    }).then(
      (response) => response.json()
    ).then(
      (responseJson) => {
        return responseJson;
      }
    )
    return r;
}
  
export function request_post_with_picture(path, body, header){
    const r = fetch(endpoint+path, {
         method: 'POST',
         headers: {
          'authorization': !header? 'Bearer '+store.getState().header : null,
      },
      body: body
    }).then(
      (response) => response.json()
    ).then(
      (responseJson) => {
        return responseJson;
      }
    )
    return r;
}

async function onOrder1(obx, header){
  try {
    const res = await request_get1('commandes?page=1&random='+obx.random, header)
    if(res&&res["hydra:member"]){
      store.dispatch({type: "NEW_ORDER", order: res["hydra:member"][0]})
    }
  } catch (error) {
    console.log('error error error error error', error)
  }
}

export const onOrder = onOrder1
  