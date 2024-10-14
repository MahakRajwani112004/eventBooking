import React, { useState, useEffect } from 'react';
import { getEvents } from '../../services/api';
import { Card, CardHeader, CardFooter, Image } from '@nextui-org/react';
import { Button } from '@nextui-org/react';
import BookingModal from './BookingModal'; // Ensure this path is correct
import { cancelEvent } from '../../services/api';
import AddEventModal from './AddEventModal'; // Import your Add Event modal

interface Event {
  id: number;
  name: string;
  date: string;
  booked: boolean;
}

const ItemsList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for booking modal visibility
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false); // State for Add Event modal visibility
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null); // State for the selected event

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getEvents();
        console.log(data);
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchData();
  }, []);

  const handleBookClick = (event: Event) => {
    setSelectedEvent(event); 
    setIsModalOpen(true); 
  };

  const closeModal = () => {
    setIsModalOpen(false); 
    setSelectedEvent(null); 
  };

  const closeAddEventModal = () => {
    setIsAddEventModalOpen(false);
  };

  const handleCancel = async (event: Event) => {
    const cancelInfo = {
      eventId: event.id, 
    };

    try {
      await cancelEvent(cancelInfo);
      alert("Cancelled successfully");
      console.log(`Cancelled booking for event: ${event.name}`);

     
      const updatedEvents = await getEvents(); 
      setEvents(updatedEvents);
    } catch (error) {
      console.error('Error canceling event:', error);
    }
  };

  const handleUpdate = (event: Event) => {
   
    console.log(`Updating details for event: ${event.name}`);
  };

  const handleAddEventClick = () => {
    setIsAddEventModalOpen(true); 
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Events</h1>
      <Button color="primary" variant="flat" onClick={handleAddEventClick}>
        Add New Event
      </Button>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map(event => (
          <Card key={event.id} className="max-w-[400px]">
            <CardHeader className="flex gap-3">
              <Image
                alt="Event Image"
                height={40}
                radius="sm"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvliEFixG4-e5fVA1rMAzvLBMFzWLbrvXWHg&s" 
                width={40}
              />
              <div className="flex flex-col">
                <p className="text-md font-semibold">{event.name}</p>
                <p className="text-small text-default-500">Date: {event.date}</p>
                <b><p className="text-small text-default-500">Booked: {event.booked ? "Yes" : "No"}</p></b>

                {!event.booked && (
                  <Button
                    onClick={() => handleBookClick(event)} 
                    style={{ width: '100px', height: '50px' }} 
                    radius="full"
                    className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
                  >
                    Book Now
                  </Button>
                )}
                {event.booked && (
                  <Button
                    onClick={() => handleCancel(event)} 
                    variant="flat"
                    color="warning"
                    className="mt-2"
                  >
                    Cancel
                  </Button>
                )}

             
                <Button
                  onClick={() => handleUpdate(event)}
                  variant="faded"
                  color="secondary"
                  className="mt-2"
                >
                  Update Details
                </Button>
              </div>
            </CardHeader>
            <CardFooter>
            
            </CardFooter>
          </Card>
        ))}
      </div>

 
      <BookingModal isOpen={isModalOpen} onClose={closeModal} event={selectedEvent} />
      
     
      <AddEventModal isOpen={isAddEventModalOpen} onClose={closeAddEventModal} />
    </div>
  );
};

export default ItemsList;
