import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { addEvent } from "../../services/api"; 
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

interface AddEventProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddEventModal: React.FC<AddEventProps> = ({ isOpen, onClose }) => {
  const [id, setId] = useState<number | "">(""); 
  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  const handleAddEvent = async () => {

    if (typeof id === 'number' ) {
      const newEvent = {
        id,
        name,
        date,
        booked: false, 
      };

      try {
        await addEvent(newEvent);
        toast.success("Event added successfully!", {
          position: "top-center",
          autoClose: 10000,
          closeOnClick: true,
        });

     
        setId(""); // Reset id state
        setName("");
        setDate("");

        // Close the modal
        onClose();
      } catch (error) {
        console.error("Error adding event:", error);
        toast.error("Failed to add event.", {
          position: "top-center",
          autoClose: 10000,
          closeOnClick: true,
        });
      }
    } else {
      toast.error("Invalid ID. Please enter a number.", {
        position: "top-center",
        autoClose: 10000,
        closeOnClick: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Add New Event</ModalHeader>
        <ModalBody>
          <Input
            label="Event ID"
            placeholder="Enter event id"
            value={id === "" ? "" : id.toString()} // Convert number to string for display
            onChange={(e) => {
              const value = e.target.value;

              // Allow only numbers or empty
              if (/^\d*$/.test(value)) {
                setId(value === "" ? "" : parseInt(value, 10)); // Set to empty string or parsed number
              }
            }} 
          />
          <Input
            label="Event Name"
            placeholder="Enter event name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            label="Event Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Close
          </Button>
          <Button color="primary" onPress={handleAddEvent}>
            Add Event
          </Button>
        </ModalFooter>
      </ModalContent>
      <ToastContainer />
    </Modal>
  );
};

export default AddEventModal;
