const apiUrl = process.env.EXPO_PUBLIC_API_URL;
import AsyncStorage from "@react-native-async-storage/async-storage";

export const login = async (email, password, setError) => {
  console.log(apiUrl);
  const response = await fetchData(email, password, setError);
  console.log(response);
  const data = await response.json();
  if (response.status === 200) {
    await AsyncStorage.setItem("userData", JSON.stringify(data.usuario));
    await AsyncStorage.setItem("token", data.token);
    return true;
  }
  setError(data.mensaje);
  return false;
};

const fetchData = async (email, password) => {
  try {
    return await fetch(`${apiUrl}usuario/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
  } catch (error) {
    console.error("Error en la solicitud", error);
    return { status: 500 };
  }
};
