const apiUrl = import.meta.env.EXPO_PUBLIC_API_URL;

export const buscarUsuario = async (
  token,
  query,
  navigate,
  setResultados,
  limit,
  offset
) => {
  try {
    const response = await fetchData(token, query, offset, limit);

    if (response.status === 500) {
      throw new Error("Error en la solicitud");
    }

    if (response.status === 401 || response.status === 403) {
      navigate("/login");
    }
    const data = await response.json();
    if (response.status === 200) {
      setResultados(data.usuarios);
      return data.cantidad;
    }
    if (response.status === 404) {
      setResultados([
        0,
        "No se encontraron resultados que concuerden con la búsqueda",
      ]);
    }
  } catch (error) {
    console.error(error);
  }
};

async function fetchData(token, query, offset, limit) {
  return await fetch(
    `${apiUrl}usuario/buscarUsuario?query=${query}&offset=${offset}&limit=${limit}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
