const apiUrl = import.meta.env.EXPO_PUBLIC_API_URL;

export const buscarSugerencia = async (
  token,
  query,
  navigate,
  setSugerencias
) => {
  try {
    const response = await fetchData(token, query);
    if (response.status === 401 || response.status === 403) {
      navigate("/login");
    }
    const data = await response.json();
    if (response.status === 200) {
      setSugerencias(data.usuarios);
    }
  } catch (error) {
    console.error(error);
  }
};

async function fetchData(token, query) {
  return await fetch(
    `${apiUrl}usuario/buscarSugerenciaUsuario?query=${query}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
