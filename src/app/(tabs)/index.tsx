import Button from '@/components/Button';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <View style={styles.footer}>
        <Button title='Voltar' variant='secondary' 
        onPress={() => router.replace("/onboarding")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  footer: {
      width: '100%',
      gap:12,
      paddingBottom: 40,
    },
});
