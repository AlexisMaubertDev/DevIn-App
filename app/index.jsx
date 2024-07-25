import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { COLORS } from "../styles";
import logo from "../assets/LogoNegro.png";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { login } from "../services/logIn";
import { router } from "expo-router";

const LoginScreen = () => {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loadingFetch, setLoadingFetch] = useState(false);

  const handleLogin = async () => {
    if (email === "" || password === "") {
      setError("Complete todos los campos");
      return;
    }
    setLoadingFetch(true);
    setError(null);

    login(email, password, setError).then((data) => {
      if (data) {
        router.replace("/private/home");
      }
      setLoadingFetch(false);
    });
  };

  return (
    <View
      style={[
        styles.loginContainer,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <View style={styles.logoWrapper}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.logoName}>DevIn</Text>
      </View>
      <View style={styles.loginFormContainer}>
        <Text style={styles.loginTitle}>Iniciar Sesión</Text>
        <View style={styles.loginFormGroupContainer}>
          <View style={styles.loginFormGroup}>
            <TextInput
              name="email"
              type="email"
              value={email}
              autoComplete="true"
              onChangeText={setEmail}
              placeholder="Email"
              style={styles.loginFormInput}
            />
          </View>

          <View style={styles.loginFormGroup}>
            <TextInput
              name="password"
              type="password"
              value={password}
              autoComplete="true"
              onChangeText={setPassword}
              placeholder="Password"
              style={styles.loginFormInput}
            />
          </View>
        </View>

        <TouchableOpacity
          style={styles.loginLoaderButton}
          onPress={handleLogin}
        >
          {loadingFetch ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
          )}
        </TouchableOpacity>

        <View style={styles.linksContainer}>
          <View style={styles.linksRow}>
            <Text style={styles.text}>¿Olvidaste tu contraseña?</Text>
            <TouchableOpacity onPress={() => router.push("/recover-password")}>
              <Text style={styles.link}>Recuperar contraseña</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.linksRow}>
            <Text style={styles.text}>¿No tienes cuenta?</Text>
            <TouchableOpacity onPress={() => router.push("/registro")}>
              <Text style={styles.link}>Registrate</Text>
            </TouchableOpacity>
          </View>
        </View>
        {error !== "" && <Text style={styles.errorMessage}>{error}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY_100,
    alignItems: "start",
    width: "100%",
    justifyContent: "center",
    padding: 30,
    gap: 30,
  },
  logoWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    borderRadius: 15,
    padding: 16,
  },
  logo: {
    height: 80,
    width: 80,
  },
  logoName: {
    color: "black",
    fontWeight: "bold",
    fontSize: 40,
  },

  loginFormContainer: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    backgroundColor: COLORS.PRIMARY_50,
  },
  loginTitle: {
    color: COLORS.PRIMARY_800,
    fontSize: 19.2,
  },
  loginFormGroupContainer: {
    flexDirection: "column",
    width: "80%",
    gap: 22,
  },
  loginFormGroup: {
    position: "relative",
  },
  loginFormInput: {
    width: "98%",
    fontSize: 16,
    border: "none",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.PRIMARY_950,
    backgroundColor: COLORS.PRIMARY_50,
    paddingVertical: 11.2,
    paddingHorizontal: 16,
    color: COLORS.PRIMARY_950,
  },
  loginFormLabel: {
    color: COLORS.PRIMARY_950,
    fontWeight: "bold",
    cursor: "auto",
    position: "absolute",
    fontSize: 12,
    top: 0,
    left: 5,
    transform: [{ translateY: 3.5 }],
    transitionProperty: "transform, color",
    transitionDuration: "0.5s, 0.3s",
  },
  errorMessage: {
    color: "red",
    fontWeight: "bold",
  },
  loginLoaderButton: {
    width: "60%",
    backgroundColor: COLORS.PRIMARY_700,
    padding: 7,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
  },
  loginButtonText: {
    color: "white",
  },
  linksContainer: {
    gap: 5,
  },
  linksRow: {
    flexDirection: "row",
    gap: 5,
  },
  text: {
    color: COLORS.PRIMARY_950,
  },
  link: {
    color: COLORS.PRIMARY_700,
    textDecorationLine: "underline",
  },
});

export default LoginScreen;
