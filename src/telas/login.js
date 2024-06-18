import React, { useState } from "react";
import { Text, View, TextInput, Button, Alert, ImageBackground, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import Icon from 'react-native-vector-icons/FontAwesome';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");

  const handleLogin = async () => {
    if (email === "" && password === "") {
      return Alert.alert("É preciso que preencha os campos");
    }
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (userCredential && userCredential.user) {
        navigation.navigate('Cat');
      }
    } catch (err) {
      setErro(err.message);
    }
  };

  const navigateToRegister = () => {
    navigation.navigate('Registro');
  };

  return (
    <ImageBackground source={{ uri: 'https://placekitten.com/800/800' }} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Icon name="paw" size={60} color="#333" />
        <Text style={styles.title}>Login</Text>
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
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.registerText} onPress={navigateToRegister}>
          Você não tem conta?
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
  registerText: {
    marginTop: 20,
    color: 'blue',
  },
  errorText: {
    marginTop: 20,
    color: 'red',
  },
});

