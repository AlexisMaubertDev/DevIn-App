const apiUrl = import.meta.env.EXPO_PUBLIC_API_URL;

export const cambiarEstadoTrabajo = async (
  token,
  usuarioId,
  trabajoId,
  navigate
) => {
  console.log(usuarioId);
  console.log(trabajoId);
  try {
    const response = await fetchData(token, usuarioId, trabajoId);
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

async function fetchData(token, usuarioId, trabajoId) {
  return await fetch(`${apiUrl}postulanteTrabajo/invertir-estado`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      usuarioId,
      trabajoId,
    }),
  });
}
