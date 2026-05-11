import { useFormik } from "formik";
import * as Yup from "yup";
import { StyleSheet, View } from "react-native";
import {
  Button,
  Modal,
  Portal,
  Text,
  TextInput,
  ActivityIndicator,
} from "react-native-paper";
import useLotteryRegister from "../hooks/useLotteryRegister";

const registerSchema = Yup.object({
  name: Yup.string()
    .min(4, "Name must be at least 4 characters")
    .required("Name is required"),
});

interface Props {
  visible: boolean;
  onClose: () => void;
  onSubmit: (lotteryIds: Array<string>) => void;
  selectedLotteries: Array<string>;
}

export function RegisterModal({
  visible,
  onClose,
  onSubmit,
  selectedLotteries,
}: Props) {
  const { error, loading, registerToLotteries } = useLotteryRegister();

  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  const formik = useFormik({
    validationSchema: registerSchema,
    validateOnChange: true,
    validateOnMount: true,
    initialValues: {
      name: "",
    },
    onSubmit: ({ name }) => {
      registerToLotteries({ name, lotteries: selectedLotteries })
        .then(() => {
          onSubmit(selectedLotteries);
          handleClose();
        })
        .catch(() => {
          // Noop! Error is handled via the error state
        });
    },
  });

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={handleClose}
        contentContainerStyle={styles.modal}
      >
        <Text variant="headlineSmall" style={styles.title}>
          Register for Lottery
        </Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          Registering for {selectedLotteries.length} lotter
          {selectedLotteries.length > 1 ? "ies" : "y"}
        </Text>

        <TextInput
          mode="outlined"
          label="Enter your name"
          value={formik.values.name}
          onChangeText={formik.handleChange("name")}
          onBlur={formik.handleBlur("name")}
          error={Boolean(formik.errors.name && formik.touched.name)}
          style={styles.input}
        />
        {formik.touched.name && formik.errors.name && (
          <Text style={styles.errorText}>{formik.errors.name}</Text>
        )}

        {error && <Text style={styles.errorText}>{error}</Text>}

        <View style={styles.buttons}>
          <Button mode="outlined" onPress={handleClose} style={styles.button}>
            Cancel
          </Button>
          <Button
            mode="contained"
            onPress={() => formik.handleSubmit()}
            disabled={!formik.isValid || loading}
            style={styles.button}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              "Register"
            )}
          </Button>
        </View>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 16,
    color: "#666",
  },
  input: {
    marginBottom: 8,
  },
  errorText: {
    color: "#d32f2f",
    fontSize: 12,
    marginBottom: 8,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 16,
    gap: 8,
  },
  button: {
    minWidth: 100,
  },
});
