import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

interface IBGEUFRresponse {
  sigla: string;
}

interface IBGECityResponse {
  nome: string;
}

interface Select {
  label: string;
  value: string;
}

const Settings: React.FC = () => {
  const [ufs, setUfs] = useState<Select[]>([]);
  const [cities, setCities] = useState<Select[]>([]);
  const [selectedUf, setSelectedUf] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const routeParams = route.params as Params;

  useEffect(() => {
    axios
      .get<IBGEUFRresponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then((response) => {
        const ufInitials = response.data.map((uf) => uf.sigla);
        const ufsFormated = ufInitials.map((uf) => {
          return { key: uf, label: uf, value: uf };
        });
        setUfs(ufsFormated);
      });
  }, []);

  useEffect(() => {
    if (selectedUf === '') {
      return;
    }

    axios
      .get<IBGECityResponse[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`
      )
      .then((response) => {
        const CityNames = response.data.map((city) => city.nome);
        const citiesFormated = CityNames.map((city) => {
          return { key: city, label: city, value: city };
        });
        setCities(citiesFormated);
      });
  }, [selectedUf]);

  async function handleSave() {
    if (selectedCity !== '') {
      await AsyncStorage.setItem('Clima_city', selectedCity);
      routeParams.setCity(selectedCity);
    }
    navigation.navigate('Clima');
  }

  return (
    <View style={styles.container}>
      <RNPickerSelect
        onValueChange={(value) => setSelectedUf(value)}
        items={ufs}
        placeholder={{ label: 'Selecione seu estado', value: null }}
      />

      <RNPickerSelect
        onValueChange={(value) => setSelectedCity(value)}
        items={cities}
        placeholder={{ label: 'Selecione sua cidade', value: null }}
        disabled={!(cities.length > 0)}
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  text: {
    fontSize: 20,
    marginBottom: 50,
  },
  button: {
    backgroundColor: '#4666e4',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontSize: 16,
  },
});

export default Settings;
