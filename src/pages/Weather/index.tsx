import { Feather as Icon } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { API_TOKEN } from 'react-native-dotenv';

import apiWeather from '../../services/openWeather';

interface weatherData {
  main: string;
  description: string;
  icon: string;
  humidity: string;
  temp: string;
  temp_max: string;
  temp_min: string;
}

const Weather: React.FC = () => {
  const navigation = useNavigation();
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<weatherData>({});
  const [isLoading, setIsLoading] = useState(true);

  async function getStorageCity() {
    try {
      const value = await AsyncStorage.getItem('Clima_city');
      if (value !== null) {
        setCity(value);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    getStorageCity();
  }, []);

  useEffect(() => {
    if (city) {
      setIsLoading(true);
      apiWeather
        .get(`data/2.5/weather?q=${city}&units=metric&lang=pt_br&appid=${API_TOKEN}`)
        .then((response) => {
          const { humidity, temp, temp_max, temp_min } = response.data.main;
          const { description, icon, main } = response.data.weather[0];
          const data = {
            main,
            description,
            icon,
            humidity,
            temp,
            temp_max,
            temp_min,
          };

          setWeather(data);
        });
      setIsLoading(false);
    }
  }, [city]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4666e4" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{city !== '' ? city : 'Null'}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Configurações', { setCity })}>
          <Icon name="settings" color="#666" size={24} />
        </TouchableOpacity>
      </View>
      <View style={styles.conditionContainer}>
        {weather.icon ? (
          <Image
            style={styles.conditionImage}
            source={{ uri: `http://openweathermap.org/img/wn/${weather.icon}@4x.png` }}
          />
        ) : null}

        <View style={styles.conditionContent}>
          <Text style={styles.conditionTitle}>{weather.main}</Text>
          <Text style={styles.conditionDescription}>{weather.description}</Text>
        </View>
      </View>
      <View style={styles.temperatureContainer}>
        <Text style={styles.temperatureTitle}>{weather.temp}°C</Text>
        <Text style={styles.temperatureDescription}>
          Max {weather.temp_max}° / Min {weather.temp_min}°
        </Text>
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
    color: '#333',
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
    color: '#333',
  },
  conditionDescription: {
    fontSize: 16,
    color: '#666',
  },
  conditionImage: {
    width: 130,
  },
  temperatureContainer: {
    width: 300,
    marginTop: 30,
  },
  temperatureTitle: {
    fontSize: 25,
    color: '#333',
  },
  temperatureDescription: {
    fontSize: 16,
    color: '#666',
  },
});

export default Weather;
