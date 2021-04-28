const express = require('express');
const app = express();
const {courses_get_all, course_get, course_post, course_put, course_delete} = require('./course_controller')
const {student_get_all, student_get, student_post, student_put, student_delete} = require('./student_controller')

app.use(express.json());
app.use(express.urlencoded());
//---------------------coooourseeees----------------------------------------------

//get courses---------------------------------------------------
app.get('/', (req,res) => {res.send('hello from here!!!!!');});
app.get('/api/courses', courses_get_all);
app.get('/api/courses/:id', course_get);
//post courses----------------------------------------------------
app.post('/api/courses', course_post);
//-----------------UPDATE COURSES-------------------------
app.put('/api/courses/:id', course_put);
//---------------------------DELETE----------------------
app.delete('/api/courses/:id',course_delete);
//----------------------------------STUDEEEEENTS---------------------

app.get('/api/students', student_get_all);
app.get('/api/students/:id', student_get);
//-------------------------------------------------------------------
app.post('/api/students', student_post);
//---------------------------------------------------
app.put('/api/students/:id', student_put);
//-------------------------------------------------------
app.delete('/api/students/:id',student_delete);
//--------------------------port-------------------------

const course_html = `
<form action="/api/courses/" method="POST">
  <label for="name">Course name:</label><br>
  <input type="text" id="name" name="name"><br>
  <label for="code">Course code:</label><br>
  <input type="text" id="code" name="code"><br>
  <label for="description">Course descriptions:</label><br>
  <input type="text" id="description" name="description"><br>
  <input type="submit"/>
</form>
`

const student_html = `
<form action="/api/students/" method="POST">
  <label for="name">Student name:</label><br>
  <input type="text" id="name" name="name"><br>
  <label for="id">Student ID:</label><br>
  <input type="text" id="id" name="code"><br>
  <input type="submit"/>
</form>
`

app.get('/web/courses/create', function(req, res) {
  res.send(course_html);
});

app.get('/web/students/create', function(req, res) {
  res.send(student_html);
});

const port =process.env.PORT || 2000;
app.listen(port, ()=> console.log(`listening on port ${port}...`));
