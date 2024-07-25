const apiUrl = import.meta.env.EXPO_PUBLIC_API_URL;

// resetPasswordService.js
export const resetPassword = async (token, password, setError) => {
  try {
    const response = await fetch(`${apiUrl}usuario/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });

    const data = await response.json();
    if (response.status !== 200) {
      setError(data.message || "Error al intentar restablecer la contraseña.");
    } else {
      // Operación exitosa, puedes manejar la respuesta como creas conveniente
    }
    return data;
  } catch (error) {
    setError("Error de conexión con el servidor.");
    console.error(
      "Error en el servicio de restablecimiento de contraseña",
      error
    );
  }
};
