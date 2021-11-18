export const endpoint = "http://localhost:8000/api/"

export function request_get(path, header){

    console.log('endpoint+path', endpoint+path)
    const r = fetch(endpoint+path, {
         method: 'GET',
         headers: {
           'authorization': header,
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
          'authorization': header? 'Bearer '+header : null,
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
  