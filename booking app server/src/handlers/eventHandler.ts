import { Request, response, Response } from "express";

import { Event } from "../models/eventModel";






//1.GET ALL EVENTS
export const getAllevents=  async(request: Request, response : Response)=>{
       try{
        const allEvents = await Event.find();
        console.log(allEvents); 
        response.status(200).json(allEvents);
       }
       catch(err)
       {
        response.status(500).json({error:'Failed to fetch the events'});
       }
};



//2.ADD A NEW EVENT
export const addNewEvent = async(request: Request, response: Response) => {
  const { id, name, date } = request.body;

  if (typeof id === 'undefined' || typeof name === 'undefined' || typeof date === 'undefined') {
   response.status(400).json({ error: "Missing required fields: id, name, and date are required." });
  }

  try {
    const newEvent = new Event({ id, name, date, booked: false });
    await newEvent.save();
    response.status(201).json(newEvent);
  } catch (err) {
    response.status(500).json({ error: 'Failed to add the event' });
  }
};


//3.BOOK AN EVENT
export const bookEvent  = async( request: Request, response : Response)=>{
  const { eventId , bookedBy , email}= request.body;

  try{
    const booking = await Event.findOne({id:eventId});
    if(!booking || booking.booked)
    {

      throw new Error('Event not found or may be it is already booked');
    }
    booking.booked= true;
    booking.bookedBy = bookedBy; 
    booking.bookingpersonemail= email;
    await booking.save();
    response.status(200).json({message : 'Event booked succesfully 👍'});
  }
  catch(err:any){
      

        response.status(500).json({ message: 'Failed to book an event', error: err.message });
  }
}


//4.Delete an event 

export const deleteEvent = async(request: Request , response:Response)=>{
   const { id} = request.params;
   console.log("Received eventId:", id);
   const parsedId = parseInt(id);
  if (isNaN(parsedId)) {
    throw new Error("Invalid event ID") ;
  }
   try{
      const deletedEvent = await Event.findOneAndDelete({id : parsedId});

      if(!deletedEvent)
      {
         throw new Error("Could'not find the event ");
      }
      response.status(200).json({message : "Event succesfully deleted"});
   }
   catch(err)
   {
    console.error('Error deleting event:', err); 
    response.status(500).json({message : 'Failed to delete an event'});
   }


}


//5.UPDATE THE EVENT STATUS (Cancel)

export const updateEventStatus = async(request:Request , response:Response)=>{
  const { eventId }= request.body;
   

  try{
        const  event = await Event.findOne({id : eventId});
        if(!event)
        {

           throw new Error( 'Event not found');
        }
        if(!event.booked)
        {

          throw new Error ('Event is already not booked');
        }
        event.booked= false;
        event.bookedBy = ""; 
        event.bookingpersonemail = "";   
        await event.save();
        response.status(200).json({message :"Successfully canceled your event booking "})
  }
  catch(err)
  {
    response.status(500).json({ error: 'Failed to cancel booking' });
  }


}

//6.UPDATE THE EXISTING EVENT DETAILS

export const updateEventDetails= async ( request:Request , response : Response)=>{
  const { id , name , date , booked} = request.body;
  try{
    const event = await Event.findOne({id:id});
    if(!event)
    {

      throw new Error('Event not found');
    }

    if (name !== undefined) event.name = name; 
    if (date !== undefined) event.date = date; 
    if (booked !== undefined) event.booked = booked; 

    await event.save();

    response.status(200).json({ message: 'Event updated successfully!', event });
  }
  catch(err)
  {
    response.status(500).json({ error: 'Failed to update  event' });
  }
}












// export const bookEvent=( request:Request , response:Response)=>{
//     const { eventId , name ,email }:Booking = request.body;

//     if (!eventId || !name || !email)
//     {
//         return response.status(400).json({message : " All data should be given , something is missing please check"})
//     }


//     const event = events.find(event => event.id )
//     if(!event)
//     {
//            response.send("event not found")
//     }
// }