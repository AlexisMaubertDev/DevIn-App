const apiUrl = import.meta.env.EXPO_PUBLIC_API_URL;

export const borrarRespuestaComentarioPublicacion = async (
  token,
  navigate,
  idRespuesta
) => {
  try {
    const response = await fetch(
      `${apiUrl}respuestaComentarioPublicacion/${idRespuesta}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response) {
      if (response.status === 401 || response.status === 403) {
        localStorage.clear();
        navigate("/login");
      }
      if (response.status === 204) {
        return { ok: true, mensaje: "Comentario borrada" };
      }
      const data = await response.json();
      data.ok = response.ok;
      return data;
    }
  } catch (error) {
    console.error(error);
    return { ok: false, mensaje: "Error del servidor" };
  }
};
