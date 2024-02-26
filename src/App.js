import MainPage from './pages/mainPage';
import TrackingPage from './pages/trackingPage';
import MainLayout from './layouts/main/main';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
              <Route path="/" element={<MainPage />} />
              <Route
              path="trackShipment/:shipmentNo"
              element={<TrackingPage />}
            />
          </Route>
        </Routes>
      </Router>
  );
}

export default App;
