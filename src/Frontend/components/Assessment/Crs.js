import { StyleSheet, Text, View, SafeAreaView, Picker, TextInput, Button, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from 'axios';

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

var today
var D_id=""
if(localStorage.getItem('user_data')!=null)
  D_id = (JSON.parse(localStorage.getItem('user_data'))).username

function formatDate(a){
  if(a<9){
    return "0"+a
  }else{
    return a;
  }
}

const Crs = () => {
  const [Respiratory, setRespiratory] = useState("");
  const [auscultation, setAuscultation] = useState("");
  const [muscles, setMuscles] = useState("");
  const [mental, setMental] = useState("");
  const [room, setRoom] = useState("");
  const [color, setColor] = useState("");
  const location = useLocation()
  const [c, setC] = useState(1);

  let score = Number(Respiratory.substring(0, 1)) + Number(auscultation.substring(0, 1)) + Number(muscles.substring(0, 1)) + Number(mental.substring(0, 1)) + Number(room.substring(0, 1)) + Number(color.substring(0, 1));
  let flag = 0
  if ((Respiratory.substring(0, 1)) != '-' && Respiratory.length != 0 && (auscultation.substring(0, 1)) != '-' && auscultation.length != 0 && (muscles.substring(0, 1)) != '-' && muscles.length != 0 && (mental.substring(0, 1)) != '-' && mental.length != 0 && (room.substring(0, 1)) != '-' && room.length != 0 && color.length != 0 && (color.substring(0, 1)) != '-') {
    flag = 1;
  }

  const onClickAdd = (event) => {
    if (flag == 1) {
      setC(0);
      today = new Date()
      const newCrs = {
        "P_id": GetP_id(),
        "RespRate": Respiratory,
        "Ausc": auscultation,
        "AccessMuscle": muscles,
        "MentalStat": mental,
        "SPO2_room": room,
        "Color": color,
        "Score": score,
        "D_id": D_id,
        "Time": formatDate(today.getDate())+"-"+formatDate(today.getMonth()+1)+"-"+today.getFullYear()+"   at  "+formatDate(today.getHours())+":"+formatDate(today.getMinutes())+":"+formatDate(today.getSeconds())
      }

      // console.log(newCrs)
      axios
        .post("http://localhost:4000/add/CRS", newCrs)
        .then((response) => {
          if ((response.data) != null) {
            alert("Added");
          }
          else {
            alert("Unable to add!");

          }
          // console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    else {
      alert("Fill all the details");
    }
  }
  function GetAssessment() {
    axios
      .get("http://localhost:4000/get/CRS/" + GetP_id())
      .then((response) => {
        if ((response.data) != null && response.data.length == 1) {
          console.log(response.data[0])
          setRespiratory(response.data[0].RespRate)
          setAuscultation(response.data[0].Ausc)
          setMuscles(response.data[0].AccessMuscle)
          setMental(response.data[0].MentalStat)
          setRoom(response.data[0].SpO2_Room)
          setColor(response.data[0].Color)
        }
        else {
          alert("Unable to get previous data!");

        }
        // console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  useEffect(() => {
    // console.log("api")
    if (localStorage.getItem('user_data') == null) {
      alert("Unauthorised Access")
      navigate("/")
    }
    GetAssessment();
  }, []);
  return (
    <SafeAreaView>
      <Text style={styles.prism}>Clinical Respiratory Score (CRS)</Text>
      <View style={[styles.container1]}>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>i.Respiratory Rate: </Text>
          <Picker
            selectedValue={Respiratory}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setRespiratory(itemValue)}
          >
            <Picker.Item label="" value={"-"} />
            <Picker.Item label="Age 1-5 years: <30" value={"0Age 1-5 years: <30"} />
            <Picker.Item label="Age 1-5 years: 30-40" value={"1Age 1-5 years: 30-40"} />
            <Picker.Item label="Age 1-5 years: >40" value={"2Age 1-5 years: >40"} />
            <Picker.Item label="Age > 5 years: <20" value={"0Age > 5 years: <20"} />
            <Picker.Item label="Age > 5 years: 20-30" value={"1Age > 5 years: 20-30"} />
            <Picker.Item label="Age > 5 years: >30" value={"2Age > 5 years: >30"} />
          </Picker>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>ii.Auscultation: </Text>
          <Picker
            selectedValue={auscultation}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setAuscultation(itemValue)}
          >
            <Picker.Item label="" value={"-"} />
            <Picker.Item label="Good air movement, Expiratory scattered wheezing or loose rales/crackles" value={"0Good air movement, Expiratory scattered wheezing or loose rales/crackles"} />
            <Picker.Item label="Depressed air movement, inspiratory and expiratory wheezes or rales/crackles" value={"1Depressed air movement, inspiratory and expiratory wheezes or rales/crackles"} />
            <Picker.Item label="Diminished or absent breath sounds, severe wheezing or rales/crackles or marked prolonged expiration" value={"3Diminished or absent breath sounds, severe wheezing or rales/crackles or marked prolonged expiration"} />
          </Picker>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>iii. Use of Accessory Muscles: </Text>
          <Picker
            selectedValue={muscles}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setMuscles(itemValue)}
          >
            <Picker.Item label="" value={"-"} />
            <Picker.Item label="Mild to no use of accessory muscles, Mild to no retractions or nasal flaring on inspiration" value={"0Mild to no use of accessory muscles, Mild to no retractions or nasal flaring on inspiration"} />
            <Picker.Item
              label="Moderate intercostal retractions, mild to moderate use of accessory muscles, nasal flaring"
              value={"1Moderate intercostal retractions, mild to moderate use of accessory muscles, nasal flaring"}
            />
            <Picker.Item label="Severe intercostal and substernal retractions, nasal flaring" value={"2Severe intercostal and substernal retractions, nasal flaring"} />
          </Picker>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>iv. Mental status: </Text>
          <Picker
            selectedValue={mental}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setMental(itemValue)}
          >
            <Picker.Item label="" value={"-"} />
            <Picker.Item label="Normal to Mildly irratable" value={"0Normal to Mildly irratable"} />
            <Picker.Item
              label="Irritable, agitated restless"
              value={"1Irritable, agitated restless"}
            />
            <Picker.Item label="Lethargic" value={"2Lethargic"} />
          </Picker>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>v.Room Air SpO2: </Text>
          <Picker
            selectedValue={room}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setRoom(itemValue)}
          >
            <Picker.Item label="" value={"-"} />
            <Picker.Item label=">95%" value={"0>95%"} />
            <Picker.Item
              label="90-95%"
              value={"190-95%"}
            />
            <Picker.Item label="<90%" value={"2<90%"} />
          </Picker>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>vi.Color: </Text>
          <Picker
            selectedValue={color}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setColor(itemValue)}
          >
            <Picker.Item label="" value={"-"} />
            <Picker.Item label="Normal" value={"0Normal"} />
            <Picker.Item
              label="Pale to Normal"
              value={"1Pale to Normal"}
            />
            <Picker.Item label="Cyanotic, Dusky" value={"2Cyanotic, Dusky"} />
          </Picker>
        </View>
      </View>
      {flag == 1 && (
        <View style={[styles.container5]}>
          <View>
            <Text style={styles.assessment}>
              Score: {score}
            </Text>
            {score <= 3 && (
              <Text style={styles.assessment}>Severity: Mild</Text>
            )}
            {score >= 4 && score <= 7 && (
              <Text style={styles.assessment}>Severity: Moderate</Text>
            )}
            {score >= 8 && score <= 12 && (
              <Text style={styles.assessment}>Severity: Severe</Text>
            )}
          </View>
        </View>
      )}
      {c == 1 && (
        <Pressable style={styles.submit}>
          <Button
            title="Add"

            onPress={onClickAdd}
          >
            Add
          </Button>
        </Pressable>)}
    </SafeAreaView>
  );
}

