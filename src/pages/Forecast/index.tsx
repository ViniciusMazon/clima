import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

const Forecast: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4666e4" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Forecast - Em desenvolvimento</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 50,
  },
});

export default Forecast;
