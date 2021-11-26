import store from './reducer'

//export const endpoint = "http://restau.gh-raphia.net/php-websocket-app/public/api/" //
export const endpoint = "http://localhost:8000/api/"



export function request_get(path, header){

    console.log('endpoint+path', endpoint+path)
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
  