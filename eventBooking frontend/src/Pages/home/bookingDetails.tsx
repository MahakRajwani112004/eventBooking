import { useEffect, useState } from "react";
import { Layout } from "../../components/common/Layout";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { cancelEvent, getEvents } from "../../services/api";
import { Button } from '@nextui-org/react';


interface Event {
    id: number;
    name: string;
    date: string;
    booked: boolean;
  }

export const BookingDetails = () => {
    
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch events from the API
    const fetchEvents = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/events/");
            if (!response.ok) {
                throw new Error("Failed to fetch events");
            }
            const data = await response.json();
            console.log("Fetched events:", data); // Log the fetched data
            setEvents(data); // Assuming data is an array of event objects
        } catch (err) {
            console.error(err); // Log the error to the console for debugging
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Filter booked events
    const bookedEvents = events.filter(event => event.booked === true);

    useEffect(() => {
        fetchEvents();
    }, []);

    if (loading) return <p>Loading events...</p>;
    if (error) return <p>Error: {error}</p>;
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
      

    return (
        <Layout>
          
            {bookedEvents.length === 0 ? (
                <p>No booked events found.</p>
            ) : (
                <Table aria-label="Booked Events Table"
                style={{
                    backgroundColor: 'grey',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
                    color: 'black',
                    borderRadius: '8px', // Optional: for rounded corners
                    overflow: 'hidden', // Prevents shadow overflow
                }}
>
                    <TableHeader style={{
                        color:'black'
                    }}>
                        <TableColumn>Event Name</TableColumn>
                        <TableColumn>Booked By</TableColumn>
                        <TableColumn>Booking Person Email</TableColumn>
                        <TableColumn>Status</TableColumn>
                        <TableColumn>Cancel</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {bookedEvents.map(event => (
                            <TableRow key={event.id}>
                                <TableCell>{event.name}</TableCell>
                                <TableCell>{event.bookedBy}</TableCell>
                                <TableCell>{event.bookingpersonemail}</TableCell>
                                <TableCell>{event.booked ? "Booked" : "Available"}</TableCell>
                                <TableCell>  <Button
                    onClick={() => handleCancel(event)} 
                    variant="flat"
                    color="warning"
                    className="mt-2"
                  >
                    Cancel
                  </Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </Layout>
    );
};
