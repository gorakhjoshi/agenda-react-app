import { BrowserRouter as Router } from "react-router-dom";
import Container from "./screens/Container";
import Navbar from "./screens/Navbar";

function App() {
  return (
    <Router>
      <Container>
        <Navbar />
      </Container>
    </Router>
  );
}
export default App;
