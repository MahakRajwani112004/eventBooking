import React, { useState, useEffect } from 'react';
import { getEvents } from '../../services/api';
import { Card, CardHeader, CardFooter } from '@nextui-org/react';
import { Button } from '@nextui-org/react';
import BookingModal from '../modal/BookingModal';
import { cancelEvent } from '../../services/api';
import AddEventModal from '../modal/AddEventModal'; 
import UpdateEventModal from '../modal/UpdateModal';
import RandomImageCard from './randomCard';

interface Event {
  id: number;
  name: string;
  date: string;
  booked: boolean;
}

const ItemsList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null); 
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

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

  const handleOpenUpdateModal = (event: Event) => {
    setSelectedEvent(event);
    setIsUpdateModalOpen(true);
  };

  const handleEventBooked = (eventId: number) => {
    setEvents(prevEvents =>
      prevEvents.map(ev =>
        ev.id === eventId ? { ...ev, booked: true } : ev
      )
    );
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

  const handleUpdate = (updatedEvent: Event) => {
    setEvents((prevEvents) => 
      prevEvents.map(event => 
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
  };

  const handleAddEventClick = () => {
    setIsAddEventModalOpen(true); 
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-center flex-grow">Events</h1>
        <div className="flex items-center">
          <p className="mr-4">Wanna organize your event?</p>
          <Button color="primary" variant="flat" onClick={handleAddEventClick}>
            Add New Event
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map(event => (
          <Card key={event.id} className="max-w-xs mx-auto" style={{ height: '420px' }}>
            <div className="flex justify-center items-center">
              <RandomImageCard />
            </div>
            <CardHeader className="flex flex-col items-center text-center">
              <p className="text-md font-semibold">{event.name}</p>
              <p className="text-small text-default-500">Date: {event.date}</p>
              <b><p className="text-small text-default-500">Booked: {event.booked ? "Yes" : "No"}</p></b>

              <div className="flex flex-col items-center mt-2">
                {!event.booked && (
                  <Button
                    onClick={() => handleBookClick(event)} 
                    style={{ width: '100px', height: '50px' }} 
                    radius="full"
                    className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg mb-2"
                  >
                    Book Now
                  </Button>
                )}
                {event.booked && (
                  <Button
                    onClick={() => handleCancel(event)} 
                    variant="flat"
                    color="warning"
                    className="mt-2 mb-2"
                  >
                    Cancel
                  </Button>
                )}

                <Button
                  onClick={() => handleOpenUpdateModal(event)} 
                  variant="faded"
                  color="secondary"
                  className="mt-2"
                >
                  Update Details
                </Button>
              </div>
            </CardHeader>
            <CardFooter>
              {/* You can add footer content if needed */}
            </CardFooter>
          </Card>
        ))}
      </div>

      <BookingModal isOpen={isModalOpen} onClose={closeModal} event={selectedEvent} onEventBooked={handleEventBooked} />
      <AddEventModal isOpen={isAddEventModalOpen} onClose={closeAddEventModal} />
      <UpdateEventModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        event={selectedEvent}
        onEventUpdated={handleUpdate}
      />
    </div>
  );
};

export default ItemsList;
