import { useFormik } from "formik";
import * as Yup from "yup";
import { useToast } from "react-native-toast-notifications";
import { StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import { useNewLottery } from "../hooks/useNewLottery";

export const AddLotteryScreen = () => {
  const navigation = useNavigation();

  const { createNewLottery } = useNewLottery();
  const toast = useToast();

  const formik = useFormik({
    validationSchema: Yup.object({
      name: Yup.string().min(4).required(),
      prize: Yup.string().min(4).required(),
    }),
    validateOnChange: true,
    validateOnMount: true,
    initialValues: {
      name: "",
      prize: "",
    },
    onSubmit: (e) => {
      console.log({ e });
      createNewLottery({ name: e.name, prize: e.prize })
        .then(() => {
          toast.show("New lottery added successfully!");

          // fix for typing issue: Argument of type '[string]' is not assignable to parameter of type 'never'.
          navigation.navigate({
            name: "Home",
          } as never);
        })
        .catch(() => {
          // Noop! Error is handled somewhere else.
        });
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Add New Lottery</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.formTextInput}
          onChangeText={formik.handleChange("name")}
          value={formik.values.name}
          placeholder="Lottery Name"
          error={Boolean(formik.errors.name && formik.touched.name)}
        />
        {!!(formik.touched.name && formik.errors.name) && (
          <Text style={styles.formTextInputError}>{formik.errors.name}</Text>
        )}

        <TextInput
          style={styles.formTextInput}
          onChangeText={formik.handleChange("prize")}
          value={formik.values.prize}
          placeholder="Lottery Prize"
        />
        {!!(formik.touched.prize && formik.errors.prize) && (
          <Text style={styles.formTextInputError}>{formik.errors.prize}</Text>
        )}

        <Button
          mode="contained"
          style={styles.formButton}
          onPress={() => formik.handleSubmit()}
          disabled={!formik.isValid || formik.isSubmitting}
        >
          Add Lottery
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 36,
    textAlign: "center",
  },
  form: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    textAlign: "center",
  },
  formTextInput: {
    margin: 10,
  },
  formButton: {
    display: "contents",
    marginTop: 10,
  },
  formTextInputError: {
    marginLeft: 10,
    marginRight: 10,
    color: "red",
  },
});
