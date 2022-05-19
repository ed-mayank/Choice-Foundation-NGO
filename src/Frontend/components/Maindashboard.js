import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
    Alert,
    Button,
    ImageBackground,
    StyleSheet,
    Modal,
    Text,
    Pressable,
    View,
    SafeAreaView,
    TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ReviewDetails from './ReviewDetails';


const Maindashboard = (props) => {
    // const context = useContext(PatientContext);
    // const { patients, addPatient } = context;
    const initialPatients = [];
    // const patient_List = [];
    const [patient_List, setPatient_List] = useState(initialPatients);
    const [patients, setPatients] = useState(initialPatients);
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
        setPatients(p_list);
        setPatient_List(p_list);
    }
    useEffect(() => {
        if (localStorage.getItem('user_data') == null) {
            alert("Unauthorised Access")
            navigate("/")
        }
        console.log("api")
        patientsList();
    }, []);

    const navigate = useNavigate();

    const [modalVisible, setModalVisible] = useState(false);
    const [name, onChangeName] = useState("");
    // const [age, onChangeAge] = useState("")
    const [gender, onChangeGender] = useState("")
    const [patientIp, onChangePatientIp] = useState("")
    const [date, onChangeDate] = useState("");
    const [time, onChangeTime] = useState("");
    const [open, setOpen] = useState(false);

    const resetInputs = () => {
        onChangeName("");
        // onChangeAge("");
        onChangeGender("");
        onChangePatientIp("");
        onChangeDate("");
        onChangeTime("");
    };

    const addPatient = async (patientName, gender, patientID,
        createDateTime, emailId, address, city, stateCountry,
        pincode, country, status, title) => {

        console.log(JSON.stringify({
            patientName, gender, age, patientID,
            createDateTime, emailId, address, city, stateCountry,
            pincode, country, status, title
        }))
        const response = await fetch('https://devapi.igzolt.in/index.php/v1/patient/registerPatient', {
            mode: 'cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                patientName, gender, patientID,
                createDateTime, emailId, address, city, stateCountry,
                pincode, country, status, title
            })
        }).catch((e) => {
            console.log(e)
        })
        const data = await response.json();
        console.log(data);
    }

    const onSubmit = (event) => {
        setModalVisible(!modalVisible)
        event.preventDefault();

        const newPatient = {
            patientName: name,
            // age: age,
            gender: gender,
            patientID: patientIp,
            createDateTime: date + " " + time,
            // date: date,
            // time: time,
            // createDateTime: "2022-04-18 10:24:28",

            address: "",
            emailId: "",
            city: "",
            stateCountry: "",
            pincode: "",
            country: "INDIA",
            status: "",
            title: ""

            // createId: "",
            // dateOfBirth: "2015-04-17",
            // familyGroupId: "",
            // familyGroupRegistration: "",
            // identityIdNr: "",
            // identityType: "",
            // mobileNumber: 999999999,
            // nextOfKin1Mobilenr: null,
            // nextOfKin1Name: "",
            // nextOfKin1Relation: "",
            // nextOfKinMobilenr: 999999999,
            // nextOfKinName: "Ramu",
            // nextOfKinRelation: "Father",
            // patientID: 0,
            // firstName: "",
            // lastName: "",
            // permanentHomeAddress: "",
            // regDate: "2022-04-18"

        }
        console.log(newPatient);

        // post patient to backend
        addPatient(
            newPatient.patientName,
            // newPatient.age,
            newPatient.gender,
            newPatient.patientID,
            newPatient.createDateTime,
            // newPatient.date,
            // newPatient.time,
            newPatient.address,

            newPatient.emailId,

            newPatient.city,
            newPatient.stateCountry,
            newPatient.pincode,
            newPatient.country,
            newPatient.status,
            newPatient.title
        );
        resetInputs();
    };

    // for fuzzy search
    const [searchData, setSearchData] = useState(patients);
    const searchItem = (query) => {
        if (!query) {
            setPatients(patient_List);
            return;
        }
        const finalResult = [];
        patient_List.forEach((item) => {
            if (
                item.P_ID.indexOf(query) !== -1
            ) {
                finalResult.push(item);
            }
        });
        setPatients(finalResult);
    };

    return (
        <SafeAreaView >
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
            >
                <View
                    style={styles.centeredView}
                >
                    <Text>Patient Name</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeName}
                        value={name}
                        placeholder="Patient Name"
                        keyboardType="ascii-capable"
                    />
                    {/* <Text>Age</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeAge}
                        value={age}
                        placeholder="Patient Age"
                        keyboardType="numeric"
                    /> */}
                    <Text>Gender</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeGender}
                        value={gender}
                        placeholder="Gender"
                        keyboardType="ascii-capable"
                    />
                    <Text>Patient IP</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangePatientIp}
                        value={patientIp}
                        placeholder="Patient IP"
                        keyboardType="ascii-capable"
                    />
                    <Text>Time of Admission(YYYY-MM-DD)</Text>
                    <TextInput
                        style={styles.input}
                        format="DD-MM-YYYY"
                        onChangeText={onChangeDate}
                        value={date}
                        placeholder="Date of Admission(YYYY-MM-DD)"
                        keyboardType="decimal-pad"
                    />
                    <Text>Time of Admission(HH:MM:SS)</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeTime}
                        value={time}
                        placeholder="Time of Admission"
                        keyboardType="decimal-pad"
                    />
                    <View style={styles.container1}>
                        <Pressable>
                            <Icon.Button
                                // name="plus"
                                // title="submit"
                                style={styles.buttonOpen}
                                onPress={onSubmit}
                            >
                                Register
                            </Icon.Button>
                        </Pressable>

                        <Pressable>
                            <Icon.Button
                                // name="search"
                                // title="Cancel"
                                style={styles.buttonOpen}
                                onPress={() => setModalVisible(false)}
                            >
                                Cancel
                            </Icon.Button>
                        </Pressable>
                    </View>

                </View>
            </Modal >
            <View style={styles.container}>
                <Text>
                    <Pressable>
                        <Icon.Button
                            name="plus"
                            style={styles.buttonOpen}
                            onPress={() => setModalVisible(true)}
                        >
                            Add New Patient
                        </Icon.Button>
                    </Pressable>
                </Text>

            </View>
            <View style={styles.container}>
            <View style={styles.container1}>
                <Icon
                    style={styles.searchIcon}
                    name="search"
                    size={20}
                    color="#56BF9C"
                />
                <TextInput
                    inlineImageLeft='search_icon'
                    style={styles.buttonfuzzySearch}
                    type="search"
                    placeholder="  Search Patient By ID"
                    onChange={(e) => searchItem(e.target.value)}
                />
            </View>
            </View>


            {patients.map((patient) => {
                return < ReviewDetails key={patient.P_ID} patient={patient} />
            })
            }
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 5,
        paddingBottom: 5,
    },
    container1: {
        flex: 1,
        flexDirection: 'row',
        // justifyContent: 'flex-end',
        // paddingTop: 5,
        // paddingBottom: 5,
    },
    centeredView: {
        flex: 1,
        margin: 50,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 15,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5
        },
        shadowOpacity: 0.75,
        shadowRadius: 4,
        elevation: 15
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    buttonOpen: {
        backgroundColor: "#56BF9C",
    },
    buttonOpen1: {
        backgroundColor: "#56BF9C",
        padding: 4,
        // borderRadius: 30
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 5,
    },
    buttonfuzzySearch: {
        borderWidth: 2,
        borderRadius: 8,
        borderColor: "#56BF9C",
        strokeWidth: "1"
    },
    searchIcon: {
        padding: 5
    }
});

export default Maindashboard;
