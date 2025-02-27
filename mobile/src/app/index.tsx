import { Redirect } from 'expo-router';

export default function Index() {
  // Redireciona para a tab home
  return <Redirect href="/(tabs)/(home)" />;
} 