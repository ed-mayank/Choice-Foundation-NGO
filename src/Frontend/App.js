import { StyleSheet, Text, View } from 'react-native';
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import GCS from './components/Assessment/Gcs'
import Triage from './components/Assessment/Triage'
import CRS from './components/Assessment/Crs'
import OI from './components/Assessment/OI'
import Prism from './components/Assessment/Prism'
import Login from './components/Login'
import MDash from './components/Maindashboard'
import ProfileUser from './components/ProfileUser'
import ProfilePatient from './components/ProfilePatient'
import Analysis from './components/Assessment/Analysis'
import NavbarUser from './components/Navbar_user';
import NavbarPatient from './components/Navbar_Patient';
import PSofa from './components/Assessment/Psofa'
import Api from './components/Assessment/Api';
import Reminder from './components/Reminder';

const LayoutUser = () => {
  return (
    <div>
      <NavbarUser />
      <div className="container">
        <Outlet />{/*Used to fix navbar by allowing child route*/}
      </div>
    </div>
  );
};

const LayoutPatient = () => {
  return (
    <div>
      <NavbarPatient />
      <div className="container">
        <Outlet />{/*Used to fix navbar by allowing child route*/}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <View style={styles.container}>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/User_id" element={<LayoutUser />} >
          <Route path="/User_id/Profile" element={<ProfileUser />} />
          <Route path="/User_id/Dashboard" element={<MDash />} />
          <Route path="/User_id/Reminder" element={<Reminder />} />
        </Route>
        
        <Route path=  "/Patient_id/:id" element = {<LayoutPatient />} >
          <Route path="/Patient_id/:id" element={<ProfilePatient />} />
          <Route path="/Patient_id/:id/OI" element={<OI />} />
          <Route path="/Patient_id/:id/GCS" element={<GCS />} />
          <Route path="/Patient_id/:id/CRS" element={<CRS />} />
          <Route path="/Patient_id/:id/Prism" element={<Prism />} />
          <Route path="/Patient_id/:id/Triage" element={<Triage />} />
          <Route path="/Patient_id/:id/PSofa" element={<PSofa />} />
          <Route path="/Patient_id/:id/Analysis" element={<Analysis />} />
          <Route path="/Patient_id/:id/Api" element={<Api />} />
        
        </Route>
      </Routes>
    </BrowserRouter>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
    padding: 50
  },
});
