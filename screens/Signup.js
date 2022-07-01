import React, { useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	Button,
	TextInput,
	Switch,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

export default function Signup({ navigation }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isEnabled, setIsEnabled] = useState(false);
	const [bgColor, setBgColor] = useState("white");
	const [titleColor, setTitleColor] = useState("black");
	const toggleSwitch = () => {
		if (bgColor == "white") {
			setBgColor("black");
			setTitleColor("white");
		}
		if (bgColor == "black") {
			setBgColor("white");
			setTitleColor("black");
		}
		setIsEnabled((previousState) => !previousState);
	};

	const onHandleSignup = () => {
		if (email !== "" && password !== "") {
			createUserWithEmailAndPassword(auth, email, password)
				.then(() => console.log("Signup success"))
				.catch((err) => console.log(`Login err: ${err}`));
		}
	};

	return (
		<View
			style={{
				flex: 1,
				backgroundColor: bgColor,
				paddingTop: 50,
				paddingHorizontal: 12,
			}}
		>
			<Text
				style={{
					fontSize: 24,
					fontWeight: "600",
					color: titleColor,
					alignSelf: "center",
					paddingBottom: 24,
				}}
			>
				Create new account
			</Text>
			<TextInput
				style={styles.input}
				placeholder='Enter email'
				autoCapitalize='none'
				keyboardType='email-address'
				textContentType='emailAddress'
				value={email}
				onChangeText={(text) => setEmail(text)}
			/>
			<TextInput
				style={styles.input}
				placeholder='Enter password'
				autoCapitalize='none'
				autoCorrect={false}
				secureTextEntry={true}
				textContentType='password'
				value={password}
				onChangeText={(text) => setPassword(text)}
			/>
			<Button onPress={onHandleSignup} color='#f57c00' title='Signup' />
			<Button
				onPress={() => navigation.navigate("Login")}
				title='Go to Login'
			/>
			<Switch
				trackColor={{ false: "#767577", true: "#81b0ff" }}
				thumbColor={isEnabled ? "#f5dd4b" : "f4fd3f"}
				style={{ alignItems: "center" }}
				ios_backgroundColor='#3e3e3e'
				onValueChange={toggleSwitch}
				value={isEnabled}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	input: {
		backgroundColor: "#fff",
		marginBottom: 20,
		fontSize: 16,
		borderWidth: 1,
		borderColor: "#333",
		borderRadius: 8,
		padding: 12,
	},
});
