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

const OI = () => {
  const [MAP, setMAP] = useState("");
  const [fio2, setFio2] = useState("");
  const [pao2, setPao2] = useState("");

  const [c, setC] = useState(1)
  const location = useLocation()
  let score = 0;
  let flag = 0;
  let pf = 0;
  let pfSevere = "";
  let oiSevere = "";
  if (Number(MAP) > 0 && Number(fio2) > 0 && Number(pao2) > 0) {
    flag = 1;
    pf = Number(pao2) / Number(fio2);
    if (pf > 200 && pf <= 300) {
      pfSevere = "Acute Lung Injury (ALI) with Mild Acute Respiratory Distress syndrome (ARDS)"
    }
    else if (pf > 100 && pf <= 200) {
      pfSevere = "Moderate Acute Respiratory Distress syndrome (ARDS)"
    }
    else if (pf <= 100) {
      pfSevere = "Severe Acute Respiratory Distress syndrome (ARDS)"
    }
    score = Number(MAP) / pf;
    if (score < 4) {
      oiSevere = "Severity: At risk for pediatric ARDS"
    }
    else if (score >= 4 && score < 8) {
      oiSevere = "Severity: Mild pediatric ARDS"
    }
    else if (score >= 8 && score < 16) {
      oiSevere = "Severity: Moderate pediatric ARDS"
    }
    else if (score >= 16) {
      oiSevere = "Severity: Severe pediatric ARDS"
    }
  }

  const onClickAdd = (event) => {
    if (flag == 1) {
      today = new Date()
      setC(0);
      const newOI = {
        "P_id": GetP_id(),
        "a": MAP,
        "b": fio2,
        "c": pao2,
        "d": pf,
        "e": pfSevere,
        "f": score,
        "g": oiSevere,
        "h": D_id,
        "i": formatDate(today.getDate())+"-"+formatDate(today.getMonth()+1)+"-"+today.getFullYear()+"   at  "+formatDate(today.getHours())+":"+formatDate(today.getMinutes())+":"+formatDate(today.getSeconds())
      }

      // console.log(newCrs)
      axios
        .post("http://localhost:4000/add/OI", newOI)
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
      .get("http://localhost:4000/get/OI/" + GetP_id())
      .then((response) => {
        if ((response.data) != null && response.data.length == 1) {
          console.log(response.data)
          setMAP(response.data[0].MAP)
          setFio2(response.data[0].FIO2)
          setPao2(response.data[0].PACO2)
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
      <Text style={styles.prism}>Oxygenation Index(OI)</Text>
      <View style={[styles.container1]}>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>MAP: </Text>
          <TextInput
            style={styles.input}
            placeholder="MAP"
            onChangeText={setMAP}
            value={MAP}
          />
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>FiO2: </Text>
          <TextInput
            style={styles.input}
            placeholder="FiO2"
            onChangeText={setFio2}
            value={fio2}
          />
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>PaO2: </Text>
          <TextInput
            style={styles.input}
            placeholder="PaO2"
            onChangeText={setPao2}
            value={pao2}
          />
        </View>
      </View>
      {flag == 1 && (
        <View style={[styles.container2]}>
          <View>
            <Text style={styles.assessment}>
              pf Ratio = {pf}
            </Text>
            {pf > 200 && pf <= 300 &&
              <Text style={styles.assessment}>
                Acute Lung Injury (ALI) with Mild Acute Respiratory Distress syndrome (ARDS)
              </Text>
            }
            {pf > 100 && pf <= 200 &&
              <Text style={styles.assessment}>
                Moderate Acute Respiratory Distress syndrome (ARDS)
              </Text>
            }
            {pf <= 100 &&
              <Text style={styles.assessment}>
                Severe Acute Respiratory Distress syndrome (ARDS)
              </Text>
            }
            <Text style={styles.assessment}>
              OI = {score}
            </Text>
            {score < 4 &&
              <Text style={styles.assessment}>
                Severity: At risk for pediatric ARDS
              </Text>
            }
            {score >= 4 && score < 8 &&
              <Text style={styles.assessment}>
                Severity: Mild pediatric ARDS
              </Text>
            }
            {score >= 8 && score < 16 &&
              <Text style={styles.assessment}>
                Severity: Moderate pediatric ARDS
              </Text>
            }
            {score >= 16 &&
              <Text style={styles.assessment}>
                Severity: severe pediatric ARDS
              </Text>
            }
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
};
export default OI;

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
