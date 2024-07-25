const apiUrl = import.meta.env.EXPO_PUBLIC_API_URL;

export const editarPerfil = async (token, navigate, data) => {
  try {
    const response = await fetchData(token, data);

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
    return { ok: false, mensaje: "Error del servidor" };
  }
};

async function fetchData(token, data) {
  if (data.nombre) {
    return await fetch(`${apiUrl}usuario/editarPerfil`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  } else {
    return await fetch(`${apiUrl}usuario/editarPerfil`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    });
  }
}
