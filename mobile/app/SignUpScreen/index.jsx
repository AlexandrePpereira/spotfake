import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const SignUpScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const registerHandler = async () => {
    if (password !== confirmPassword) {
      window.alert('ERRO: As senhas não coincidem');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/registro', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nome: firstName,
          sobrenome: lastName,
          dataNascimento: birthDate,
          email: email,
          senha: password
        })
      });


      if (response.status === 400) {
        window.alert('ERRO: Usuário já cadastrado!');
      } else if (response.status === 406) {
        window.alert('ERRO: Preencha todos os campos!');
      } else if (response.status === 201) {
        navigation.navigate('Home');
      } else {
        window.alert('ERRO: Ocorreu um erro inesperado');
      }
    } catch (error) {
      window.alert('ERRO: Não foi possível conectar ao servidor');
    }
  };

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.headerText}>Criar Conta</Text>
      <TextInput
        style={styles.inputField}
        placeholder="Nome"
        placeholderTextColor="#666"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.inputField}
        placeholder="Sobrenome"
        placeholderTextColor="#666"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.inputField}
        placeholder="Data de Nascimento (DD/MM/AAAA)"
        placeholderTextColor="#666"
        keyboardType="numeric"
        value={birthDate}
        onChangeText={setBirthDate}
      />
      <TextInput
        style={styles.inputField}
        placeholder="Email"
        placeholderTextColor="#666"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.inputField}
        placeholder="Senha"
        placeholderTextColor="#666"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.inputField}
        placeholder="Confirmar Senha"
        placeholderTextColor="#666"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <TouchableOpacity style={styles.signUpButton} onPress={registerHandler}>
        <Text style={styles.signUpButtonText}>Cadastrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.alreadyMemberText}>Já tem uma conta? Faça Login</Text>
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
  headerText: {
    fontSize: 28,
    fontWeight: '600',
    color: '#E3A633',
    marginBottom: 24,
  },
  inputField: {
    width: '100%',
    height: 48,
    backgroundColor: '#1D1D1D',
    borderRadius: 10,
    paddingHorizontal: 16,
    marginBottom: 16,
    color: '#E5E5E5',
  },
  signUpButton: {
    width: '100%',
    height: 48,
    backgroundColor: '#E3A633',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  signUpButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  alreadyMemberText: {
    fontSize: 16,
    color: '#E3A633',
  },
});

export default SignUpScreen;