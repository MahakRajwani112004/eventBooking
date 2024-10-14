import { Router } from "express";
import { getAllevents, addNewEvent, bookEvent , deleteEvent , updateEventDetails, updateEventStatus } from "../handlers/eventHandler";

const router= Router();
const BASE_PATH = '/api/events';

//1.GET ALL EVENTS
router.get(BASE_PATH,getAllevents);

//2.ADD a NEW EVENT
router.post(`${BASE_PATH}/add` , addNewEvent);

//3.BOOK EVENT
router.post(`${BASE_PATH}/book`, bookEvent)

//4.DELETE AN EVENT 
router.delete(`${BASE_PATH}/:id`,deleteEvent);

//5.Cancel event
router.put(`${BASE_PATH}/cancel`, updateEventStatus);

router.put(`${BASE_PATH}/update`, updateEventDetails); 




export default router;