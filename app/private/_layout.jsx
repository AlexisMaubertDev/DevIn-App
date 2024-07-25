import { Stack, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

const ProtectedLayout = () => {
  let currentUser = null;

  useEffect(() => {
    AsyncStorage.getItem("userData").then((data) => {
      if (!data) {
        return router.replace("/login");
      }
      currentUser = JSON.parse(data);
    });
  }, []);

  return (
    <Stack>
      <Stack.Screen name="/home" options={{ headerShown: false }} />
      {/* <Stack.Screen name="index" options={{ headerShown: false }} /> */}
    </Stack>
  );
};

export default ProtectedLayout;
