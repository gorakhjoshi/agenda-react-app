import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import ViewAgendaNew from "./Pages/ViewAgenda";
import Container from "./screens/Container";
import Navbar from "./screens/Navbar";

function App() {
  return (
    <Router>
      <Container>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/agendas/view/:id" element={<ViewAgendaNew />} />
        </Routes>
      </Container>
    </Router>
  );
}
export default App;
