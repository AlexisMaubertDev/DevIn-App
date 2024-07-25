const apiUrl = import.meta.env.EXPO_PUBLIC_API_URL;

export const registro = async (
  datosnuevoUser,
  setError,
  navigate,
  setIsLoading
) => {
  try {
    const response = await fetch(`${apiUrl}usuario/registro`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosnuevoUser),
    });

    const data = await response.json();

    if (response.status === 500) {
      setError(data.mensaje);
      return false;
    }

    if (response.status === 409) {
      setError(data.mensaje);
      return false;
    }

    if (response.status === 201) {
      navigate("/revisar-mail");
      setIsLoading(false);
      return true;
    } else {
      setError("Este cuando saldria?");
      setIsLoading(false);
      return false;
    }
  } catch (error) {
    setError("Error de conexión");
    console.log("Error de servidor", error);
    return false;
  }
};
