import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from "react-router-dom";

import {
    StyleSheet,
    Text,
    SafeAreaView,
} from 'react-native';

function GetP_id() {

    var c = 0;
    var index = 0
    var path = location.pathname
    for (var i = 0; i < path.length; i++) {
        if (path.charAt(i) == '/') {
            c++;
        }
        if (c == 3) {
            index = i
            break;
        }
        if (c == 2) {
            index = path.length;
        }
    }
    return path.substring(12, index)
}

const Profile = () => {
    const location = useLocation()
    var p_id = GetP_id();

    const initialPatients = [];
    // const t_Patient = [];
    const [patients, setPatients] = useState(initialPatients);
    const [patient, setPatient] = useState(initialPatients);
    const patientsList = async () => {
        const result = await fetch('https://devapi.igzolt.in/index.php/Api/ip_patients_list1',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "start": "1",
                    "limit": "20",
                    "ser_hospitalid": "3",
                    "sear_umr_no": "",
                    "sear_ip_no": "",
                    "sear_patient": "",
                    "sear_admission_date": "",
                    "sear_consult_doctor": "",
                    "sear_sponser": "",
                    "admission_date_order": "",
                    "doctor_name_order": "",
                    "ipno_order": "",
                    "sponser_order": "",
                    "sear_ptmid": ""
                })
            })
        const data = await result.json();
        const p_list = data.data
        // console.log(p_list);
        setPatients(p_list);
    }
    useEffect(() => {
        // console.log("api")
        if (localStorage.getItem('user_data') == null) {
            alert("Unauthorised Access")
            navigate("/")
        }
        patientsList();
        // console.log("hah")
    }, []);

    var i = 0;
    for (i = 0; i < patients.length; i++) {
        // console.log(patients[i].P_ID)
        if (patients[i].P_ID == p_id) {
            break;
        }
    }

    if (patients[i]) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.textStyle}>Name:</Text><Text style={styles.textStyle1}> {patients[i].PATIENT_NAME}</Text>
                <Text style={styles.textStyle}>IP Number:</Text><Text style={styles.textStyle1}> {patients[i].P_ID}</Text>
                <Text style={styles.textStyle}>Date of Admission:</Text><Text style={styles.textStyle1}> {patients[i].IP_ADMISSION_DATE}</Text>
                <Text style={styles.textStyle}>Time of Admission:</Text><Text style={styles.textStyle1}> {patients[i].IP_ADMISSION_TIME}</Text>
                <Text style={styles.textStyle}>Age:</Text><Text style={styles.textStyle1}> {patients[i].AGE}</Text>
                <Text style={styles.textStyle}>Gender:</Text><Text style={styles.textStyle1}> {patients[i].GENDER}</Text>
            </SafeAreaView>
        )
    }
    else {
        return (
            <SafeAreaView style={styles.container}>
                {/* <Text style={styles.textStyle}>Name: {patients[i].P_ID}</Text>
                <Text style={styles.textStyle}>IP Number: sdjhk</Text>
                <Text style={styles.textStyle}>Date of Admission: DD/MM/YY</Text>
                <Text style={styles.textStyle}>Time of Admission: HH:MM</Text>
                <Text style={styles.textStyle}>Age: xx</Text>
                <Text style={styles.textStyle}>Gender: M/F/Others</Text> */}
            </SafeAreaView>
        )
    }
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

export default Profile;
