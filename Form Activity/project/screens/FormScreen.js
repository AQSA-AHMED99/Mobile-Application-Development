import React, { useState } from "react";
import { View, Text, TextInput, Button, Modal, StyleSheet, Alert } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

export default function FormScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  const formSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid Email").required("Email required"),
    contact: Yup.string().min(11, "Contact must be 11 digits").required("Contact required"),
    city: Yup.string().required("City required"),
    age: Yup.number().min(1, "Invalid Age").required("Age required"),
    password: Yup.string().min(4, "Min 4 characters").required("Password required"),
    address: Yup.string().required("Address required"),
  });

  const showSubmitAlert = () => {
    Alert.alert("Success", "Form Submitted Successfully!");
  };

  const showCloseAlert = () => {
    Alert.alert("Modal Closed", "Form was closed!");
  };

  return (
    <View style={styles.container}>
      <Button title="Open Form" onPress={() => setModalVisible(true)} />

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContent}>
          <Text style={styles.title}>User Form</Text>

          <Formik
            initialValues={{
              name: "",
              email: "",
              contact: "",
              city: "",
              age: "",
              password: "",
              address: "",
            }}
            validationSchema={formSchema}
            onSubmit={(values) => {
              console.log(values);
              showSubmitAlert();
              setModalVisible(false);
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <View>
                {/* Name */}
                <Text>Name:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Name"
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  value={values.name}
                />
                {touched.name && errors.name && <Text style={styles.err}>{errors.name}</Text>}

                {/* Email */}
                <Text>Email:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Email"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                />
                {touched.email && errors.email && (
                  <Text style={styles.err}>{errors.email}</Text>
                )}

                {/* Contact */}
                <Text>Contact No:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="03XXXXXXXXX"
                  keyboardType="numeric"
                  onChangeText={handleChange("contact")}
                  onBlur={handleBlur("contact")}
                  value={values.contact}
                />
                {touched.contact && errors.contact && (
                  <Text style={styles.err}>{errors.contact}</Text>
                )}

                {/* City */}
                <Text>City:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter City"
                  onChangeText={handleChange("city")}
                  onBlur={handleBlur("city")}
                  value={values.city}
                />
                {touched.city && errors.city && <Text style={styles.err}>{errors.city}</Text>}

                {/* Age */}
                <Text>Age:</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  placeholder="Enter Age"
                  onChangeText={handleChange("age")}
                  onBlur={handleBlur("age")}
                  value={values.age}
                />
                {touched.age && errors.age && <Text style={styles.err}>{errors.age}</Text>}

                {/* Password */}
                <Text>Password:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Password"
                  secureTextEntry
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                />
                {touched.password && errors.password && (
                  <Text style={styles.err}>{errors.password}</Text>
                )}

                {/* Address */}
                <Text>Address:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Address"
                  onChangeText={handleChange("address")}
                  onBlur={handleBlur("address")}
                  value={values.address}
                />
                {touched.address && errors.address && (
                  <Text style={styles.err}>{errors.address}</Text>
                )}

                <Button title="Submit" onPress={handleSubmit} />

                <Button
                  title="Close"
                  color="red"
                  onPress={() => {
                    showCloseAlert();
                    setModalVisible(false);
                  }}
                />
              </View>
            )}
          </Formik>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  modalContent: { marginTop: 10, padding: 20 },
  input: { borderWidth: 1, padding: 10, marginVertical: 10, borderRadius: 8 },
  err: { color: "red", fontSize: 14 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
});
