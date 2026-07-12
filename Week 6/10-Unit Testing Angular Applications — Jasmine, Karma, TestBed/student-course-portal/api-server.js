const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const dataFile = path.join(__dirname, 'db.json');
const port = 3000;

app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
});

function readData() {
  const raw = fs.readFileSync(dataFile, 'utf8');
  return JSON.parse(raw);
}

function writeData(data) {
  fs.writeFileSync(dataFile, `${JSON.stringify(data, null, 2)}\n`);
}

function getNextId(courses) {
  return courses.reduce((maxId, course) => Math.max(maxId, Number(course.id) || 0), 0) + 1;
}

app.get('/courses', (req, res) => {
  const data = readData();
  res.json(data.courses);
});

app.get('/courses/:id', (req, res) => {
  const data = readData();
  const course = data.courses.find((entry) => Number(entry.id) === Number(req.params.id));

  if (!course) {
    return res.status(404).json({ message: 'Course not found' });
  }

  res.json(course);
});

app.get('/courses/:id/students', (req, res) => {
  const data = readData();
  const course = data.courses.find((entry) => Number(entry.id) === Number(req.params.id));

  if (!course) {
    return res.status(404).json({ message: 'Course not found' });
  }

  res.json(course.students ?? []);
});

app.post('/courses', (req, res) => {
  const data = readData();
  const newCourse = {
    id: getNextId(data.courses),
    students: [],
    ...req.body,
  };

  data.courses.push(newCourse);
  writeData(data);

  res.status(201).json(newCourse);
});

app.put('/courses/:id', (req, res) => {
  const data = readData();
  const courseIndex = data.courses.findIndex((entry) => Number(entry.id) === Number(req.params.id));

  if (courseIndex === -1) {
    return res.status(404).json({ message: 'Course not found' });
  }

  const existingCourse = data.courses[courseIndex];
  const updatedCourse = {
    ...existingCourse,
    ...req.body,
    id: Number(req.params.id),
    students: existingCourse.students ?? [],
  };

  data.courses[courseIndex] = updatedCourse;
  writeData(data);

  res.json(updatedCourse);
});

app.delete('/courses/:id', (req, res) => {
  const data = readData();
  const filteredCourses = data.courses.filter(
    (entry) => Number(entry.id) !== Number(req.params.id),
  );

  if (filteredCourses.length === data.courses.length) {
    return res.status(404).json({ message: 'Course not found' });
  }

  data.courses = filteredCourses;
  writeData(data);

  res.status(204).send();
});

app.get('/health', (req, res) => {
  res.json({ ok: true });
});

app.listen(port, () => {
  console.log(`API server listening on http://localhost:${port}`);
});
