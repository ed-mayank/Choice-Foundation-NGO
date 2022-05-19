import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    SafeAreaView,
} from 'react-native';

const ProfileUser = () => {
    if (localStorage.getItem('user_data') == null) {
        alert("Unauthorised Access")
        navigate("/")
    }
    const userData = JSON.parse(localStorage.getItem('user_data'))
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.textStyle}>Username: </Text><Text style={styles.textStyle1}>{userData.username}</Text>
            <Text style={styles.textStyle}>Email: </Text><Text style={styles.textStyle1}>{userData.email}</Text>
            <Text style={styles.textStyle}>Hospital Name: </Text><Text style={styles.textStyle1}>{userData.hospitalName}</Text>
            <Text style={styles.textStyle}>Hospital Short Name: </Text><Text style={styles.textStyle1}>{userData.hospitalShortName}</Text>
            <Text style={styles.textStyle}>Hospital Address: </Text><Text style={styles.textStyle1}>{userData.hospitalAdress}</Text>
            <Text style={styles.textStyle}>Hospital Tagline: </Text><Text style={styles.textStyle1}>{userData.hospitalTagLine}</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textStyle: {
        flex: 1,
        marginTop: 20,
        width: 300,
        height: 40,
        fontSize: 20,
        fontWeight: "bold",
        paddingHorizontal: 10,
    },
    textStyle1: {
        flex: 1,
        marginTop: 20,
        width: 300,
        height: 40,
        fontSize: 20,
        paddingHorizontal: 10,
    },
})

export default ProfileUser;