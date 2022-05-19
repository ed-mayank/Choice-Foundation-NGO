import React, { useContext, useEffect, useState } from "react";
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
    TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
function ReviewDetails(props) {
    const { patient } = props;
    const [str, setStr] = useState("");

    const navigate = useNavigate();
    return (
        <View style={styles.card}>
            <View style={styles.cardContent}>
                <Text>Patient ID : {patient.P_id}</Text>
            </View>
            <View style={styles.cardContent}>
                <Text>Last Updated By : {patient.D_id}</Text>
            </View>
            <View style={styles.cardContent}>
                <Text>Last Updated on : {patient.Time}</Text>
                <Text>
                    <Pressable>
                        <Icon.Button
                            // name="profile"
                            style={styles.buttonOpen}
                            onPress={() => {
                                // setStr("/Patient_id/" + String(patient.P_ID))
                                navigate("/Patient_id/" + String(patient.P_id));
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

const Reminder = (props) => {
    const [GCS_List, setGCS_List] = useState([]);
    const [CRS_List, setCRS_List] = useState([]);
    const [CRS, setCRS] = useState([]);
    const [Prism_List, setPrism_List] = useState([]);
    const [Prism, setPrism] = useState([]);
    const [PSofa_List, setPSofa_List] = useState([]);
    const [PSofa, setPSofa] = useState([]);
    const [OI_List, setOI_List] = useState([]);
    const [OI, setOI] = useState([]);
    const [API_List, setAPI_List] = useState([]);
    const [API, setAPI] = useState([]);

    function dateCondition(a, b) {
        if (a == null) return false;
        var dd = Number(a.substring(0, 2));
        var hh = Number(a.substring(17, 19));
        var mm = Number(a.substring(20, 22));
        var ss = Number(a.substring(23, 25));

        var curr = new Date();
        var cDD = curr.getDate();
        var cHH = curr.getHours();
        var cMM = curr.getMinutes();
        var cSS = curr.getSeconds();

        if (b == "Triage") {
            return false;
        }
        if (b == "GCS" || b == "CRS" || b == "OI" || b == "API") {
            if (cDD == dd) {
                if (cHH - hh > 4) {
                    return true;
                } else if (cHH - hh < 4) {
                    return false;
                } else {
                    if (cMM < mm) {
                        return false;
                    } else {
                        return true;
                    }
                }
            } else {
                if (24 - hh + cHH > 4) {
                    return true;
                } else if (24 - hh + cHH < 4) {
                    return false;
                } else {
                    if (cMM < mm) {
                        return false;
                    } else {
                        return true;
                    }
                }
            }
        }
        if (b == "PSofa") {
            if (cDD == dd) {
                if (cHH - hh > 6) {
                    return true;
                } else if (cHH - hh < 6) {
                    return false;
                } else {
                    if (cMM < mm) {
                        return false;
                    } else {
                        return true;
                    }
                }
            } else {
                if (24 - hh + cHH > 6) {
                    return true;
                } else if (24 - hh + cHH < 6) {
                    return false;
                } else {
                    if (cMM < mm) {
                        return false;
                    } else {
                        return true;
                    }
                }
            }
        }
        if (b == "Prism") {
            if (cDD == dd) {
                return false;
            } else {
                if (24 - hh + cHH > 24) {
                    return true;
                } else if (24 - hh + cHH < 24) {
                    return false;
                } else {
                    if (cMM < mm) {
                        return false;
                    } else {
                        return true;
                    }
                }
            }
        }
    }

    function GetLists() {
        axios
            .get("http://localhost:4000/get/GCSReq")
            .then((response) => {
                if (response.data != null) {
                    let t = [];

                    for (var i = 0; i < response.data.length; i++) {
                        t.push(response.data[i]);
                    }
                    axios
                        .get("http://localhost:4000/get/GCS")
                        .then((response) => {
                            if (response.data != null) {
                                let temp = [];
                                for (var i = 0; i < response.data.length; i++) {
                                    let check = 0
                                    for (var j = 0; j < t.length; j++) {
                                        if (t[j].id == response.data[i].GCS_id) {
                                            check = 1
                                        }
                                    }
                                    if (dateCondition(response.data[i].Time, "GCS") && check == 1) {
                                        temp.push(response.data[i]);
                                    }
                                }
                                setGCS_List(temp);
                            } else {
                                alert("Unable to get GCS data!");
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });

                } else {
                    alert("Unable to get GCS data!");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        axios
            .get("http://localhost:4000/get/CRSReq")
            .then((response) => {
                if (response.data != null) {
                    let t = [];

                    for (var i = 0; i < response.data.length; i++) {
                        t.push(response.data[i]);
                    }
                    axios
                        .get("http://localhost:4000/get/CRS")
                        .then((response) => {
                            if (response.data != null) {
                                let temp = [];
                                for (var i = 0; i < response.data.length; i++) {
                                    let check = 0
                                    for (var j = 0; j < t.length; j++) {
                                        if (t[j].id == response.data[i].CRS_id) {
                                            check = 1
                                        }
                                    }
                                    if (dateCondition(response.data[i].Time, "CRS") && check == 1) {
                                        temp.push(response.data[i]);
                                    }
                                }
                                setCRS_List(temp);
                            } else {
                                alert("Unable to get CRS data!");
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });

                } else {
                    alert("Unable to get CRS data!");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
            axios
            .get("http://localhost:4000/get/PrismReq")
            .then((response) => {
                if (response.data != null) {
                    let t = [];

                    for (var i = 0; i < response.data.length; i++) {
                        t.push(response.data[i]);
                    }
                    axios
                        .get("http://localhost:4000/get/Prism")
                        .then((response) => {
                            if (response.data != null) {
                                let temp = [];
                                for (var i = 0; i < response.data.length; i++) {
                                    let check = 0
                                    for (var j = 0; j < t.length; j++) {
                                        if (t[j].id == response.data[i].Prism_id) {
                                            check = 1
                                        }
                                    }
                                    if (dateCondition(response.data[i].Time, "Prism") && check == 1) {
                                        temp.push(response.data[i]);
                                    }
                                }
                                setPrism_List(temp);
                            } else {
                                alert("Unable to get Prism data!");
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });

                } else {
                    alert("Unable to get Prism data!");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
            axios
            .get("http://localhost:4000/get/PSofaReq")
            .then((response) => {
                if (response.data != null) {
                    let t = [];

                    for (var i = 0; i < response.data.length; i++) {
                        t.push(response.data[i]);
                    }
                    axios
                        .get("http://localhost:4000/get/PSofa")
                        .then((response) => {
                            if (response.data != null) {
                                let temp = [];
                                for (var i = 0; i < response.data.length; i++) {
                                    let check = 0
                                    for (var j = 0; j < t.length; j++) {
                                        if (t[j].id == response.data[i].PSofa_id) {
                                            check = 1
                                        }
                                    }
                                    if (dateCondition(response.data[i].Time, "PSofa") && check == 1) {
                                        temp.push(response.data[i]);
                                    }
                                }
                                setPSofa_List(temp);
                            } else {
                                alert("Unable to get PSofa data!");
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });

                } else {
                    alert("Unable to get PSofa data!");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
            axios
            .get("http://localhost:4000/get/OIReq")
            .then((response) => {
                if (response.data != null) {
                    let t = [];

                    for (var i = 0; i < response.data.length; i++) {
                        t.push(response.data[i]);
                    }
                    axios
                        .get("http://localhost:4000/get/OI")
                        .then((response) => {
                            if (response.data != null) {
                                let temp = [];
                                for (var i = 0; i < response.data.length; i++) {
                                    let check = 0
                                    for (var j = 0; j < t.length; j++) {
                                        if (t[j].id == response.data[i].OI_id) {
                                            check = 1
                                        }
                                    }
                                    if (dateCondition(response.data[i].Time, "OI") && check == 1) {
                                        temp.push(response.data[i]);
                                    }
                                }
                                setOI_List(temp);
                            } else {
                                alert("Unable to get OI data!");
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });

                } else {
                    alert("Unable to get OI data!");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
            axios
            .get("http://localhost:4000/get/APIReq")
            .then((response) => {
                if (response.data != null) {
                    let t = [];

                    for (var i = 0; i < response.data.length; i++) {
                        t.push(response.data[i]);
                    }
                    axios
                        .get("http://localhost:4000/get/API")
                        .then((response) => {
                            if (response.data != null) {
                                let temp = [];
                                for (var i = 0; i < response.data.length; i++) {
                                    let check = 0
                                    for (var j = 0; j < t.length; j++) {
                                        if (t[j].id == response.data[i].API_id) {
                                            check = 1
                                        }
                                    }
                                    if (dateCondition(response.data[i].Time, "API") && check == 1) {
                                        temp.push(response.data[i]);
                                    }
                                }
                                setAPI_List(temp);
                            } else {
                                alert("Unable to get API data!");
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });

                } else {
                    alert("Unable to get API data!");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    useEffect(() => {
        if (localStorage.getItem("user_data") == null) {
            alert("Unauthorised Access");
            navigate("/");
        }

        GetLists();
    }, []);

    const navigate = useNavigate();


    return (
        <SafeAreaView>
            <View>
                <View>
                    <Text style={styles.text}>
                        {" "}
                        Following Patients requires reassessment for GCS:
                    </Text>
                </View>
                {GCS_List.map((gcs) => {
                    return <ReviewDetails key={gcs.P_id} patient={gcs} />;
                })}
            </View>
            <View>
                <View>
                    <Text style={styles.text}>
                        Following Patients requires reassessment for CRS:
                    </Text>
                </View>
                {CRS_List.map((gcs) => {
                    return <ReviewDetails key={gcs.P_id} patient={gcs} />;
                })}
            </View>
            <View>
                <View>
                    <Text style={styles.text}>
                        Following Patients requires reassessment for Prism:
                    </Text>
                </View>
                {Prism_List.map((gcs) => {
                    return <ReviewDetails key={gcs.P_id} patient={gcs} />;
                })}
            </View>
            <View>
                <View>
                    <Text style={styles.text}>
                        Following Patients requires reassessment for PSofa:
                    </Text>
                </View>
                {PSofa_List.map((gcs) => {
                    return <ReviewDetails key={gcs.P_id} patient={gcs} />;
                })}
            </View>
            <View>
                <View>
                    <Text style={styles.text}>
                        Following Patients requires reassessment for OI:
                    </Text>
                </View>
                {OI_List.map((gcs) => {
                    return <ReviewDetails key={gcs.P_id} patient={gcs} />;
                })}
            </View>
            <View>
                <View>
                    <Text style={styles.text}>
                        Following Patients requires reassessment for API:
                    </Text>
                </View>
                {API_List.map((gcs) => {
                    return <ReviewDetails key={gcs.P_id} patient={gcs} />;
                })}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 5,
        paddingBottom: 5,
    },
    container1: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
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
            height: 5,
        },
        shadowOpacity: 0.75,
        shadowRadius: 4,
        elevation: 15,
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
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
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
        strokeWidth: "1",
    },
    searchIcon: {
        padding: 5,
    },
    card: {
        borderRadius: 6,
        elevation: 3,
        backgroundColor: "#fff",
        shadowOffset: { width: -2, height: -3 },
        shadowColor: "#56BF9C",
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
        alignContent: "center",
        backgroundColor: "#56BF9C",
        paddingTop: 3,
    },
    text: {
        fontSize: 40,
        fontWeight: "bold",
        padding: 9,
    },
});

export default Reminder;
