import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Picker,
  TextInput,
  Button,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";

function GetP_id() {
  var c = 0;
  var index = 0;
  var path = location.pathname;
  for (var i = 0; i < path.length; i++) {
    if (path.charAt(i) == "/") {
      c++;
    }
    if (c == 3) {
      index = i;
      break;
    }
    if (c == 2) {
      index = path.length;
    }
  }
  return path.substring(12, index);
}

var today;
var D_id="";
if(localStorage.getItem('user_data')!=null)
  D_id = (JSON.parse(localStorage.getItem('user_data'))).username

function formatDate(a){
  if(a<9){
    return "0"+a
  }else{
    return a;
  }
}

const Prism = () => {
  const [heartRate, setHeartRate] = useState("-");
  const [gcs, setGcs] = useState("");
  const [temperature, setTemperature] = useState("-");
  const [pupil, setPupil] = useState("-");
  const [acidpH, setAcidpH] = useState("-");
  const [alkalinepH, setAlkalinepH] = useState("-");
  const [pco2, setPco2] = useState("-");
  const [totalco2, setTotalco2] = useState("-");
  const [pao2, setPao2] = useState("-");
  const [plasma, setPlasma] = useState("-");
  const [serum, setSerum] = useState("-");
  const [creatinine, setCreatinine] = useState("-");
  const [urea, setUrea] = useState("-");
  const [wbc, setWbc] = useState("-");
  const [platelet, setPlatelet] = useState("-");
  const [ptt, setPtt] = useState("-");
  const [c, setC] = useState(1);
  const location = useLocation();
  let score =
    Number(gcs.substring(0, 2)) +
    Number(heartRate.substring(0, 2)) +
    Number(temperature.substring(0, 2)) +
    Number(pupil.substring(0, 2)) +
    Number(acidpH.substring(0, 2)) +
    Number(alkalinepH.substring(0, 2)) +
    Number(pco2.substring(0, 2)) +
    Number(pao2.substring(0, 2)) +
    Number(totalco2.substring(0, 2)) +
    Number(serum.substring(0, 2)) +
    Number(creatinine.substring(0, 2)) +
    Number(plasma.substring(0, 2)) +
    Number(urea.substring(0, 2)) +
    Number(wbc.substring(0, 2)) +
    Number(platelet.substring(0, 2)) +
    Number(ptt.substring(0, 2));

  let cardScore =
    Number(gcs.substring(0, 2)) +
    Number(heartRate.substring(0, 2)) +
    Number(temperature.substring(0, 2)) +
    Number(pupil.substring(0, 2));

  let bloodScore =
    Number(acidpH.substring(0, 2)) +
    Number(alkalinepH.substring(0, 2)) +
    Number(pco2.substring(0, 2)) +
    Number(pao2.substring(0, 2)) +
    Number(totalco2.substring(0, 2));

  let haemoScore =
    Number(wbc.substring(0, 2)) +
    Number(platelet.substring(0, 2)) +
    Number(ptt.substring(0, 2));

  let bioScore =
    Number(serum.substring(0, 2)) +
    Number(creatinine.substring(0, 2)) +
    Number(plasma.substring(0, 2)) +
    Number(urea.substring(0, 2));

  let flag = 0;
  if (
    heartRate.substring(0, 1) != "-" &&
    temperature.substring(0, 1) != "-" &&
    gcs.substring(0, 1) != "-" &&
    pupil.substring(0, 1) != "-" &&
    acidpH.substring(0, 1) != "-" &&
    alkalinepH.substring(0, 1) != "-" &&
    pco2.substring(0, 1) != "-" &&
    pao2.substring(0, 1) != "-" &&
    totalco2.substring(0, 1) != "-" &&
    serum.substring(0, 1) != "-" &&
    creatinine.substring(0, 1) != "-" &&
    plasma.substring(0, 1) != "-" &&
    urea.substring(0, 1) != "-" &&
    wbc.substring(0, 1) != "-" &&
    platelet.substring(0, 1) != "-" &&
    ptt.substring(0, 1) != "-"
  ) {
    flag = 1;
  }

  const onSubmit = (event) => {
    if (flag == 1) {
      today = new Date()
      setC(0);
      const newPrism = {
        P_id: GetP_id(),
        a: heartRate,
        b: gcs,
        c: temperature,
        d: pupil,
        e: cardScore,
        f: acidpH,
        g: alkalinepH,
        h: pco2,
        i: totalco2,
        j: pao2,
        k: bloodScore,
        l: plasma,
        m: serum,
        n: creatinine,
        o: urea,
        p: bioScore,
        q: wbc,
        r: platelet,
        s: ptt,
        t: haemoScore,
        u: score,
        v: D_id,
        w: formatDate(today.getDate())+"-"+formatDate(today.getMonth()+1)+"-"+today.getFullYear()+"   at  "+formatDate(today.getHours())+":"+formatDate(today.getMinutes())+":"+formatDate(today.getSeconds())
      };

      // console.log(newCrs)
      axios
        .post("http://localhost:4000/add/Prism", newPrism)
        .then((response) => {
          if (response.data != null) {
            alert("Added");
          } else {
            alert("Unable to add!");
          }
          // console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      alert("Fill all the details");
    }
  };

  function GetAssessment() {
    axios
      .get("http://localhost:4000/get/Prism/" + GetP_id())
      .then((response) => {
        if ((response.data) != null && response.data.length == 1) {
          // console.log(response.data[0])

          setHeartRate(response.data[0].Card_HR)
          setGcs(response.data[0].Card_GCS)
          setTemperature(response.data[0].Card_Temp)
          setPupil(response.data[0].Card_Pup)
          setAcidpH(response.data[0].AB_AcidPH)
          setAlkalinepH(response.data[0].AB_AlkPH)
          setPco2(response.data[0].AB_PCO2)
          setTotalco2(response.data[0].AB_TCO2)
          setPao2(response.data[0].AB_PaO2)
          setPlasma(response.data[0].BT_PG)
          setSerum(response.data[0].BT_SP)
          setCreatinine(response.data[0].BT_SC)
          setUrea(response.data[0].BT_BUN)
          setWbc(response.data[0].HT_WBC)
          setPlatelet(response.data[0].HT_PC)
          setPtt(response.data[0].HT_PTT)
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
      <Text style={styles.prism}>PRISM III</Text>
      <View style={[styles.container1]}>
        <View>
          <Text style={styles.assessment}>
            1.Cardiovascular and Neurological
          </Text>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>i.Heart Rate: </Text>
          <Picker
            selectedValue={heartRate}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setHeartRate(itemValue)}
          >
            <Picker.Item lable="" value="-" />
            <Picker.Item label="Neonate and <215" value="00Neonate and <215" />
            <Picker.Item
              label="Neonate and 215-225"
              value="03Neonate and 215-225"
            />
            <Picker.Item label="Neonate and >225" value="04Neonate and >225" />
            <Picker.Item label="Infant and <215" value="00Infant and <215" />
            <Picker.Item
              label="Infant and 215-225"
              value="03Infant and 215-225"
            />
            <Picker.Item label="Infant and >225" value="04Infant and >225" />
            <Picker.Item label="Child and <185" value="00Child and <185" />
            <Picker.Item
              label="Child and 185-205"
              value="03Child and 185-205"
            />
            <Picker.Item
              label="Child and >205 bpm"
              value="04Child and >205 bpm"
            />
            <Picker.Item
              label="Adolescent and <145 bpm"
              value="00Adolescent and <145 bpm"
            />
            <Picker.Item
              label="Adolescent and 145-155 bpm"
              value="03Adolescent and 145-155 bpm"
            />
            <Picker.Item
              label="Adolescent and > 155 bpm"
              value="04Adolescent and > 155 bpm"
            />
          </Picker>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>ii.GCS: </Text>
          <TextInput style={styles.input} onChangeText={setGcs} value={gcs} />
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>iii.Temperature: </Text>
          <Picker
            selectedValue={temperature}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setTemperature(itemValue)}
          >
            <Picker.Item lable="" value="-" />
            <Picker.Item label="<33" value="03<33" />
            <Picker.Item label="33-40" value="0033-40" />
            <Picker.Item label=">40" value="03>40" />
          </Picker>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>iv.Pupillary Response: </Text>
          <Picker
            selectedValue={pupil}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setPupil(itemValue)}
          >
            <Picker.Item lable="" value="-" />
            <Picker.Item label="Both reactive" value="00Both reactive" />
            <Picker.Item
              label="One reactive and (1 fixed and >3mm)"
              value="07One reactive and (1 fixed and >3mm)"
            />
            <Picker.Item
              label="Both fixed and both > 3mm"
              value="11Both fixed and both > 3mm"
            />
          </Picker>
        </View>
        <Text style={styles.subscore}>
          Cardiovascular and Neurological subscore: {cardScore}
        </Text>
      </View>
      <View style={[styles.container2]}>
        <View>
          <Text style={styles.assessment}>2.Acid-base and blood gas</Text>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>i.Acidic pH: </Text>
          <Picker
            selectedValue={acidpH}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setAcidpH(itemValue)}
          >
            <Picker.Item lable="" value="-" />
            <Picker.Item
              label="pH >7.28 and CO2 >= 17"
              value="00pH >7.28 and CO2 >= 17"
            />
            <Picker.Item
              label="pH 7.0-7.28 or total CO2 5-16.9"
              value="02pH 7.0-7.28 or total CO2 5-16.9"
            />
            <Picker.Item
              label="pH <7.0 and total CO2 <5"
              value="06pH <7.0 and total CO2 <5"
            />
          </Picker>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>ii. Alkaline pH: </Text>
          <Picker
            selectedValue={alkalinepH}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setAlkalinepH(itemValue)}
          >
            <Picker.Item lable="" value="-" />
            <Picker.Item label="<7.48" value="00<7.48" />
            <Picker.Item label="7.48-7.55" value="027.48-7.55" />
            <Picker.Item label=">7.55" value="03>7.55" />
          </Picker>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>iii.PCO2: </Text>
          <Picker
            selectedValue={pco2}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setPco2(itemValue)}
          >
            <Picker.Item lable="" value="-" />
            <Picker.Item label="<50" value="00<50" />
            <Picker.Item label="50-75" value="0150-75" />
            <Picker.Item label=">75" value="03>75" />
          </Picker>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>iv.Total CO2: </Text>
          <Picker
            selectedValue={totalco2}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setTotalco2(itemValue)}
          >
            <Picker.Item lable="" value="-" />
            <Picker.Item label="<=34" value="00<=34" />
            <Picker.Item label=">34" value="04>34" />
          </Picker>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>v: PaO2 </Text>
          <Picker
            selectedValue={pao2}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setPao2(itemValue)}
          >
            <Picker.Item lable="" value="-" />
            <Picker.Item label=">=50" value="00>=50" />
            <Picker.Item label="42-49.9" value="0342-49.9" />
            <Picker.Item label="<42" value="06<42" />
          </Picker>
        </View>
        <Text style={styles.subscore}>
          Acid-Base and blood gas subscore: {bloodScore}
        </Text>
      </View>
      <View style={[styles.container3]}>
        <View>
          <Text style={styles.assessment}>3.Biochemical Tests</Text>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>i.Plasma Glucose: </Text>
          <Picker
            selectedValue={plasma}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setPlasma(itemValue)}
          >
            <Picker.Item lable="" value="-" />
            <Picker.Item label="<=200" value="00<=200" />
            <Picker.Item label=">200" value="02>200" />
          </Picker>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>ii. Serum Potassium: </Text>
          <Picker
            selectedValue={serum}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setSerum(itemValue)}
          >
            <Picker.Item lable="" value="-" />
            <Picker.Item label="<=6.9" value="00<=6.9" />
            <Picker.Item label=">6.9" value="03>6.9" />
          </Picker>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>iii.Serum Creatinine: </Text>
          <Picker
            selectedValue={creatinine}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setCreatinine(itemValue)}
          >
            <Picker.Item lable="" value="-" />
            <Picker.Item
              label="Neonate and <=0.85"
              value="00Neonate and <=0.85"
            />
            <Picker.Item
              label="Neonate and >0.85"
              value="02Neonate and >0.85"
            />
            <Picker.Item
              label="Infant and >0.90 mg/dL"
              value="02Infant and >0.90 mg/dL"
            />
            <Picker.Item
              label="Child and <0.90 mg/dL"
              value="00Child and <0.90 mg/dL"
            />
            <Picker.Item
              label="Child and >0.90 mg/dL"
              value="02Child and >0.90 mg/dL"
            />
            <Picker.Item
              label="Adolescent and <=1.30 mg/dL"
              value="00Adolescent and <=1.30 mg/dL"
            />
            <Picker.Item
              label="Adolescent and >1.30 mg/dL"
              value="02Adolescent and >1.30 mg/dL"
            />
          </Picker>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>
            iv.Blood urea nitrogen (urea):{" "}
          </Text>
          <Picker
            selectedValue={urea}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setUrea(itemValue)}
          >
            <Picker.Item lable="" value="-" />
            <Picker.Item
              label="Neonate and <=11.9"
              value="00Neonate and <=11.9"
            />
            <Picker.Item
              label="Neonate and >11.9"
              value="03Neonate and >11.9"
            />
            <Picker.Item
              label="Neonate and <=14.9"
              value="00Neonate and <=14.9"
            />
            <Picker.Item
              label="Neonate and >14.9"
              value="03Neonate and >14.9"
            />
          </Picker>
        </View>
        <Text style={styles.subscore}>
          Biochemical Test subscore: {bioScore}
        </Text>
      </View>
      <View style={[styles.container4]}>
        <View>
          <Text style={styles.assessment}>4.Hematology Tests</Text>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>i.White Blood Cell count: </Text>
          <Picker
            selectedValue={wbc}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setWbc(itemValue)}
          >
            <Picker.Item lable="" value="-" />
            <Picker.Item label=">=3000" value="00>=3000" />
            <Picker.Item label="<3000" value="04<3000" />
          </Picker>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>ii. Platelet Count: </Text>
          <Picker
            selectedValue={platelet}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setPlatelet(itemValue)}
          >
            <Picker.Item lable="" value="-" />
            <Picker.Item label=">200,000" value="00>200,000" />
            <Picker.Item label="100,000-200,000" value="02100,000-200,000" />
            <Picker.Item label="50,000-99,999" value="0450,000-99,999" />
            <Picker.Item label="<50,000" value="05<50,000" />
          </Picker>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>iii.PTT and PT: </Text>
          <Picker
            selectedValue={ptt}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setPtt(itemValue)}
          >
            <Picker.Item lable="" value="-" />
            <Picker.Item
              label="Neonate and PT <=22s and PTT <=85s"
              value="00Neonate and PT <=22s and PTT <=85s"
            />
            <Picker.Item
              label="Neonate and PT >22s or PTT >85s"
              value="03Neonate and PT >22s or PTT >85s"
            />
            <Picker.Item
              label="Not neonate and PT<=22s and PTT <=57s"
              value="00Not neonate and PT<=22s and PTT <=57s"
            />
            <Picker.Item
              label="Not neonate and PT>22s or PTT >57s"
              value="03Not neonate and PT>22s or PTT >57s"
            />
          </Picker>
        </View>
        <Text style={styles.subscore}>
          Haemotology Test subscore: {haemoScore}
        </Text>
      </View>
      <View style={[styles.container5]}>
        <View>
          <Text style={styles.assessment}>PRISM Score:{score}</Text>
        </View>
      </View>
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

export default Prism;

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
  },
});