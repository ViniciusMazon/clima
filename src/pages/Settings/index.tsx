import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Settings: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings</Text>
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

export default Settings;
