import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  SafeAreaView,
  Pressable,
  Alert,
} from 'react-native';

const Login = () => {
  const Navigate = useNavigate()

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const authenticate = async () => {
    const requestOptions = {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username,
        password: password,
        hospitalID: "dpmta"
      })
    };

    const result = await fetch('https://devapi.igzolt.in/index.php/v1/authentication/login',
      {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username,
          password: password,
          hospitalID: "dpmta"
        })
      })
    const data = await result.json();
    // console.log(data.status)

    if (result.status === 200) {
      if (localStorage.getItem('user_data') != null) {
        localStorage.removeItem('user_data')
      }
      localStorage.setItem('user_data', JSON.stringify(data))
      Navigate('/User_id/Profile')
    }
    else {
      console.log("wrong")
      Alert.alert("Invalid credentials");
    }
    // else if (data.status === "Fail") {
    //   console.log("wrong")
    //   Alert.alert("Invalid credentials");
    // }


  }
  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholder="Email"
        style={styles.inputStyle}
        onChangeText={(username) => {
          setUsername(username);
        }}
      />
      <TextInput
        secureTextEntry={true}
        placeholder="Password"
        style={styles.inputStyle}
        onChangeText={(password) => {
          setPassword(password);
        }}
      />
      <Pressable onPress={authenticate} style={styles.button}>
        <Text style={styles.buttonLabel}>Login</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formLabel: {
    fontSize: 20,
    color: '#fff',
  },
  inputStyle: {
    marginTop: 20,
    width: 300,
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 50,
    backgroundColor: '#DCDCDC',
  },
  formText: {
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: 20,
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
  button: {
    marginTop: 20,
    paddingHorizontal: 10,
    // paddingVertical: 6,
    borderRadius: 50,
    // backgroundColor: 'oldlace',
    // marginHorizontal: '1%',
    // marginBottom: 6,
    // minWidth: '48%',
    width: 300,
    height: 40,
    // textAlign: 'center',
    alignItems: 'center',
  },
  buttonLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'blue',
  },
});

export default Login;