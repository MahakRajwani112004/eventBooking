import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { bookEvent } from "../../services/api";
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

interface Event {
  id: number;
  name: string;
  date: string;
  booked: boolean;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event | null; 
  onEventBooked: (eventId: number) => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, event, onEventBooked }) => {
  const [bookedBy, setBookedBy] = React.useState("");
  const [email, setEmail] = React.useState("");

  const handleSubmit = async () => {
    if (event) {
      const bookingInfo = {
        eventId: event.id,
        bookedBy,
        email,
      };
  
      try {
        await bookEvent(bookingInfo);
  
        // Show success toast
        toast.success("Event booked successfully!", {
          position: "top-center",
          autoClose: 10000,
          closeOnClick: true,
        });
  
        // Call the function passed from parent to update event status
        onEventBooked(event.id);
  
        setBookedBy("");
        setEmail("");
  
        onClose();
      } catch (error) {
        console.error('Error booking event:', error);
      }
    } else {
      console.error("No event selected for booking.");
    }
  };
  

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Book Event</ModalHeader>
        <ModalBody>
          <Input
            label="Your Name"
            placeholder="Enter your name"
            value={bookedBy}
            onChange={(e) => setBookedBy(e.target.value)}
          />
          <Input
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

       
          {event && (
            <div className="mt-4">
                <p>Event Id : { event.id}</p>
              <p className="font-semibold">Event: {event.name}</p>
              <p>Date: {event.date}</p>
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Close
          </Button>
          <Button color="primary" onPress={handleSubmit}>
            Book Now
          </Button>
        </ModalFooter>
      </ModalContent>
    
      <ToastContainer />
    </Modal>
  );
};

export default BookingModal;
