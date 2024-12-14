import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/index";
import { ChecklistDetails, Dashboard } from "./pages/index";

function App() {
  return (
    <div className="max-w-screen-lg mx-auto">
      <Router>
        <Header />
        <div>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/checklist/:id" element={<ChecklistDetails />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
