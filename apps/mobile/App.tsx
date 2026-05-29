import React from 'react';import {QueryClient,QueryClientProvider} from '@tanstack/react-query';import {NavigationContainer} from '@react-navigation/native';import RootNavigator from './src/navigation/RootNavigator';
const qc=new QueryClient();export default function App(){return <QueryClientProvider client={qc}><NavigationContainer><RootNavigator/></NavigationContainer></QueryClientProvider>}
