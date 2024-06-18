import React, { useState } from "react";
import { Text, View, TextInput, Button, Alert, ImageBackground, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import Icon from 'react-native-vector-icons/FontAwesome';

export default function RegisterScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");

  const handleRegister = async () => {
    if (name === '' && email === "" && password === "") {
      return Alert.alert("É preciso que preencha os campos");
    }

    try {
      const usuario = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'usuarios', usuario.user.uid), {
        email,
        name,
      });

      navigation.navigate('Login');
    } catch (err) {
      setErro(err.message);
      Alert.alert(err.message);
    }
  };

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <ImageBackground source={{ uri: 'https://placekitten.com/800/800' }} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Icon name="paw" size={60} color="#333" />
        <Text style={styles.title}>Registro</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setName(text)}
          value={name}
          placeholder="Nome"
          placeholderTextColor="#aaa"
        />
        <TextInput
          style={styles.input}
          onChangeText={text => setEmail(text)}
          value={email}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#aaa"
        />
        <TextInput
          style={styles.input}
          onChangeText={text => setPassword(text)}
          value={password}
          placeholder="Senha"
          secureTextEntry={true}
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Registrar</Text>
        </TouchableOpacity>
        <Text style={styles.loginText} onPress={navigateToLogin}>
          Já tem uma conta? Login
        </Text>
        {erro ? <Text style={styles.errorText}>{erro}</Text> : null}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    height: 40,
    width: 300,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#333',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  loginText: {
    marginTop: 20,
    color: 'blue',
  },
  errorText: {
    marginTop: 20,
    color: 'red',
  },
});
