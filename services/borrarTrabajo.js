const apiUrl = import.meta.env.EXPO_PUBLIC_API_URL;

export const borrarTrabajo = async (token, navigate, idTrabajo) => {
  console.log(idTrabajo);
  try {
    const response = await fetch(`${apiUrl}trabajo/borrar/${idTrabajo}`, {
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
        return { ok: true, mensaje: "Trabajo borrado" };
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
