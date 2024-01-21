export async function delete_with_credentials(route_with_param) {
  const response = await fetch(route_with_param, {
    credentials: "include",
    headers: {
      Accept: "application/json",
    },
    method: "delete",
  });

  return [response.ok, await response.json()];
}
