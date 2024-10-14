import mongoose, { Schema, Document } from 'mongoose';

export interface IEvent extends Document {
    id: number;
    name: string;
    date: string;
    booked: boolean;
    bookedBy: string,
    bookingpersonemail: string,
}


const EventSchema: Schema =  new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    date: { type: String, required: true },
    booked: { type: Boolean, default: false },
    bookedBy: { type: String }, 
    bookingpersonemail: { type: String },
});


export const Event = mongoose.model<IEvent>('Event', EventSchema);
