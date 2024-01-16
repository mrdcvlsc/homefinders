export async function get_loggedin_user() {
  const response = await fetch("/who", {
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "get",
  });

  return [response.ok, await response.json()];
}

export async function logout_request() {
  const response = await fetch("/logout", {
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "get",
  });

  return [response.ok, await response.json()];
}
