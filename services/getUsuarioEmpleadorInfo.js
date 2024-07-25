const apiUrl = import.meta.env.EXPO_PUBLIC_API_URL;

export const getUsuarioEmpleadorInfo = async (id) => {
  try {
    const response = await fetch(`${apiUrl}usuario/usuarioEmpleador?id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    data.ok = response.ok;
    return data;
  } catch (error) {
    console.error(error);
    return { ok: false, mensaje: "Error del servidor" };
  }
};
