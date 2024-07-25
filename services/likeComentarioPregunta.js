const apiUrl = import.meta.env.EXPO_PUBLIC_API_URL;

export const likeComentarioPregunta = async (token, navigate, data) => {
  try {
    const response = await fetch(
      `${apiUrl}likeComentarioForo/${data.idComentario}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      }
    );
    if (response) {
      if (response.status === 401 || response.status === 403) {
        localStorage.clear();
        navigate("/login");
      }
      if (response.status === 204) {
        return { ok: true, mensaje: "Like borrado" };
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
