import axios from 'axios';


// Set up the base URL for your API
const API_URL = 'http://localhost:3000/api/events';


interface BookingInfo {
    eventId: number;
    bookedBy: string;
    email: string;
  }

  interface CancelInfo{
    eventId:number
  }
  interface addEvent{
    id:number,
    name:string,
    date:string
  }

export const getEvents = async () => {
    try {
      const response = await axios.get(`${API_URL}/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching items:', error);
      throw error;
    }
  };

  export const bookEvent = async ({ eventId, bookedBy, email }: BookingInfo) => {
    try {
      const response = await axios.post(`${API_URL}/book`, {
        eventId,
        bookedBy,
        email,
      });
  
  
      console.log('Event booked successfully:', response.data);
    } catch (error) {
          
      if (axios.isAxiosError(error)) {
       
        console.error('Error booking event:', error.response?.data || error.message);
      } else {
   
        console.error('Error booking event:', error);
      }
    }
  };
  export const addEvent = async ({ id, name, date }: addEvent) => {
    try {
      const response = await axios.post(`${API_URL}/add`, {
        id,
        name,
        date
      });
  

      console.log('Event added successfully:', response.data);
    } catch (error) {

      if (axios.isAxiosError(error)) {

        console.error('Error adding  event:', error.response?.data || error.message);
      } else {
 
        console.error('Error adding event:', error);
      }
    }
  };
  export const cancelEvent = async({eventId}:CancelInfo)=>{
    const response = await axios.put(`${API_URL}/cancel`, {
        eventId
        })

        console.log(response.data);
  }
  