import React, { useContext, useEffect, useState } from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { useNavigate } from "react-router-dom";

import {
    Alert,
    Button,
    ImageBackground,
    Modal,
    Pressable,
    SafeAreaView,
    TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function ReviewDetails(props) {
    const { patient } = props;
    const [str, setStr] = useState("");

    const navigate = useNavigate();
    return (
        <View style={styles.card}>
            <View style={styles.cardContent}>
                <Text>Name : {patient.PATIENT_NAME}</Text>
            </View>
            <View style={styles.cardContent}>
                <Text>PatientID : {patient.P_ID}</Text>
            </View>
            <View style={styles.cardContent}>
                <Text>Age : {patient.AGE}</Text>
            </View>
            <View style={styles.cardContent}>
                <Text>Gender : {patient.GENDER}</Text>
                <Text >
                    <Pressable>
                        <Icon.Button
                            // name="profile"
                            style={styles.buttonOpen}
                            onPress={() => {
                                // setStr("/Patient_id/" + String(patient.P_ID))
                                navigate("/Patient_id/" + String(patient.P_ID))
                            }}
                        >
                            Assessment
                        </Icon.Button>
                    </Pressable>
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 6,
        elevation: 3,
        backgroundColor: '#fff',
        shadowOffset: { width: -2, height: -3 },
        shadowColor: '#56BF9C',
        shadowOpacity: 1,
        shadowRadius: 2,
        marginHorizontal: 4,
        marginVertical: 6,
    },
    cardContent: {
        marginHorizontal: 18,
        marginVertical: 8,
    },
    buttonOpen: {
        alignContent: 'center',
        backgroundColor: "#56BF9C",
        paddingTop: 3,
    }
});

export default ReviewDetails;
