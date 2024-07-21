import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import StackNavig from "./src/Navigation/StackNavig";
import * as SplashScreen from 'expo-splash-screen';

// Mantener la pantalla de carga visible mientras cargamos recursos
SplashScreen.preventAutoHideAsync();

export default function App() {
  useEffect(() => {
    async function prepare() {
      // Simula la carga de recursos (puedes reemplazar esto con tus operaciones de carga reales)
      await new Promise(resolve => setTimeout(resolve, 5000));
      // Oculta la pantalla de carga después de 3 segundos
      await SplashScreen.hideAsync();
    }

    prepare();
  }, []);

  return (
    <NavigationContainer>
      <StackNavig></StackNavig>
    </NavigationContainer>
  );
}

