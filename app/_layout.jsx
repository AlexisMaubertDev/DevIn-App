import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <Stack>
      {/* <Stack.Screen name="/login" options={{ headerShown: false }} /> */}
      <Stack.Screen name="/registro" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RootLayout;
