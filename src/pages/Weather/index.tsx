import { Feather as Icon } from '@expo/vector-icons';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Weather: React.FC = (props) => {
  const { navigation } = props;
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Configurações')}>
        <Icon name="settings" color="#333" size={24} />
      </TouchableOpacity>
      <Text style={styles.text}>Weather</Text>
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

export default Weather;
