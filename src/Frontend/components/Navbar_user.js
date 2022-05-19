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
    TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


const Navbar = () => {
    const navigate = useNavigate();

    return (
        <SafeAreaView>
            <Text style={styles.buttonOpen}>
            <Pressable>
                <Icon.Button
                    // name="plus"
                    style={styles.buttonOpen}
                    onPress={() => navigate("/User_id/Profile")}
                >
                    Profile
                </Icon.Button>
            </Pressable><Pressable>
                <Icon.Button
                    // name="plus"
                    style={styles.buttonOpen}
                    onPress={() => navigate("/User_id/Dashboard")}
                >
                    Dashboard
                </Icon.Button>
            </Pressable>
            <Pressable>
                <Icon.Button
                    // name="plus"
                    style={styles.buttonOpen}
                    onPress={() => navigate("/User_id/Reminder")}
                >
                    Reminders
                </Icon.Button>
            </Pressable>
            <Pressable>
                <Icon.Button
                    // name="plus"
                    style={styles.buttonOpen}
                    onPress={() => {
                        localStorage.removeItem('user_data')
                        navigate("/")
                    }}
                >
                    Logout
                </Icon.Button>
            </Pressable>
            </Text>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    buttonOpen: {
        backgroundColor: "#56BF9C",
    },
    // button:{
    //     backgroundColor: "#569ebf"
    // }
});

export default Navbar;