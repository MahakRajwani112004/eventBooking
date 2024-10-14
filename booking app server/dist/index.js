"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const app = express();
const PORT = 5000;
app.use((0, cors_1.default)());
app.use(express.json());
let events = [];
let bookings = [];
// Create some sample events
for (let i = 1; i <= 5; i++) {
    events.push({
        id: i,
        name: `Event ${i}`,
        date: `2024-10-${10 + i}`,
        booked: false,
    });
}
// Get all events
app.get('/api/events', (reques, res) => {
    res.json(events);
});
// Book an event
app.post('/api/book', (req, res) => {
    const { eventId, name, email } = req.body;
    // Find the event
    const event = events.find(event => event.id === eventId);
    if (!event || event.booked) {
        return res.status(400).json({ message: 'Event not found or already booked.' });
    }
    // Book the event
    event.booked = true;
    bookings.push({ eventId, name, email });
    res.status(200).json({ message: 'Event booked successfully!' });
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
