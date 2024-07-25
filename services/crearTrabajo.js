const apiUrl = import.meta.env.EXPO_PUBLIC_API_URL;

export const crearTrabajo = async (token, navigate, data) => {
  try {
    const response = await fetch(`${apiUrl}trabajo/crear`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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
