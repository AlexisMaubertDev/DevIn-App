const apiUrl = import.meta.env.EXPO_PUBLIC_API_URL;

export const getUsuarioActual = async (token, navigate) => {
  try {
    const response = await fetch(`${apiUrl}usuario/usuarioActual`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response) {
      if (response.status === 401 || response.status === 403) {
        localStorage.clear();
        navigate("/login");
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
