const apiUrl = import.meta.env.EXPO_PUBLIC_API_URL;

export const getPostuladosPorTrabajo = async (token, navigate, idTrabajo) => {
  try {
    const response = await fetchData(token, idTrabajo);
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

async function fetchData(token, idTrabajo) {
  return await fetch(`${apiUrl}trabajo/postulaciones/${idTrabajo}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}
