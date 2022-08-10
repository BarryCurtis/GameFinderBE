
import express from 'express';
import cors from 'cors';
import {getEvents, getEventsByFilter} from '../public/controllers/events-controllers'
const app = express();
const port = 3000;


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/events', getEvents)
app.get('/api/events/filtered', getEventsByFilter)

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

exports["default"] = app; 
module.exports = exports["default"];