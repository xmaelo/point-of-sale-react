import store from './reducer'

//export const endpoint = "http://restau.gh-raphia.net/php-websocket-app/public/api/" //
export const endpoint = "http://localhost:8000/api/"



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

export const request_get = request_get1

  
export function request_post(path, body, header){
    const r = fetch(endpoint+path, {
         method: 'POST',
         headers: {
          'authorization': !header? 'Bearer '+store.getState().header : null,
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

async function onOrder(random, header){
  try {
    const res = await request_get1('commandes?page=1&random='+random, header)
    if(res&&res["hydra:member"]){
      store.dispatch({type: "NEW_ORDER", order: res["hydra:member"][0]})
    }
  } catch (error) {
    console.log('error error error error error', error)
  }
}
  