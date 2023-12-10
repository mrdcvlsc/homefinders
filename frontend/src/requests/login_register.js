export async function post_credentials(route, json) {
  const response = await fetch(route, {
    credentials: 'include',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    method: 'post',
    body:JSON.stringify(json)
  });

  return [response.ok, await response.json()]
}