const apiUrl = import.meta.env.EXPO_PUBLIC_API_URL;

export const getMensajes = async (idUsuario, token, navigate) => {
  try {
    const response = await fetchData(idUsuario, token);
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

async function fetchData(idUsuario, token) {
  try {
    const response = await fetch(`${apiUrl}mensaje?receiver=${idUsuario}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}