const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

mongoose.connect('mongodb://localhost:27017/jobtracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Job = mongoose.model('Job', new mongoose.Schema({
  company: String,
  position: String,
  status: String,
  appliedDate: Date,
}));

app.use(cors());
app.use(express.json());

app.get('/jobs', async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
});

app.post('/jobs', async (req, res) => {
  const newJob = new Job(req.body);
  await newJob.save();
  res.json(newJob);
});

app.put('/jobs/:id', async (req, res) => {
  const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedJob);
});

app.delete('/jobs/:id', async (req, res) => {
  await Job.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
