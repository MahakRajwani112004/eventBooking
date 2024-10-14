import mongoose, { Schema, Document } from 'mongoose';


export interface Event{
    id:number,
    name: string,
    date:string,
    booked:boolean
}

export interface Booking {
    eventId: number;
    name: string;
    email: string;
  }