export default Crs

const styles = StyleSheet.create({
  prism: {
    fontSize: 50,
    fontWeight: "bold",
    textAlign: "center",
  },
  assessment: {
    marginTop: 20,
    fontSize: 30,
    fontWeight: "bold",
  },
  dropContainer: {
    flexDirection: "row",
    marginBottom: 20,
    marginTop: 10,
  },
  dropdownContent: {
    fontSize: 20,
    marginTop: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 200,
  },
  text: {
    fontWeight: "bold",
  },
  container1: {
    backgroundColor: "#f0ffff",
    paddingLeft: 20,
    borderWidth: 2,
    margin: 5,
  },
  container2: {
    backgroundColor: "#fffacd",
    paddingLeft: 20,
    borderWidth: 2,
    margin: 5,
  },
  container3: {
    backgroundColor: "#ffb6c1",
    paddingLeft: 20,
    borderWidth: 2,
    margin: 5,
  },
  container4: {
    backgroundColor: "#f5f5dc",
    paddingLeft: 20,
    borderWidth: 2,
    margin: 5,
  },
  container5: {
    backgroundColor: "#dda0dd",
    paddingLeft: 20,
    borderWidth: 2,
    margin: 5,
  },
  subscore: {
    fontWeight: "bold",
    borderWidth: 1,
    backgroundColor: "#fff",
    margin: 10,
    padding: 4,
    fontSize: 20,
  },
  submit: {
    borderWidth: 2,
    backgroundColor: "#56BF9C",
    margin: 10,
    padding: 7,
    width: 90,
  }
});