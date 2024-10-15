import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import {  updateEvent } from "../../services/api";

interface Event {
    id: number;
    name: string;
    date: string;
    booked: boolean;
  }
  
  interface UpdateEventProps {
    isOpen: boolean;
    onClose: () => void;
    event: Event | null; 
    onEventUpdated: (updatedEvent: Event) => void; // New prop for event update callback
  }
  

const UpdateEventModal: React.FC<UpdateEventProps> = ({ isOpen, onClose, event, onEventUpdated, }) => {
  // State variables to hold the updated event details
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");

  // Use useEffect to set initial values when the event changes
  useEffect(() => {
    if (event) {
      setEventName(event.name);
      setEventDate(event.date);
    }
  }, [event]);

  // Handle form submission (update logic)
  const handleUpdate = async () => {
    // Ensure event is defined before trying to access its properties
    if (!event) return;
  
    // Log the updated event data
    console.log("Updated Event:", { id: event.id, name: eventName, date: eventDate });
  
    try {
      // Call the API or function to update the event
      await updateEvent({
        id: event.id, // Pass the event id
        name: eventName, // Updated name
        date: eventDate, // Updated date
      });
  
      // Optionally, refresh the events list after the update
    // const updatedEvents = await getEvents();
    
  
      // Close the modal after successful update
      onEventUpdated({ id: event.id, name: eventName, date: eventDate ,booked:event.booked});
      onClose();
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };
  

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Update Event</ModalHeader>
        <ModalBody>
          <Input
            label="Event Name"
            placeholder="Enter event name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
          <Input
            label="Event Date"
            type="date"
            placeholder="Enter event date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Close
          </Button>
          <Button color="primary" onPress={handleUpdate}>
            Update Event
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateEventModal;
