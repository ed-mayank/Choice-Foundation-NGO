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

function ReviewDetails(props) {
  const [prismScore, setPrismScore] = useState("");
  const [crsScore, setCRSScore] = useState("");
  const [oiScore, setOiScore] = useState("");
  const [oiSeverity, setOiSeverity] = useState("");
  const [pfScore, setPfScore] = useState("");
  const [pfSeverity, setPfSeverity] = useState("");
  const [gcsScore, setGcsScore] = useState("");
  const [gcsSeverity, setGcsSeverity] = useState("");
  const [psofaScore, setPsofaScore] = useState("");
  const [crsTime,setCrsTime] = useState("");
  const [gcsTime,setGcsTime] = useState("")
  const [oiTime,setOiTime] = useState("");
  const [prismTime,setPrismTime] = useState("");
  const [psofaTime,setPsofaTime] = useState("");
  const [crsD_id,setCrsD_id] = useState("");
  const [gcsD_id,setGcsD_id] = useState("")
  const [oiD_id,setOiD_id] = useState("");
  const [prismD_id,setPrismD_id] = useState("");
  const [psofaD_id,setPsofaD_id] = useState("");

  function GetAssessment() {
    axios
      .get("http://localhost:4000/get/Prism/" + GetP_id())
      .then((response) => {
        setPrismScore(response.data[0].Score);
        setPrismTime(response.data[0].Time);
        setPrismD_id(response.data[0].D_id)
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get("http://localhost:4000/get/CRS/" + GetP_id())
      .then((response) => {
        setCRSScore(response.data[0].Score);
        setCrsTime(response.data[0].Time);
        setCrsD_id(response.data[0].D_id);
      })
      .catch(function (error) {
        console.log(error);
      });
    axios
      .get("http://localhost:4000/get/GCS/" + GetP_id())
      .then((response) => {
        setGcsScore(response.data[0].Score);
        setGcsSeverity(response.data[0].Severity);
        setGcsTime(response.data[0].Time);
        setGcsD_id(response.data[0].D_id);
      })
      .catch(function (error) {
        console.log(error);
      });
    axios
      .get("http://localhost:4000/get/OI/" + GetP_id())
      .then((response) => {
        setOiScore(response.data[0].OI_score);
        setOiSeverity(response.data[0].OI_severity);
        setPfScore(response.data[0].PF);
        setPfSeverity(response.data[0].PF_severity);
        setOiTime(response.data[0].Time);
        setOiD_id(response.data[0].D_id);
      })
      .catch(function (error) {
        console.log(error);
      });
    axios
      .get("http://localhost:4000/get/PSofa/" + GetP_id())
      .then((response) => {
        setPsofaScore(response.data[0].Score);
        setPsofaTime(response.data[0].Time);
        setPsofaD_id(response.data[0].D_id);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  useEffect(() => {
    if (localStorage.getItem('user_data') == null) {
      alert("Unauthorised Access")
      navigate("/")
    }
    GetAssessment();
  }, []);

  const { patient } = props;
  return (
    <SafeAreaView style={styles.card}>
      <Text style={styles.prism}>Analysis</Text>
      <View style={[styles.container1]}>
        <View>
          <Text style={styles.assessment}>
            GCS
          </Text>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>Updated on : {gcsTime}</Text>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>Score: {gcsScore}</Text>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>Severity: {gcsSeverity}</Text>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>Last Updated by: {gcsD_id}</Text>
        </View>
      </View>
      <View style={[styles.container2]}>
        <View>
          <Text style={styles.assessment}>
            PRISM III
          </Text>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>Updated on : {prismTime}</Text>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>Score: {prismScore}</Text>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>Last Updated by: {prismD_id}</Text>
        </View>
      </View>
      <View style={[styles.container3]}>
        <View>
          <Text style={styles.assessment}>
            CRS
          </Text>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>Updated on : {crsTime}</Text>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>Score: {crsScore}</Text>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>Last Updated by: {crsD_id}</Text>
        </View>
      </View>
      <View style={[styles.container4]}>
        <View>
          <Text style={styles.assessment}>
            Oxygenation Index
          </Text>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>Updated on : {oiTime}</Text>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>OI Score: {oiScore}</Text>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>OI {oiSeverity}</Text>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>PF Ratio: {pfScore}</Text>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>PF Severity: {oiSeverity}</Text>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>Last Updated by: {oiD_id}</Text>
        </View>
      </View>
      <View style={[styles.container5]}>
        <View>
          <Text style={styles.assessment}>
            PSofa
          </Text>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>Updated on : {psofaTime}</Text>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>Score: {psofaScore}</Text>
        </View>
        <View style={styles.dropContainer}>
          <Text style={styles.dropdownContent}>Last Updated by: {psofaD_id}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

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

export default ReviewDetails;
