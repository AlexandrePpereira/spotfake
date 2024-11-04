import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginHandler = async () => {
    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          senha: password
        })
      });

      if (response.status === 404) {
        window.alert('ERRO: Usuário não cadastrado!');
        return;
      } else if (response.status === 406) {
        window.alert('ERRO: Preencha todos os campos!');
        return;
      } else if (response.status === 403) {
        window.alert('ERRO: Senha incorreta!');
        return;
      } else if (response.status === 200) {
        navigation.navigate('Home');
      } else if (response.status === 500) {
        window.alert('ERRO: Ocorreu um erro inesperado');
        return;
      } else {
        window.alert('ERRO: Resposta desconhecida do servidor');
        return;
      }
    } catch (error) {
      window.alert('ERRO: Não foi possível conectar ao servidor');
      return;
    }
  };

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.heading}>Acessar Conta</Text>
      <TextInput
        style={styles.inputField}
        placeholder="Digite seu email"
        placeholderTextColor="#666"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.inputField}
        placeholder="Digite sua senha"
        placeholderTextColor="#666"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.loginButton} onPress={loginHandler}>
        <Text style={styles.loginButtonText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.signUpText}>Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#101820',
    padding: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: '600',
    color: '#E3A633',
    marginBottom: 20,
  },
  inputField: {
    width: '100%',
    height: 48,
    backgroundColor: '#1D1D1D',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 18,
    color: '#E5E5E5',
  },
  loginButton: {
    width: '100%',
    height: 48,
    backgroundColor: '#E3A633',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  signUpText: {
    fontSize: 16,
    color: '#E3A633',
    textAlign: 'center',
  },
});

export default LoginPage;