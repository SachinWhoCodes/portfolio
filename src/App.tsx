import { BrowserRouter } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import { PageTransition } from "@/components/PageTransition";
import { AppRoutes } from "./routes";

const App = () => (
  <BrowserRouter>
    <ScrollToTop />
    <PageTransition>
      <AppRoutes />
    </PageTransition>
  </BrowserRouter>
);

export default App;
