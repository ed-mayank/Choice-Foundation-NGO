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

const Triage = () => {
  const [appearance, setAppearance] = useState("");
  const [breathing, setBreathing] = useState("");
  const [skin, setSkin] = useState("");
  const [airway, setAirway] = useState("")
  const [efforts, setEfforts] = useState("");
  const [textairway, setTextAirway] = useState("")
  const [textbreath, onChangeBreath] = useState("")
  const [airEntry, setAirEntry] = useState("")
  const [auscultation, setAuscultation] = useState("")
  const [spo2Air, setSpo2Air] = useState("")
  const [spo2Fio2, setSpo2Fio2] = useState("")
  const [etco2, setEtco2] = useState("")
  const [hr, setHr] = useState("")
  const [cft, setCft] = useState("")
  const [bp, setBp] = useState("")
  const [central, setCentral] = useState("")
  const [peripheral, setPeripheral] = useState("")
  const [skinTemp, setSkinTemp] = useState("")
  const [rhythm, setRhythm] = useState("")
  const [wave, setWave] = useState("")
  const [others, setOthers] = useState("")
  const [gcs, setGcs] = useState("")
  const [pupil, setPupil] = useState("")
  const [reaction, setReaction] = useState("")
  const [motor, setMotor] = useState("")
  const [sugar, setSugar] = useState("")
  const [temperature, setTemperature] = useState("")
  const [color, setColor] = useState("")
  const [surface, setSurface] = useState("")
  const [otherExposure, setOtherExposure] = useState("")
  const [stable, setStable] = useState("")
  const [distress, setDistress] = useState("")
  const [failure, setFailure] = useState("")
  const [cshock, setCshock] = useState("")
  const [hshock, setHshock] = useState("")
  const [brain, setBrain] = useState("")
  const [cardioFailure, setCardioFailure] = useState("")
  const [cardioArrest, setCardioArrest] = useState("")
  const [level, setLevel] = useState("")
  const [istable, setIstable] = useState("")
  const [lifeThreat, setLifeThreat] = useState("")
  const [nolifeThreat, setNolifeThreat] = useState("")
  const [c, setC] = useState(1);
  const location = useLocation();
  let flag = 1

  const onClickAdd = (event) => {
    if (flag == 1) {
      today = new Date()
      setC(0);
      const newTriage = {
        "P_id": GetP_id(),
        "a": appearance,
        "b": breathing,
        "c": skin,
        "d": airway,
        "e": textairway,
        "f": textbreath,
        "g": efforts,
        "h": airEntry,
        "i": auscultation,
        "j": spo2Air,
        "k": spo2Fio2,
        "l": etco2,
        "m": hr,
        "n": cft,
        "o": bp,
        "p": central,
        "q": peripheral,
        "r": skinTemp,
        "s": rhythm,
        "t": wave,
        "u": others,
        "v": gcs,
        "w": pupil,
        "x": reaction,
        "y": motor,
        "z": sugar,
        "A": temperature,
        "B": color,
        "C": surface,
        "D": otherExposure,
        "E": istable,
        "F": nolifeThreat,
        "G": lifeThreat,
        "H": stable,
        "I": distress,
        "J": failure,
        "K": cshock,
        "L": hshock,
        "M": brain,
        "N": cardioFailure,
        "O": cardioArrest,
        "P": level,
        "Q": D_id,
        "R": formatDate(today.getDate())+"-"+formatDate(today.getMonth()+1)+"-"+today.getFullYear()+"   at  "+formatDate(today.getHours())+":"+formatDate(today.getMinutes())+":"+formatDate(today.getSeconds())
      };

      // console.log(newCrs)
      axios
        .post("http://localhost:4000/add/Triage", newTriage)
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
      .get("http://localhost:4000/get/Triage/" + GetP_id())
      .then((response) => {
        if ((response.data) != null && response.data.length == 1) {
          console.log(response.data[0]);

          setAppearance(response.data[0].GA_Appear)
          setBreathing(response.data[0].GA_WOB)
          setSkin(response.data[0].GA_SC)
          setAirway(response.data[0].PA_Air)
          setTextAirway(response.data[0].PA_Air_Add)
          onChangeBreath(response.data[0].PA_Breath)
          setEfforts(response.data[0].PA_Eff)
          setAirEntry(response.data[0].PA_AirEntry)
          setAuscultation(response.data[0].PA_Ausc)
          setSpo2Air(response.data[0].PA_SPO2_RA)
          setSpo2Fio2(response.data[0].PA_SPO2_FIO2)
          setEtco2(response.data[0].PA_ETCO2)
          setHr(response.data[0].PA_Circ_HR)
          setCft(response.data[0].PA_Circ_CFT)
          setBp(response.data[0].PA_Circ_BP)
          setCentral(response.data[0].PA_Circ_CP)
          setPeripheral(response.data[0].PA_Circ_PP)
          setSkinTemp(response.data[0].PA_Circ_ST)
          setRhythm(response.data[0].PA_Circ_Rythm)
          setWave(response.data[0].PA_Circ_T)
          setOthers(response.data[0].PA_Circ_Others)
          setGcs(response.data[0].PA_Dis_GCS)
          setPupil(response.data[0].PA_Dis_Pup)
          setReaction(response.data[0].PA_Dis_React)
          setMotor(response.data[0].PA_Dis_Motor)
          setSugar(response.data[0].PA_Dis_Blood)
          setTemperature(response.data[0].PA_Exp_Temp)
          setColor(response.data[0].PA_Exp_Color)
          setSurface(response.data[0].PA_Exp_SF)
          setOtherExposure(response.data[0].PA_Exp_SF_Add)
          setIstable(response.data[0].IPC_Stable)
          setNolifeThreat(response.data[0].IPC_Unstable_Nlt)
          setLifeThreat(response.data[0].IPC_Unstable_Lt)
          setStable(response.data[0].FPC_Stable)
          setDistress(response.data[0].FPC_RD)
          setFailure(response.data[0].FPC_RF)
          setCshock(response.data[0].FPC_CS)
          setHshock(response.data[0].FPC_HS)
          setBrain(response.data[0].FPC_PB)
          setCardioFailure(response.data[0].FPC_CF)
          setCardioArrest(response.data[0].FPC_CA)
          setLevel(response.data[0].TC_Classification)
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
      <Text style={styles.triage}>Triage</Text>
      <View style={[styles.container1]}>
        <View>
          <Text style={styles.assessment}>
            1.General Assessment (Pediatric assessment Triangle)
          </Text>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>Appearance: </Text>
          <Picker
            selectedValue={appearance}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setAppearance(itemValue)}
          >
            <Picker.Item label=" " value=" " />
            <Picker.Item label="Normal" value="Normal" />
            <Picker.Item label="Abnormal" value="Abnormal" />
          </Picker>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>Work of Breathing: </Text>
          <Picker
            selectedValue={breathing}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setBreathing(itemValue)}
          >
            <Picker.Item label=" " value=" " />
            <Picker.Item label="Normal" value="Normal" />
            <Picker.Item label="Increased" value="Increased" />
            <Picker.Item label="Decreased" value="Decreased" />
            <Picker.Item label="Gasping" value="Gasping" />
            <Picker.Item label="Apnea" value="Apnea" />
          </Picker>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>Skin Circulation: </Text>
          <Picker
            selectedValue={skin}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setSkin(itemValue)}
          >
            <Picker.Item label=" " value=" " />
            <Picker.Item label="Normal" value="Normal" />
            <Picker.Item label="Abnormal" value="Abnormal" />
            <Picker.Item label="Bleeding" value="Bleeding" />
          </Picker>
        </View>
      </View>
      <View style={styles.container2}>
        <View>
          <Text style={styles.assessment}>
            2.Primary Assessment (Assessment Pentagon)
          </Text>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>i.Airway: </Text>
          <Picker
            selectedValue={airway}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setAirway(itemValue)}
          >
            <Picker.Item label=" " value=" " />
            <Picker.Item label="Open & Stable" value="Open & Stable" />
            <Picker.Item label="Open but UnStable" value="Open but UnStable" />
            <Picker.Item label="Obstructed" value="Obstructed" />
          </Picker>
          <TextInput
            style={styles.input}
            onChangeText={setTextAirway}
            value={textairway}
            placeholder="Airway"
          />
        </View>
        <Text style={[styles.dropdownContent, styles.text]}>ii.Breathing: </Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeBreath}
          value={textbreath}
          placeholder="RR (/min)"
        />
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>Efforts: </Text>

          <Picker
            selectedValue={efforts}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setEfforts(itemValue)}
          >
            <Picker.Item label=" " value=" " />
            <Picker.Item label="Normal" value="Normal" />
            <Picker.Item label="Poor" value="Poor" />
            <Picker.Item label="Increased" value="Increased" />
            <Picker.Item label="Obstructed" value="Obstructed" />
          </Picker>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>AirEntry: </Text>

          <Picker
            selectedValue={airEntry}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setAirEntry(itemValue)}
          >
            <Picker.Item label=" " value=" " />
            <Picker.Item label="Normal" value="Normal" />
            <Picker.Item label="Poor" value="Poor" />
            <Picker.Item label="Differential" value="Differential" />
          </Picker>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>Auscultation: </Text>

          <Picker
            selectedValue={auscultation}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setAuscultation(itemValue)}
          >
            <Picker.Item label=" " value=" " />
            <Picker.Item label="None" value="None" />
            <Picker.Item label="Stridor" value="Stridor" />
            <Picker.Item label="Wheeze" value="Wheeze" />
            <Picker.Item label="Crackles" value="Crackles" />
          </Picker>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>SpO2(room Air): </Text>
          <TextInput
            style={styles.input}
            onChangeText={setSpo2Air}
            value={spo2Air}
          />
          <Text style={styles.dropdownContent}>    SpO2(40% FiO2): </Text>
          <TextInput
            style={styles.input}
            onChangeText={setSpo2Fio2}
            value={spo2Fio2}
          />
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>EtCO2 </Text>
          <TextInput
            style={styles.input}
            onChangeText={setEtco2}
            value={etco2}
          />
          <Text style={styles.dropdownContent}>mmHg</Text>
        </View>
        <Text style={[styles.dropdownContent, styles.text]}>iii.Circulation: </Text>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>HR: </Text>
          <TextInput
            style={styles.input}
            onChangeText={setHr}
            value={hr}
          />
          <Text style={styles.dropdownContent}>/min</Text>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>CFT: </Text>
          <TextInput
            style={styles.input}
            onChangeText={setCft}
            value={cft}
          />
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>BP: </Text>
          <TextInput
            style={styles.input}
            onChangeText={setBp}
            value={bp}
          />
          <Text style={styles.dropdownContent}>mmHg</Text>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>Central Pulse: </Text>

          <Picker
            selectedValue={central}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setCentral(itemValue)}
          >
            <Picker.Item label=" " value=" " />
            <Picker.Item label="Good" value="Good" />
            <Picker.Item label="Poor" value="Poor" />
          </Picker>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>Peripheral Pulse: </Text>

          <Picker
            selectedValue={peripheral}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setPeripheral(itemValue)}
          >
            <Picker.Item label=" " value=" " />
            <Picker.Item label="Good" value="Good" />
            <Picker.Item label="Poor" value="Poor" />
          </Picker>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>Skin Temp: </Text>

          <Picker
            selectedValue={skinTemp}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setSkinTemp(itemValue)}
          >
            <Picker.Item label=" " value=" " />
            <Picker.Item label="Warm" value="Warm" />
            <Picker.Item label="Cool" value="Cool" />
          </Picker>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>Rhythm: </Text>

          <Picker
            selectedValue={rhythm}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setRhythm(itemValue)}
          >
            <Picker.Item label=" " value=" " />
            <Picker.Item label="Normal" value="Normal" />
            <Picker.Item label="Abnormal" value="Abnormal" />
          </Picker>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>T-wave: </Text>

          <Picker
            selectedValue={wave}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setWave(itemValue)}
          >
            <Picker.Item label=" " value=" " />
            <Picker.Item label="Normal" value="Normal" />
            <Picker.Item label="Abnormal" value="Abnormal" />
            <Picker.Item label="Tall T-wave" value="Tall T-wave" />
            <Picker.Item label="Inverted T-wave" value="Inverted T-wave" />
          </Picker>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>Others: </Text>
          <TextInput
            style={styles.input}
            onChangeText={setOthers}
            value={others}
          />
        </View>
        <Text style={[styles.dropdownContent, styles.text]}>iv.Disability: </Text>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>GCS: </Text>
          <TextInput
            style={styles.input}
            onChangeText={setGcs}
            value={gcs}
          />
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>Pupil Size: </Text>
          <TextInput
            style={styles.input}
            onChangeText={setPupil}
            value={pupil}
          />
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>Reaction: </Text>

          <Picker
            selectedValue={reaction}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setReaction(itemValue)}
          >
            <Picker.Item label=" " value=" " />
            <Picker.Item label="Reacting" value="Reacting" />
            <Picker.Item label="Non-reacting" value="Non-reacting" />
          </Picker>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>Motor Activity: </Text>

          <Picker
            selectedValue={motor}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setMotor(itemValue)}
          >
            <Picker.Item label=" " value=" " />
            <Picker.Item label="Normal and Symmetrical" value="Normal and Symmetrical" />
            <Picker.Item label="Assymetrical" value="Assymetrical" />
            <Picker.Item label="Seizures" value="Seizures" />
            <Picker.Item label="Posturing" value="Posturing" />
            <Picker.Item label="Flaccidity" value="Flaccidity" />
            <Picker.Item label="Extrapyramidal movements" value="Extrapyramidal movements" />
          </Picker>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>Blood Sugar: </Text>
          <TextInput
            style={styles.input}
            onChangeText={setSugar}
            value={sugar}
          />
          <Text style={styles.dropdownContent}>mg/dL</Text>
        </View>
        <Text style={[styles.dropdownContent, styles.text]}>v.Exposure: </Text>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>Temperature(degree Centegrate): </Text>
          <TextInput
            style={styles.input}
            onChangeText={setTemperature}
            value={temperature}
          />
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>Color: </Text>

          <Picker
            selectedValue={color}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setColor(itemValue)}
          >
            <Picker.Item label=" " value=" " />
            <Picker.Item label="Normal" value="Normal" />
            <Picker.Item label="Pallor" value="Pallor" />
            <Picker.Item label="Cyanosis" value="Cyanosis" />
            <Picker.Item label="Ashen Grey Skin" value="Ashen Grey Skin" />
          </Picker>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>Surface Findings: </Text>

          <Picker
            selectedValue={surface}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setSurface(itemValue)}
          >
            <Picker.Item label=" " value=" " />
            <Picker.Item label="Rash" value="Rash" />
            <Picker.Item label="Abscess" value="Abscess" />
            <Picker.Item label="Pustules" value="Pustules" />
            <Picker.Item label="Cellultis" value="Cellultis" />
            <Picker.Item label="Purpura" value="Purpura" />
            <Picker.Item label="Patechle" value="Patechle" />
            <Picker.Item label="Ecchymosis" value="Ecchymosis" />
            <Picker.Item label="Hernorrhagic nodules" value="Hernorrhagic nodules" />
            <Picker.Item label="Mucosal Ulcers" value="Mucosal Ulcers" />
            <Picker.Item label="Dermatosis" value="Dermatosis" />
            <Picker.Item label="Desquamation" value="Desquamation" />
            <Picker.Item label="Edema" value="Edema" />
            <Picker.Item label="Trauma" value="Trauma" />
            <Picker.Item label="Others" value="Others" />
          </Picker>
          <TextInput
            style={styles.input}
            onChangeText={setOtherExposure}
            value={otherExposure}
          />
        </View>
      </View>
      <View style={styles.container3}>
        <View>
          <Text style={styles.assessment}>
            3. Initial Physiological Categorization
          </Text>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>Stable: </Text>

          <Picker
            selectedValue={istable}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setIstable(itemValue)}
          >
            <Picker.Item label=" " value=" " />
            <Picker.Item label="Yes" value="Yes" />
            <Picker.Item label="No" value="No" />
          </Picker>
        </View>
        <Text style={[styles.dropdownContent, styles.text]}>* Unstable-</Text>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>Not Life threatening: </Text>

          <Picker
            selectedValue={nolifeThreat}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setNolifeThreat(itemValue)}
          >
            <Picker.Item label=" " value=" " />
            <Picker.Item label="Yes" value="Yes" />
            <Picker.Item label="No" value="No" />
          </Picker>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>Life threatening: </Text>

          <Picker
            selectedValue={lifeThreat}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setLifeThreat(itemValue)}
          >
            <Picker.Item label=" " value=" " />
            <Picker.Item label="Yes" value="Yes" />
            <Picker.Item label="No" value="No" />
          </Picker>
        </View>
      </View>
      <View style={styles.container4}>
        <View>
          <Text style={styles.assessment}>
            4. Final Physiological Categorization
          </Text>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>Stable: </Text>

          <Picker
            selectedValue={stable}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setStable(itemValue)}
          >
            <Picker.Item label=" " value=" " />
            <Picker.Item label="Yes" value="Yes" />
            <Picker.Item label="No" value="No" />
          </Picker>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>Respiratory Distress: </Text>

          <Picker
            selectedValue={distress}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setDistress(itemValue)}
          >
            <Picker.Item label=" " value=" " />
            <Picker.Item label="Yes" value="Yes" />
            <Picker.Item label="No" value="No" />
          </Picker>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>Respiratory Failure: </Text>

          <Picker
            selectedValue={failure}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setFailure(itemValue)}
          >
            <Picker.Item label=" " value=" " />
            <Picker.Item label="Yes" value="Yes" />
            <Picker.Item label="No" value="No" />
          </Picker>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>Compensated Shock: </Text>

          <Picker
            selectedValue={cshock}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setCshock(itemValue)}
          >
            <Picker.Item label=" " value=" " />
            <Picker.Item label="Yes" value="Yes" />
            <Picker.Item label="No" value="No" />
          </Picker>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>Hypotensive Shock: </Text>

          <Picker
            selectedValue={hshock}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setHshock(itemValue)}
          >
            <Picker.Item label=" " value=" " />
            <Picker.Item label="Yes" value="Yes" />
            <Picker.Item label="No" value="No" />
          </Picker>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>Primary Brain/Systemic Dysfunction: </Text>

          <Picker
            selectedValue={brain}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setBrain(itemValue)}
          >
            <Picker.Item label=" " value=" " />
            <Picker.Item label="Yes" value="Yes" />
            <Picker.Item label="No" value="No" />
          </Picker>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>Cardiorespiratory Failure: </Text>

          <Picker
            selectedValue={cardioFailure}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setCardioFailure(itemValue)}
          >
            <Picker.Item label=" " value=" " />
            <Picker.Item label="Yes" value="Yes" />
            <Picker.Item label="No" value="No" />
          </Picker>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>Cardiorespiratory Arrest: </Text>

          <Picker
            selectedValue={cardioArrest}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setCardioArrest(itemValue)}
          >
            <Picker.Item label=" " value=" " />
            <Picker.Item label="Yes" value="Yes" />
            <Picker.Item label="No" value="No" />
          </Picker>
        </View>
      </View>
      <View style={styles.container5}>
        <View>
          <Text style={styles.assessment}>
            5. Triage Classification
          </Text>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>Classification: </Text>

          <Picker
            selectedValue={level}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setLevel(itemValue)}
          >
            <Picker.Item label=" " value=" " />
            <Picker.Item label="Level 1 (Resuscitation)" value="Level 1 (Resuscitation)" />
            <Picker.Item label="Level 2 (Emergent)" value="Level 2 (Emergent)" />
            <Picker.Item label="Level 3 (Urgent)" value="Level 3 (Urgent)" />
            <Picker.Item label="Level 4 (Less Urgent)" value="Level 4 (Less Urgent)" />
            <Picker.Item label="Level 5 (Non-Urgent)" value="Level 5 (Non-Urgent)" />
          </Picker>
        </View>
      </View>
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

export default Triage;

const styles = StyleSheet.create({
  triage: {
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
    fontWeight: 'bold',
  },
  container1: {
    backgroundColor: '#f0ffff',
    paddingLeft: 20,
  },
  container2: {
    backgroundColor: '#fffacd',
    paddingLeft: 20,
  },
  container3: {
    backgroundColor: '#ffb6c1',
    paddingLeft: 20,
  },
  container4: {
    backgroundColor: '#f5f5dc',
    paddingLeft: 20,
  },
  container5: {
    backgroundColor: '#dda0dd',
    paddingLeft: 20,
  },
  submit: {
    borderWidth: 2,
    backgroundColor: "#56BF9C",
    margin: 10,
    padding: 7,
    width: 90,
  }
});
