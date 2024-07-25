const apiUrl = import.meta.env.EXPO_PUBLIC_API_URL;

export const getComentariosPregunta = async (idForo, token, navigate) => {
  try {
    const response = await fetchData(idForo, token);
    if (response.status === 401 || response.status === 403) {
      navigate("/login");
    }
    const data = await response.json();
    data.ok = response.ok;
    return data;
  } catch (error) {
    console.error(error);
    return { ok: false, mensaje: "Error del servidor" };
  }
};

async function fetchData(idForo, token) {
  return await fetch(`${apiUrl}comentarioForo/${idForo}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}
