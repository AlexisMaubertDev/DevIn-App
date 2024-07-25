const apiUrl = import.meta.env.EXPO_PUBLIC_API_URL;

export const getRespuestaComentarioPublicacion = async (
  idComentario,
  token,
  navigate
) => {
  console.log(idComentario);
  try {
    const response = await fetchData(idComentario, token);
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

async function fetchData(idComentario, token) {
  return await fetch(
    `${apiUrl}respuestaComentarioPublicacion/${idComentario}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
