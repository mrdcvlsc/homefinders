export async function post_with_credentials(route, json_payload) {
  console.log('raw json = ')
  console.log(json_payload)
  const string_json = JSON.stringify(json_payload)
  console.log('\nstringified json = ')
  console.log(string_json)
  console.log()

  const response = await fetch(route, {
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "post",
    body: string_json,
  });

  return [response.ok, await response.json()];
}
