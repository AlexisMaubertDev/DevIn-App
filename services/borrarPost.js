const apiUrl = import.meta.env.EXPO_PUBLIC_API_URL;

export const borrarPost = async (token, navigate, idPublicacion) => {
  try {
    const response = await fetch(`${apiUrl}publicacion/${idPublicacion}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response) {
      if (response.status === 401 || response.status === 403) {
        localStorage.clear();
        navigate("/login");
      }
      if (response.status === 204) {
        return { ok: true, mensaje: "Publicacion borrada" };
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
