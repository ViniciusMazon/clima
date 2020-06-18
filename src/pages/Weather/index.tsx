import { Feather as Icon } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Weather: React.FC = () => {
  const navigation = useNavigation();
  const [city, setCity] = useState('');

  async function getStorageCity() {
    try {
      const value = await AsyncStorage.getItem('Clima_city');
      if (value !== null) {
        setCity(value);
        console.log('Atualizou');
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getStorageCity();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{city !== '' ? city : 'Null'}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Configurações', { setCity })}>
          <Icon name="settings" color="#333" size={24} />
        </TouchableOpacity>
      </View>
      <View style={styles.conditionContainer}>
        <Text>Icon</Text>
        <View style={styles.conditionContent}>
          <Text style={styles.conditionTitle}>Nublado</Text>
          <Text style={styles.conditionDescription}>Céu encoberdo</Text>
        </View>
      </View>
      <View style={styles.temperatureContainer}>
        <Text style={styles.temperatureTitle}>28°C</Text>
        <Text style={styles.temperatureDescription}>Max 30° / Min 18°</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    marginTop: 60,
    width: 300,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  headerTitle: {
    fontSize: 35,
    fontWeight: 'bold',
    marginVertical: 70,
  },
  conditionContainer: {
    flexDirection: 'row',
    width: 300,
    justifyContent: 'space-between',
  },
  conditionContent: {
    width: 150,
    marginBottom: 20,
  },
  conditionTitle: {
    fontSize: 25,
  },
  conditionDescription: {
    fontSize: 16,
  },
  temperatureContainer: {
    width: 300,
  },
  temperatureTitle: {
    fontSize: 25,
  },
  temperatureDescription: {
    fontSize: 16,
  },
});

export default Weather;
