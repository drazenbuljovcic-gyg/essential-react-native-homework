import { PaperProvider } from "react-native-paper";
import { ToastProvider } from "react-native-toast-notifications";

import { Navigation } from "./router/navigation";

export default function App() {
  return (
    <ToastProvider>
      <PaperProvider>
        <Navigation />
      </PaperProvider>
    </ToastProvider>
  );
}
