export async function post_with_credentials(route, json_payload) {
  const string_json = JSON.stringify(json_payload);

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

export async function post(route, json_payload) {
  const string_json = JSON.stringify(json_payload);

  const response = await fetch(route, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "post",
    body: string_json,
  });

  return [response.ok, await response.json()];
}
