import { useNavigate, useParams, useLocation } from "react-router-dom";
import  {  useState } from 'react';

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
    const [str,setStr] = useState("");
    const [ind,setInd] = useState(0);
    const location = useLocation();
    return (
        <SafeAreaView>
            <Text style={styles.buttonOpen}>
            <Pressable>
                <Icon.Button
                    // name="head" 
                    style={styles.buttonOpen}
                    onPress={() => {
                        var c=0;
                        var index=0
                        var path =location.pathname
                        for(var i=0;i<path.length;i++)
                        {
                            if(path.charAt(i)=='/')
                            {
                                c++;
                                
                            }
                            if(c==3)
                            {
                                index=i
                                setInd(i);
                                break;
                            }
                            if(c==2)
                            {
                                index=path.length;
                            }
                        }
                        navigate(path.substring(0,index))
                    }}
                >
                   Patient Profile
                </Icon.Button>
            </Pressable>
            <Pressable>
                <Icon.Button
                    // name="plus"
                    style={styles.buttonOpen}
                    onPress={() => {
                        var c=0;
                        var index=0
                        var path =location.pathname
                        for(var i=0;i<path.length;i++)
                        {
                            if(path.charAt(i)=='/')
                            {
                                c++;
                                
                            }
                            if(c==3)
                            {
                                index=i
                                setInd(i);
                                break;
                            }
                            if(c==2)
                            {
                                index=path.length;
                            }
                        }
                        navigate(path.substring(0,index)+"/Triage")
                    }}
>
                    Triage
                </Icon.Button>
            </Pressable>
            <Pressable>
                <Icon.Button
                    // name="plus"
                    style={styles.buttonOpen}
                    onPress={() => {
                        var c=0;
                        var index=0
                        var path =location.pathname
                        for(var i=0;i<path.length;i++)
                        {
                            if(path.charAt(i)=='/')
                            {
                                c++;
                                
                            }
                            if(c==3)
                            {
                                index=i
                                setInd(i);
                                break;
                            }
                            if(c==2)
                            {
                                index=path.length;
                            }
                        }
                        navigate(path.substring(0,index)+"/GCS")
                    }}
>
                    GCS
                </Icon.Button>
            </Pressable>
            <Pressable>
                <Icon.Button
                    // name="plus"
                    style={styles.buttonOpen}
                    onPress={() => {
                        var c=0;
                        var index=0
                        var path =location.pathname
                        for(var i=0;i<path.length;i++)
                        {
                            if(path.charAt(i)=='/')
                            {
                                c++;
                                
                            }
                            if(c==3)
                            {
                                index=i
                                setInd(i);
                                break;
                            }
                            if(c==2)
                            {
                                index=path.length;
                            }
                        }
                        navigate(path.substring(0,index)+"/CRS")
                    }}
>
                    CRS
                </Icon.Button>
            </Pressable>
            <Pressable>
                <Icon.Button
                    // name="plus"
                    style={styles.buttonOpen}
                    onPress={() => {
                        var c=0;
                        var index=0
                        var path =location.pathname
                        for(var i=0;i<path.length;i++)
                        {
                            if(path.charAt(i)=='/')
                            {
                                c++;
                                
                            }
                            if(c==3)
                            {
                                index=i
                                setInd(i);
                                break;
                            }
                            if(c==2)
                            {
                                index=path.length;
                            }
                        }
                        navigate(path.substring(0,index)+"/Psofa")
                    }}
>
                    PSofa
                </Icon.Button>
            </Pressable>
            <Pressable>
                <Icon.Button
                    // name="plus"
                    style={styles.buttonOpen}
                    onPress={() => {
                        var c=0;
                        var index=0
                        var path =location.pathname
                        for(var i=0;i<path.length;i++)
                        {
                            if(path.charAt(i)=='/')
                            {
                                c++;
                                
                            }
                            if(c==3)
                            {
                                index=i
                                setInd(i);
                                break;
                            }
                            if(c==2)
                            {
                                index=path.length;
                            }
                        }
                        navigate(path.substring(0,index)+"/Prism")
                    }}
>
                    Prism
                </Icon.Button>
            </Pressable>
            <Pressable>
                <Icon.Button
                    // name="plus"
                    style={styles.buttonOpen}
                    onPress={() => {
                        var c=0;
                        var index=0
                        var path =location.pathname
                        for(var i=0;i<path.length;i++)
                        {
                            if(path.charAt(i)=='/')
                            {
                                c++;
                                
                            }
                            if(c==3)
                            {
                                index=i
                                setInd(i);
                                break;
                            }
                            if(c==2)
                            {
                                index=path.length;
                            }
                        }
                        navigate(path.substring(0,index)+"/OI")
                    }}
>
                    Oxygenation Index
                </Icon.Button>
            </Pressable>
            <Pressable>
                <Icon.Button
                    // name="plus"
                    style={styles.buttonOpen}
                    onPress={() => {
                        var c=0;
                        var index=0
                        var path =location.pathname
                        for(var i=0;i<path.length;i++)
                        {
                            if(path.charAt(i)=='/')
                            {
                                c++;
                                
                            }
                            if(c==3)
                            {
                                index=i
                                setInd(i);
                                break;
                            }
                            if(c==2)
                            {
                                index=path.length;
                            }
                        }
                        navigate(path.substring(0,index)+"/API")
                    }}
>
                    API
                </Icon.Button>
            </Pressable>
            <Pressable>
                <Icon.Button
                    // name="plus"
                    style={styles.buttonOpen}
                    onPress={() => {
                        var c=0;
                        var index=0
                        var path =location.pathname
                        for(var i=0;i<path.length;i++)
                        {
                            if(path.charAt(i)=='/')
                            {
                                c++;
                                
                            }
                            if(c==3)
                            {
                                index=i
                                setInd(i);
                                break;
                            }
                            if(c==2)
                            {
                                index=path.length;
                            }
                        }
                        navigate(path.substring(0,index)+"/Analysis")
                    }}
>
                    Analysis
                </Icon.Button>
            </Pressable>
            <Pressable>
                <Icon.Button
                    // name="plus"
                    style={styles.buttonOpen}
                    onPress={() => {
                        navigate("/User_id/Profile")
                    }}
>
                    Your Profile
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