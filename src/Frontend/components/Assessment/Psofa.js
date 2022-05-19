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
const Psofa = () => {
  const [platelet, setPlatelet] = useState("-")
  const [bilirubin, setBilirubin] = useState("-")
  const [gcs, setGcs] = useState("-")
  const [renal, setRenal] = useState("-")
  const [age, setAge] = useState("-")
  const [selectFlag, setSelectFlag] = useState("-")
  const [cardio, setCardio] = useState("-")
  const [vaso, setVaso] = useState("-")
  const [respiratory, setRespiratory] = useState("-")
  const [c, setC] = useState(1);
  const location = useLocation();
  let score;
  let cardioScore = cardio;
  if (vaso != "-") {
    cardioScore = vaso
  }
  let flag = 0
  if ((respiratory != '-' && platelet != '-' && bilirubin != '-' && gcs != '-' && renal != '-' && cardioScore != '-')) {
    flag = 1
    score = Number(respiratory.substring(0, 1)) + Number(platelet.substring(0, 1)) + Number(bilirubin.substring(0, 1)) + Number(gcs.substring(0, 1)) + Number(renal.substring(0, 1)) + Number(cardioScore.substring(0, 1))
  }

  const onClickAdd = (event) => {
    if (flag == 1) {
      today = new Date()
      setC(0);
      const newPSofa = {
        P_id: GetP_id(),
        a: selectFlag,
        b: respiratory,
        c: platelet,
        d: bilirubin,
        e: age,
        f: cardio,
        g: vaso,
        h: gcs,
        i: renal,
        j: score,
        k: D_id,
        l: formatDate(today.getDate())+"-"+formatDate(today.getMonth()+1)+"-"+today.getFullYear()+"   at  "+formatDate(today.getHours())+":"+formatDate(today.getMinutes())+":"+formatDate(today.getSeconds())
      };

      // console.log(newCrs)
      axios
        .post("http://localhost:4000/add/PSofa", newPSofa)
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
      .get("http://localhost:4000/get/PSofa/" + GetP_id())
      .then((response) => {
        if ((response.data) != null && response.data.length == 1) {
          console.log(response.data[0]);

          setSelectFlag(response.data[0].Resp_select);
          setRespiratory(response.data[0].Resp_Value);
          setPlatelet(response.data[0].PlatCount);
          setBilirubin(response.data[0].Bilirubin);
          setAge(response.data[0].Card_AgeGrp);
          setCardio(response.data[0].Card_MAP);
          setVaso(response.data[0].Card_Vaso);
          setGcs(response.data[0].GCS);
          setRenal(response.data[0].Renal)
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
      <Text style={styles.prism}>
        Pediatric Sequential Organ Failure Assessment (P SOFA) Score
      </Text>
      <View style={[styles.container1]}>
        <View>
          <Text style={styles.assessment}>1.Respiratory</Text>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>Select: </Text>
          <Picker
            selectedValue={selectFlag}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setSelectFlag(itemValue)}
          >
            <Picker.Item label="" value={"-"} />
            <Picker.Item label="PaO2:FiO2" value={"PaO2:FiO2"} />
            <Picker.Item label="SpO2:FiO2" value={"SpO2:FiO2"} />
          </Picker>
        </View>
        {selectFlag == "PaO2:FiO2" && (
          <View style={styles.dropContainer}>
            <Text style={styles.dropdownContent}>PaO2:FiO2: </Text>
            <Picker
              selectedValue={respiratory}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue, itemIndex) => setRespiratory(itemValue)}
            >
              <Picker.Item label="" value={"-"} />
              <Picker.Item label=">=400" value={"0>=400"} />
              <Picker.Item label="300-399" value={"1300-399"} />
              <Picker.Item label="200-299" value={"2200-299"} />
              <Picker.Item label="100-199 with respiratory support" value={"3100-199 with respiratory support"} />
              <Picker.Item label="<100 with respiratory support" value={"4<100 with respiratory support"} />
            </Picker>
          </View>
        )}
        {selectFlag == "SpO2:FiO2" && (
          <View style={styles.dropContainer}>
            <Text style={styles.dropdownContent}>SpO2:FiO2: </Text>
            <Picker
              selectedValue={respiratory}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue, itemIndex) => setRespiratory(itemValue)}
            >
              <Picker.Item label="" value={"-"} />
              <Picker.Item label=">=292" value={"0>=292"} />
              <Picker.Item label="264-291" value={"1264-291"} />
              <Picker.Item label="221-264" value={"2221-264"} />
              <Picker.Item label="148-220 with respiratory support" value={"3148-220 with respiratory support"} />
              <Picker.Item label="<148 with respiratory support" value={"4<148 with respiratory support"} />
            </Picker>
          </View>
        )}
        {respiratory != "-" && (<Text style={styles.subscore}>
          Subscore:{" "}
          {Number(respiratory.substring(0, 1))}
        </Text>
        )}
      </View>
      <View style={[styles.container2]}>
        <View>
          <Text style={styles.assessment}>2.Coagulation</Text>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>Platelet Count: </Text>
          <Picker
            selectedValue={platelet}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setPlatelet(itemValue)}
          >
            <Picker.Item label="" value={"-"} />
            <Picker.Item label=">=150" value={"0>=150"} />
            <Picker.Item label="100-149" value={"1100-149"} />
            <Picker.Item label="50-99" value={"250-99"} />
            <Picker.Item label="20-49" value={"320-49"} />
            <Picker.Item label="<20" value={"4<20"} />
          </Picker>
        </View>
        {platelet != "-" && (<Text style={styles.subscore}>
          Subscore:{" "}
          {Number(platelet.substring(0, 1))}
        </Text>
        )}
      </View>
      <View style={[styles.container3]}>
        <View>
          <Text style={styles.assessment}>3.Hepatic</Text>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>Bilirubin (mg/dL): </Text>
          <Picker
            selectedValue={bilirubin}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setBilirubin(itemValue)}
          >
            <Picker.Item label="" value={"-"} />
            <Picker.Item label="<1.2" value={"0<1.2"} />
            <Picker.Item label="1.2-1.9" value={"11.2-1.9"} />
            <Picker.Item label="2.0-5.9" value={"22.0-5.9"} />
            <Picker.Item label="6.0-11.9" value={"36.0-11.9"} />
            <Picker.Item label=">=12.0" value={"4>=12.0"} />
          </Picker>
        </View>
        {bilirubin != "-" && (<Text style={styles.subscore}>
          Subscore:{" "}
          {Number(bilirubin.substring(0, 1))}
        </Text>
        )}
      </View>
      <View style={[styles.container4]}>
        <View>
          <Text style={styles.assessment}>4.Cardiovascular</Text>
        </View>
        <View style={styles.dropContainer}>
          <Text style={[styles.dropdownContent, styles.text]}>MAP by age group   </Text>
          <Text style={styles.dropdownContent}>Select Age-Group: </Text>
          <Picker
            placeholder="Select Age Group"
            selectedValue={age}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setAge(itemValue)}
          >
            <Picker.Item label="" value={"-"} />
            <Picker.Item label="<1 mo" value={"0<1 mo"} />
            <Picker.Item label="1-11 mo" value={"11-11 mo"} />
            <Picker.Item label="12-23 mo" value={"212-23 mo"} />
            <Picker.Item label="24-59 mo" value={"324-59 mo"} />
            <Picker.Item label="60-143 mo" value={"460-143 mo"} />
            <Picker.Item label="144-216 mo" value={"5144-216 mo"} />
            <Picker.Item label=">216 mo" value={"6>216 mo"} />
          </Picker>
        </View>
        {Number(age.substring(0, 1)) == 0 && (
          <View style={styles.dropContainer}>
            <Text style={styles.dropdownContent}>MAP: </Text>
            <Picker
              selectedValue={cardio}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue, itemIndex) => setCardio(itemValue)}
            >
              <Picker.Item label="" value={"-"} />
              <Picker.Item label=">=46" value={"0>=46"} />
              <Picker.Item label="<46" value={"1<46"} />
            </Picker>
          </View>
        )}
        {Number(age.substring(0, 1)) == 1 && (
          <View style={styles.dropContainer}>
            <Text style={styles.dropdownContent}>MAP: </Text>
            <Picker
              selectedValue={cardio}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue, itemIndex) => setCardio(itemValue)}
            >
              <Picker.Item label="" value={"-"} />
              <Picker.Item label=">=55" value={"0>=55"} />
              <Picker.Item label="<55" value={"1<55"} />
            </Picker>
          </View>
        )}
        {Number(age.substring(0, 1)) == 2 && (
          <View style={styles.dropContainer}>
            <Text style={styles.dropdownContent}>MAP: </Text>
            <Picker
              selectedValue={cardio}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue, itemIndex) => setCardio(itemValue)}
            >
              <Picker.Item label="" value={"-"} />
              <Picker.Item label=">=60" value={"0>=60"} />
              <Picker.Item label="<60" value={"1<60"} />
            </Picker>
          </View>
        )}
        {Number(age.substring(0, 1)) == 3 && (
          <View style={styles.dropContainer}>
            <Text style={styles.dropdownContent}>MAP: </Text>
            <Picker
              selectedValue={cardio}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue, itemIndex) => setCardio(itemValue)}
            >
              <Picker.Item label="" value={"-"} />
              <Picker.Item label=">=62" value={"0>=62"} />
              <Picker.Item label="<62" value={"1<62"} />
            </Picker>
          </View>
        )}
        {Number(age.substring(0, 1)) == 4 && (
          <View style={styles.dropContainer}>
            <Text style={styles.dropdownContent}>MAP: </Text>
            <Picker
              selectedValue={cardio}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue, itemIndex) => setCardio(itemValue)}
            >
              <Picker.Item label="" value={"-"} />
              <Picker.Item label=">=65" value={"0>=65"} />
              <Picker.Item label="<65" value={"1<65"} />
            </Picker>
          </View>
        )}
        {Number(age.substring(0, 1)) == 5 && (
          <View style={styles.dropContainer}>
            <Text style={styles.dropdownContent}>MAP: </Text>
            <Picker
              selectedValue={cardio}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue, itemIndex) => setCardio(itemValue)}
            >
              <Picker.Item label="" value={"-"} />
              <Picker.Item label=">=67" value={"0>=67"} />
              <Picker.Item label="<67" value={"1<67"} />
            </Picker>
          </View>
        )}
        {Number(age.substring(0, 1)) == 6 && (
          <View style={styles.dropContainer}>
            <Text style={styles.dropdownContent}>MAP: </Text>
            <Picker
              selectedValue={cardio}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue, itemIndex) => setCardio(itemValue)}
            >
              <Picker.Item label="" value={"-"} />
              <Picker.Item label=">=70" value={"0>=70"} />
              <Picker.Item label="<70" value={"1<70"} />
            </Picker>
          </View>
        )}
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>Vasoactive Infusion: </Text>
          <Picker
            placeholder="Select Age Group"
            selectedValue={vaso}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setVaso(itemValue)}
          >
            <Picker.Item label="" value={cardio} />
            <Picker.Item label="Dopamine hydrochloride <=5  OR  dobutamine hydrochloride (any)" value={"2Dopamine hydrochloride <=5  OR  dobutamine hydrochloride (any)"} />
            <Picker.Item label="Dopamine hydrochloride >5 or epinephrine <=0 or norepinphrine bitartrate <=0.1" value={"3Dopamine hydrochloride >5 or epinephrine <=0 or norepinphrine bitartrate <=0.1"} />
            <Picker.Item label="Dopamine hydrochloride > 15 or epinephrine > 0.1 or norepinephrine bitartrate > 0.1" value={"4Dopamine hydrochloride > 15 or epinephrine > 0.1 or norepinephrine bitartrate > 0.1"} />
          </Picker>
        </View>
        {cardioScore != "-" && (<Text style={styles.subscore}>
          Subscore:{" "}
          {Number(cardioScore.substring(0, 1))}
        </Text>
        )}
      </View>
      <View style={[styles.container5]}>
        <View>
          <Text style={styles.assessment}>5.Neurological</Text>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>GCS: </Text>
          <Picker
            selectedValue={gcs}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setGcs(itemValue)}
          >
            <Picker.Item label="" value={"-"} />
            <Picker.Item label="15" value={"015"} />
            <Picker.Item label="13-14" value={"113-14"} />
            <Picker.Item label="10-12" value={"210-12"} />
            <Picker.Item label="6-9" value={"36-9"} />
            <Picker.Item label="<6" value={"4<6"} />
          </Picker>
        </View>
        {gcs != "-" && (<Text style={styles.subscore}>
          Subscore:{" "}
          {Number(gcs.substring(0, 1))}
        </Text>
        )}
      </View>
      <View style={[styles.container2]}>
        <View>
          <Text style={styles.assessment}>6.Renal</Text>
        </View>
        {Number(age.substring(0, 1)) == 0 && (
          <View style={styles.dropContainer}>
            <Text style={styles.dropdownContent}>Creatinine: </Text>
            <Picker
              selectedValue={renal}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue, itemIndex) => setRenal(itemValue)}
            >
              <Picker.Item label="" value={"-"} />
              <Picker.Item label="<0.8" value={"0<0.8"} />
              <Picker.Item label="0.8-0.9" value={"10.8-0.9"} />
              <Picker.Item label="1.0-1.1" value={"21.0-1.1"} />
              <Picker.Item label="1.2-1.5" value={"31.2-1.5"} />
              <Picker.Item label=">=1.6" value={"4>=1.6"} />
            </Picker>
          </View>
        )}
        {Number(age.substring(0, 1)) == 1 && (
          <View style={styles.dropContainer}>
            <Text style={styles.dropdownContent}>Creatinine: </Text>
            <Picker
              selectedValue={renal}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue, itemIndex) => setRenal(itemValue)}
            >
              <Picker.Item label="" value={"-"} />
              <Picker.Item label="<0.3" value={"0<0.3"} />
              <Picker.Item label="0.3-0.4" value={"10.3-0.4"} />
              <Picker.Item label="0.5-0.7" value={"20.5-0.7"} />
              <Picker.Item label="0.8-1.1" value={"30.8-1.1"} />
              <Picker.Item label=">=1.2" value={"4>=1.2"} />
            </Picker>
          </View>
        )}
        {Number(age.substring(0, 1)) == 2 && (
          <View style={styles.dropContainer}>
            <Text style={styles.dropdownContent}>Creatinine: </Text>
            <Picker
              selectedValue={renal}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue, itemIndex) => setRenal(itemValue)}
            >
              <Picker.Item label="" value={"-"} />
              <Picker.Item label="<0.4" value={"0<0.4"} />
              <Picker.Item label="0.4-0.5" value={"10.4-0.5"} />
              <Picker.Item label="0.6-1.0" value={"20.6-1.0"} />
              <Picker.Item label="1.1-1.4" value={"31.1-1.4"} />
              <Picker.Item label=">=1.5" value={"4>=1.5"} />
            </Picker>
          </View>
        )}
        {Number(age.substring(0, 1)) == 3 && (
          <View style={styles.dropContainer}>
            <Text style={styles.dropdownContent}>Creatinine: </Text>
            <Picker
              selectedValue={renal}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue, itemIndex) => setRenal(itemValue)}
            >
              <Picker.Item label="" value={"-"} />
              <Picker.Item label="<0.6" value={"0<0.6"} />
              <Picker.Item label="0.6-0.8" value={"10.6-0.8"} />
              <Picker.Item label="0.9-1.5" value={"20.9-1.5"} />
              <Picker.Item label="1.6-2.2" value={"31.6-2.2"} />
              <Picker.Item label=">=2.3" value={"4>=2.3"} />
            </Picker>
          </View>
        )}
        {Number(age.substring(0, 1)) == 4 && (
          <View style={styles.dropContainer}>
            <Text style={styles.dropdownContent}>Creatinine: </Text>
            <Picker
              selectedValue={renal}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue, itemIndex) => setRenal(itemValue)}
            >
              <Picker.Item label="" value={"-"} />
              <Picker.Item label="<0.7" value={"0<0.7"} />
              <Picker.Item label="0.7-1.0" value={"10.7-1.0"} />
              <Picker.Item label="1.1-1.7" value={"21.1-1.7"} />
              <Picker.Item label="1.8-2.5" value={"31.8-2.5"} />
              <Picker.Item label=">=2.6" value={"4>=2.6"} />
            </Picker>
          </View>
        )}
        {Number(age.substring(0, 1)) == 5 && (
          <View style={styles.dropContainer}>
            <Text style={styles.dropdownContent}>Creatinine: </Text>
            <Picker
              selectedValue={renal}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue, itemIndex) => setRenal(itemValue)}
            >
              <Picker.Item label="" value={"-"} />
              <Picker.Item label="<1.0" value={"0<1.0"} />
              <Picker.Item label="1.0-1.6" value={"11.0-1.6"} />
              <Picker.Item label="1.7-2.8" value={"21.7-2.8"} />
              <Picker.Item label="2.9-4.1" value={"32.9-4.1"} />
              <Picker.Item label=">=4.2" value={"4>=4.2"} />
            </Picker>
          </View>
        )}
        {Number(age.substring(0, 1)) == 6 && (
          <View style={styles.dropContainer}>
            <Text style={styles.dropdownContent}>Creatinine: </Text>
            <Picker
              selectedValue={renal}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue, itemIndex) => setRenal(itemValue)}
            >
              <Picker.Item label="" value={"-"} />
              <Picker.Item label="<1.2" value={"0<1.2"} />
              <Picker.Item label="1.2-1.9" value={"11.2-1.9"} />
              <Picker.Item label="2.0-3.4" value={"22.0-3.4"} />
              <Picker.Item label="3.5-4.9" value={"33.5-4.9"} />
              <Picker.Item label=">=4.5" value={"4>=4.5"} />
            </Picker>
          </View>
        )}
        {renal != "-" && (<Text style={styles.subscore}>
          Subscore:{" "}
          {Number(renal.substring(0, 1))}
        </Text>
        )}
      </View>
      {flag == 1 && (
        <View style={[styles.container4]}>
          <View>
            <Text style={styles.assessment}>
              Score: {score}
            </Text>
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

export default Psofa;

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
