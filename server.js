const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

let users = [];

app.post('/api/users', (req, res) => {
  const { username } = req.body;
  const newUser = { username, _id: uuidv4(), log: [] };
  users.push(newUser);
  res.json({ username: newUser.username, _id: newUser._id });
});

app.get('/api/users', (req, res) => {
  res.json(users.map(({ username, _id }) => ({ username, _id })));
});

app.post('/api/users/:_id/exercises', (req, res) => {
  const { description, duration, date } = req.body;
  const user = users.find(u => u._id === req.params._id);
  if (!user) return res.json({ error: 'User not found' });

  const exerciseDate = date ? new Date(date) : new Date();
  const exercise = {
    description,
    duration: parseInt(duration),
    date: exerciseDate.toDateString()
  };

  user.log.push(exercise);
  res.json({
    username: user.username,
    description: exercise.description,
    duration: exercise.duration,
    date: exercise.date,
    _id: user._id
  });
});

app.get('/api/users/:_id/logs', (req, res) => {
  const user = users.find(u => u._id === req.params._id);
  if (!user) return res.json({ error: 'User not found' });

  let log = [...user.log];
  const { from, to, limit } = req.query;

  if (from) {
    const fromDate = new Date(from);
    log = log.filter(e => new Date(e.date) >= fromDate);
  }
  if (to) {
    const toDate = new Date(to);
    log = log.filter(e => new Date(e.date) <= toDate);
  }
  if (limit) {
    log = log.slice(0, parseInt(limit));
  }

  res.json({
    username: user.username,
    count: log.length,
    _id: user._id,
    log
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});