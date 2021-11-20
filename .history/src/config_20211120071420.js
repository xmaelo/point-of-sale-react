import store from './reducer'

export const endpoint = "http://localhost:8000/api/"



export function request_get(path){

    console.log('endpoint+path', endpoint+path)
    const r = fetch(endpoint+path, {
         method: 'GET',
         headers: {
           'authorization': store.getState().header,
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
          // 'Content-Type': 'multipart/form-data',
          // 'credentials': "same-origin",
      },
      body: body
    }).then(
      (response) => console.log('=res', response)
    ).then(
      (responseJson) => {
        return responseJson;
      }
    )
    return r;
}
  