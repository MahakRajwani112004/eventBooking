import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// Adjust the path if necessary
import { Home } from "./Pages/home/home"; // Adjust the path if necessary
import { BookingDetails } from "./Pages/home/bookingDetails";
import { Mylearning } from "./components/mylearning";



export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-booking-details" element={<BookingDetails/>} />
        <Route path="/my-learnings" element = {<Mylearning/>}/>
      </Routes>
    </Router>
  );
}
