import { StyleSheet, Text, View, SafeAreaView, Picker, TextInput, Button, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
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

var today;
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

const Gcs = () => {
  const [age, setAge] = useState("");
  const [eye, setEye] = useState("-");
  const [motor, setMotor] = useState("-");
  const [verbal, setVerbal] = useState("-");
  const [c, setC] = useState(1);


  let sc = Number(eye.substring(0, 1)) + Number(motor.substring(0, 1)) + Number(verbal.substring(0, 1));
  let score = "GCS" + String(sc) + " = " + "E" + eye.substring(0, 1) + "V" + verbal.substring(0, 1) + "M" + motor.substring(0, 1)
  let flag = 0;
  if ((eye.substring(0, 1)) != '-' && (motor.substring(0, 1)) != '-' && (verbal.substring(0, 1)) != '-') {
    flag = 1;
  }

  let severity = "";
  if (sc >= 3 && sc <= 8) {
    severity = "severe";
  } else if (sc >= 9 && sc <= 12) {
    severity = "Moderate";
  } else if (sc >= 13 && sc <= 15) {
    severity = "Mild"
  }

  const onSubmit = (event) => {
    if (flag == 1) 
    {
      today = new Date()
      setC(0);
        const newGcs = {
          "P_id": GetP_id(),
          "a": age.toString(),
          "b": eye,
          "c": motor,
          "d": verbal,
          "e": score,
          "f": severity,
          "g": D_id,
          "h": formatDate(today.getDate())+"-"+formatDate(today.getMonth()+1)+"-"+today.getFullYear()+"   at  "+formatDate(today.getHours())+":"+formatDate(today.getMinutes())+":"+formatDate(today.getSeconds())
        }
  
        // console.log(newCrs)
        axios
          .post("http://localhost:4000/add/GCS", newGcs)
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
      .get("http://localhost:4000/get/GCS/" + GetP_id())
      .then((response) => {
        if ((response.data) != null && response.data.length == 1) {
          console.log(response.data[0])

          setAge(response.data[0].Age)
          setEye(response.data[0].EyeOpen)
          setMotor(response.data[0].Motor)
          setVerbal(response.data[0].Verbal)
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
      <Text style={styles.prism}>GlassGo Coma Scale (GCS)</Text>
      <View style={styles.dropContainer}>
        <Text style={styles.dropdownContent}>Age: </Text>
        <TextInput
          style={styles.input}
          placeholder="Age"
          onChangeText={setAge}
          value={age}
        />
      </View>
      <View style={[styles.container1]}>
        {Number(age) > 0 && Number(age) < 1 && (
          <View style={styles.dropContainer}>
            <Text style={styles.dropdownContent}>i.Eye Opening: </Text>
            <Picker
              selectedValue={eye}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue, itemIndex) => setEye(itemValue)}
            >
              <Picker.Item label="" value="-" />
              <Picker.Item label="Spontaneously" value="4Spontaneously" />
              <Picker.Item label="To shout" value="3To shout" />
              <Picker.Item label="To pain" value="2To pain" />
              <Picker.Item label="No response" value="1No response" />
            </Picker>
          </View>
        )}
        {Number(age) >= 1 && (
          <View style={styles.dropContainer}>
            <Text style={styles.dropdownContent}>i.Eye Opening: </Text>
            <Picker
              selectedValue={eye}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue, itemIndex) => setEye(itemValue)}
            >
              <Picker.Item label="" value="-" />
              <Picker.Item label="Spontaneously" value="4Spontaneously" />
              <Picker.Item label="To verbal Command" value="3To verbal Command" />
              <Picker.Item label="To pain" value="2To pain" />
              <Picker.Item label="No response" value="1No response" />
            </Picker>
          </View>
        )}
        {Number(age) > 0 && Number(age) < 1 && (
          <View style={styles.dropContainer}>
            <Text style={styles.dropdownContent}>ii.Best Motor Response: </Text>
            <Picker
              selectedValue={motor}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue, itemIndex) => setMotor(itemValue)}
            >
              <Picker.Item label="" value="-" />
              <Picker.Item label="Localises Pain" value="5Localises Pain" />
              <Picker.Item label="Flexion-withdrawl" value="4Flexion-withdrawl" />
              <Picker.Item
                label="Flexion-abnormal (decorticate rigidity)"
                value="3Flexion-abnormal (decorticate rigidity)"
              />
              <Picker.Item label="Extension (decerbrate rigidity)" value="2Extension (decerbrate rigidity)" />
              <Picker.Item label="No response" value="1No response" />
            </Picker>
          </View>
        )}
        {Number(age) >= 1 && (
          <View style={styles.dropContainer}>
            <Text style={styles.dropdownContent}>ii.Best Motor Response: </Text>
            <Picker
              selectedValue={motor}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue, itemIndex) => setMotor(itemValue)}
            >
              <Picker.Item label="" value="-" />
              <Picker.Item label="Obeys" value="6Obeys" />
              <Picker.Item label="Localises Pain" value="5Localises Pain" />
              <Picker.Item label="Flexion-withdrawl" value="4Flexion-withdrawl" />
              <Picker.Item
                label="Flexion-abnormal (decorticate rigidity)"
                value="3Flexion-abnormal (decorticate rigidity)"
              />
              <Picker.Item label="Extension (decerbrate rigidity)" value="2Extension (decerbrate rigidity)" />
              <Picker.Item label="No response" value="1No response" />
            </Picker>
          </View>
        )}
        {Number(age) > 0 && Number(age) < 2 && (
          <View style={styles.dropContainer}>
            <Text style={styles.dropdownContent}>
              iii.Best Verbal Response:{" "}
            </Text>
            <Picker
              selectedValue={verbal}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue, itemIndex) => setVerbal(itemValue)}
            >
              <Picker.Item label="" value="-" />
              <Picker.Item label="Smiles,coos,cries appropriately" value="5Smiles,coos,cries appropriately" />
              <Picker.Item label="Cries" value="4Cries" />
              <Picker.Item
                label="Inappropriate crying and/or screaming"
                value="3Inappropriate crying and/or screaming"
              />
              <Picker.Item label="Grunts" value="2Grunts" />
              <Picker.Item label="No response" value="1No response" />
            </Picker>
          </View>
        )}
        {Number(age) >= 2 && Number(age) < 5 && (
          <View style={styles.dropContainer}>
            <Text style={styles.dropdownContent}>
              iii.Best Verbal Response:{" "}
            </Text>
            <Picker
              selectedValue={verbal}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue, itemIndex) => setVerbal(itemValue)}
            >
              <Picker.Item label="" value="-" />
              <Picker.Item label="Appropriate words and phrases" value="5Appropriate words and phrases" />
              <Picker.Item label="Inappropriate words" value="4Inappropriate words" />
              <Picker.Item label="Cries and/or screams" value="3Cries and/or screams" />
              <Picker.Item label="Grunts" value="2Grunts" />
              <Picker.Item label="No response" value="1No response" />
            </Picker>
          </View>
        )}
        {Number(age) >= 5 && (
          <View style={styles.dropContainer}>
            <Text style={styles.dropdownContent}>
              iii.Best Verbal Response:{" "}
            </Text>
            <Picker
              selectedValue={verbal}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue, itemIndex) => setVerbal(itemValue)}
            >
              <Picker.Item label="" value="-" />
              <Picker.Item label="Oriented and converses" value="5Oriented and converses" />
              <Picker.Item label="Disoriented and converses" value="4Disoriented and converses" />
              <Picker.Item label="Inappropriate words" value="3Inappropriate words" />
              <Picker.Item label="Incomprehensible sounds" value="2Incomprehensible sounds" />
              <Picker.Item label="No response" value="1No response" />
            </Picker>
          </View>
        )}
      </View>
      {flag == 1 && (
        <View style={[styles.container2]}>
          <View>
            <Text style={styles.assessment}>
              Score: {score}
            </Text>
            <View>
              <Text style={styles.assessment}>Severity: {severity}</Text>
            </View>
          </View>
        </View>
      )}
      {c == 1 && (
        <View>
          <Pressable style={styles.submit}>
            <Button
              title="Add"

              onPress={onSubmit}
            >
              Add
            </Button>
          </Pressable>
        </View>)}
    </SafeAreaView>
  );
};

export default Gcs;

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