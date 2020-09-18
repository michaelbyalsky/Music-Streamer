function network(endpoint, {body, ...customConfig} = {}) {
  // const token = window.localStorage.getItem(localStorageKey)
  const headers = { "Content-Type": "application/json" };
  // if (token) {
  //   headers.Authorization = `Bearer ${token}`
  // }
  const config = {
    method: body ? "POST" : "GET",
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };
  if (body) {
    config.body = JSON.stringify(body);
  }

  return fetch(`${endpoint}`, config).then(async (response) => {
    const data = await response.json();
    // if (response.status === 401) {
    //   logout()
    //   window.location.assign(window.location)
    //   return
    // }
    if (response.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
}

// function logout() {
//   window.localStorage.removeItem(localStorageKey)
// }

export default network
