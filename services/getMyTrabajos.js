const apiUrl = import.meta.env.EXPO_PUBLIC_API_URL;

export const getMyTrabajos = async (token, navigate) => {
  try {
    const response = await fetchData(token);
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

async function fetchData(token) {
  return await fetch(`${apiUrl}trabajo/ver-mis-trabajos`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}
