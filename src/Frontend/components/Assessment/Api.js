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

const Api = () => {
  const [sPrimary, setSPrimary] = useState("");
  const [sAsthma, setSAsthma] = useState("");
  const [sDermatitis, setSDermatitis] = useState("");
  const [sCold, setSCold] = useState("");
  const [sCirculation, setSCirculation] = useState("");
  const [sRhinitis, setSRhinitis] = useState("");
  const [mPrimary, setMPrimary] = useState("");
  const [mAsthma, setMAsthma] = useState("");
  const [mDermatitis, setMDermatitis] = useState("");
  const [mAeroallergen, setMAeroallergen] = useState("");
  const [mCold, setMCold] = useState("");
  const [mCirculation, setMCirculation] = useState("");
  const [mSensitization, setMSensitization] = useState("");
  const [c, setC] = useState(1);
  const location = useLocation();
  let flag = 1
  var today
if(localStorage.getItem('user_data')!=null)
  var D_id = (JSON.parse(localStorage.getItem('user_data'))).username

  function formatDate(a){
    if(a<9){
      return "0"+a
    }else{
      return a;
    }
  }

  const onClickAdd = (event) => {
    if (flag == 1) {
      today = new Date()
      setC(0);
        const newApi = {
          "P_id": GetP_id(),
          "a": sPrimary,
          "b": sAsthma,
          "c": sDermatitis,
          "d": sCold,
          "e": sCirculation,
          "f": sRhinitis,
          "g": mPrimary,
          "h": mAsthma,
          "i": mDermatitis,
          "j": mAeroallergen,
          "k": mCold,
          "l": mCirculation,
          "m": mSensitization,
          "n": D_id,
          "o": formatDate(today.getDate())+"-"+formatDate(today.getMonth()+1)+"-"+today.getFullYear()+"   at  "+formatDate(today.getHours())+":"+formatDate(today.getMinutes())+":"+formatDate(today.getSeconds())
        }
  
        // console.log(newCrs)
        axios
          .post("http://localhost:4000/add/API", newApi)
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
      .get("http://localhost:4000/get/API/" + GetP_id())
      .then((response) => {
        if ((response.data) != null && response.data.length == 1) {
          console.log(response.data[0])
          setSPrimary(response.data[0].Str_EFW),
            setSAsthma(response.data[0].Str_Sec_Parent),
            setSDermatitis(response.data[0].Str_Sec_Physician),
            setSCold(response.data[0].Str_Sec_Wheez),
            setSCirculation(response.data[0].Str_Sec_Eos),
            setSRhinitis(response.data[0].Str_Sec_Rhintis),
            setMPrimary(response.data[0].Min_wheez),
            setMAsthma(response.data[0].Min_PPDA),
            setMDermatitis(response.data[0].Min_PDAD),
            setMAeroallergen(response.data[0].Min_Aero),
            setMCold(response.data[0].Min_WUC),
            setMCirculation(response.data[0].Min_EOS),
            setMSensitization(response.data[0].Min_milk)
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
      <Text style={styles.prism}>Asthma Predictive Index (API)</Text>
      <View style={[styles.container1]}>
        <View>
          <Text style={styles.assessment}>
            1.Stringent API
          </Text>
        </View>
        <View style={styles.dropContainer}>
          <Text style={[styles.dropdownContent, styles.text]}>Primary</Text>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>Early frequent wheezer (>=3 on 1-5 rating scale): </Text>

          <Picker
            selectedValue={sPrimary}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setSPrimary(itemValue)}
          >
            <Picker.Item label="" value="" />
            <Picker.Item label="Yes" value="Yes" />
            <Picker.Item label="No" value="No" />
          </Picker>
        </View>
        <View style={styles.dropContainer}>
          <Text style={[styles.dropdownContent, styles.text]}>Secondary</Text>
        </View>
        <View style={styles.dropContainer}>
          <Text style={[styles.dropdownContent, styles.text]}>At least 1 major:</Text>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>Parental physician-diagnosed asthma: </Text>
          <Picker
            selectedValue={sAsthma}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setSAsthma(itemValue)}
          >
            <Picker.Item label="" value="" />
            <Picker.Item label="Yes" value="Yes" />
            <Picker.Item label="No" value="No" />
          </Picker>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>Physician-diagnosed atopic dermatitis: </Text>
          <Picker
            selectedValue={sDermatitis}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setSDermatitis(itemValue)}
          >
            <Picker.Item label="" value="" />
            <Picker.Item label="Yes" value="Yes" />
            <Picker.Item label="No" value="No" />
          </Picker>
        </View>
        <View style={styles.dropContainer}>
          <Text style={[styles.dropdownContent, styles.text]}>At least 2 minor:</Text>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>Wheezing unrelated to colds: </Text>
          <Picker
            selectedValue={sCold}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setSCold(itemValue)}
          >
            <Picker.Item label="" value="" />
            <Picker.Item label="Yes" value="Yes" />
            <Picker.Item label="No" value="No" />
          </Picker>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>Eosinophils ≥4% in circulation: </Text>
          <Picker
            selectedValue={sCirculation}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setSCirculation(itemValue)}
          >
            <Picker.Item label="" value="" />
            <Picker.Item label="Yes" value="Yes" />
            <Picker.Item label="No" value="No" />
          </Picker>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>Physician-diagnosed allergic rhinitis: </Text>
          <Picker
            selectedValue={sRhinitis}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setSRhinitis(itemValue)}
          >
            <Picker.Item label="" value="" />
            <Picker.Item label="Yes" value="Yes" />
            <Picker.Item label="No" value="No" />
          </Picker>
        </View>
      </View>
      <View style={[styles.container2]}>
        <View>
          <Text style={styles.assessment}>
            1.Minor Criteria API
          </Text>
        </View>
        <View style={styles.dropContainer}>
          <Text style={[styles.dropdownContent, styles.text]}>Primary</Text>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>≥4 wheezing episodes in a year: </Text>

          <Picker
            selectedValue={mPrimary}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setMPrimary(itemValue)}
          >
            <Picker.Item label="" value="" />
            <Picker.Item label="Yes" value="Yes" />
            <Picker.Item label="No" value="No" />
          </Picker>
        </View>
        <View style={styles.dropContainer}>
          <Text style={[styles.dropdownContent, styles.text]}>Secondary</Text>
        </View>
        <View style={styles.dropContainer}>
          <Text style={[styles.dropdownContent, styles.text]}>At least 1 major:</Text>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>Parental physician-diagnosed asthma: </Text>
          <Picker
            selectedValue={mAsthma}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setMAsthma(itemValue)}
          >
            <Picker.Item label="" value="" />
            <Picker.Item label="Yes" value="Yes" />
            <Picker.Item label="No" value="No" />
          </Picker>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>Physician-diagnosed atopic dermatitis: </Text>
          <Picker
            selectedValue={mDermatitis}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setMDermatitis(itemValue)}
          >
            <Picker.Item label="" value="" />
            <Picker.Item label="Yes" value="Yes" />
            <Picker.Item label="No" value="No" />
          </Picker>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>Allergic sensitization to at least one aeroallergen: </Text>
          <Picker
            selectedValue={mAeroallergen}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setMAeroallergen(itemValue)}
          >
            <Picker.Item label="" value="" />
            <Picker.Item label="Yes" value="Yes" />
            <Picker.Item label="No" value="No" />
          </Picker>
        </View>
        <View style={styles.dropContainer}>
          <Text style={[styles.dropdownContent, styles.text]}>At least 2 minor:</Text>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>Wheezing unrelated to colds: </Text>
          <Picker
            selectedValue={mCold}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setMCold(itemValue)}
          >
            <Picker.Item label="" value="" />
            <Picker.Item label="Yes" value="Yes" />
            <Picker.Item label="No" value="No" />
          </Picker>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>Eosinophils ≥4% in circulation: </Text>
          <Picker
            selectedValue={mCirculation}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setMCirculation(itemValue)}
          >
            <Picker.Item label="" value="" />
            <Picker.Item label="Yes" value="Yes" />
            <Picker.Item label="No" value="No" />
          </Picker>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>Allergic sensitization to milk, egg, or peanuts: </Text>
          <Picker
            selectedValue={mSensitization}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setMSensitization(itemValue)}
          >
            <Picker.Item label="" value="" />
            <Picker.Item label="Yes" value="Yes" />
            <Picker.Item label="No" value="No" />
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

export default Api;

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
    fontSize: 25,
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