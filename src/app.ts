
import express from 'express';
import cors from 'cors';
import {getEvents, getEventsByFilter} from '../public/controllers/events-controllers'
const app = express();



app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/events', getEvents)
app.get('/api/events/filtered', getEventsByFilter)


export default app; 