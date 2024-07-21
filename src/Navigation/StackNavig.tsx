import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { EventProvider } from '../Constext.tsx/EventContext';
import HomeScreen from '../Componentes/HomeScreen';
import RegisterEventScreen from '../Componentes/Registros';
import EventDetailScreen from '../Componentes/Lista';

const Stack = createStackNavigator();

const App = () => {
  return (
    <EventProvider> 
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Mi lista" component={HomeScreen} />
          <Stack.Screen name="Registro" component={RegisterEventScreen} />
          <Stack.Screen name="Listado" component={EventDetailScreen} />
        </Stack.Navigator>
    </EventProvider>
  );
};

export default App;
