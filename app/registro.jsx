import { useState } from "react";
import {
  ActivityIndicator,
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import logo from "../assets/LogoNegro.png";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { registro } from "../services/registro";
import { COLORS } from "../styles";

const Registro = () => {
  const [nombre, setNombre] = useState("");
  const [segundoNombre, setSegundoNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [segundoApellido, setSegundoApellido] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    // e.preventDefault();

    setError(null);
    setIsLoading(true);

    try {
      const datosnuevoUser = {
        nombre,
        segundoNombre,
        apellido,
        segundoApellido,
        password,
        email,
        telefono,
      };

      const response = await registro(
        datosnuevoUser,
        setError,
        navigate,
        setIsLoading
      );

      if (response.status === 201) {
        setIsLoading(false);
        //Mostrar un mensaje de que se envió un email
      } else {
        setError(response.mensaje);
        setIsLoading(false);
        //Si hay error de conexión no muestra nada
      }
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  return (
    <View
      style={[
        styles.registroContainer,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <View style={styles.logoWrapper}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.logoName}>DevIn</Text>
      </View>
      <View style={styles.registroForm}>
        <Text style={styles.h2}>Registro</Text>
        <View style={styles.inputsContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={nombre}
            onChangeText={setNombre}
          />
          <TextInput
            style={styles.input}
            placeholder="Segundo nombre"
            value={segundoNombre}
            onChangeText={setSegundoNombre}
          />
          <TextInput
            style={styles.input}
            placeholder="Apellido"
            value={apellido}
            onChangeText={setApellido}
          />
          <TextInput
            style={styles.input}
            placeholder="Segundo apellido"
            value={segundoApellido}
            onChangeText={setSegundoApellido}
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Teléfono"
            value={telefono}
            onChangeText={setTelefono}
            keyboardType="phone-pad"
          />
        </View>
        {error && <Text style={styles.error}>{error}</Text>}
        <Button
          title={isLoading ? "Cargando..." : "Registrarse"}
          onPress={handleSubmit}
          disabled={isLoading}
        />
        {isLoading && <ActivityIndicator size="large" color="black" />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  registroContainer: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY_100,
    alignItems: "start",
    width: "100%",
    justifyContent: "center",
    padding: 30,
    gap: 30,
  },
  logoWrapper: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
  },
  logoName: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  registroForm: {
    flex: 1,
  },
});

export default Registro;
