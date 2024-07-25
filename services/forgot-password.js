const apiUrl = import.meta.env.EXPO_PUBLIC_API_URL;

export const forgotPassword = async (email, setError) => {
  if (email === "") {
    setError("El campo del email no puede estar vacío.");
    return;
  }
  try {
    const response = await fetch(`${apiUrl}usuario/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (response.status !== 200) {
      setError(
        data.mensaje || "Error al intentar la recuperación de contraseña."
      );
    }
    return data; // Este data debería contener el mensaje de éxito de la operación
  } catch (error) {
    setError("Error de conexión con el servidor.");
    console.error("Error en el servicio de recuperación", error);
  }
};
