const courses =[{id: 1,name:'control', code:'CSE435'}];
const joi = require('joi');

function validateCourse(student){
  const schema2 =joi.object({
    name: joi.string().min(5).required(),
	  code: joi.string().regex(/^[a-zA-Z]{3}[0-9]{3}/).min(6).required(),
	  description: joi.string().max(200)
  });
  return schema2.validate(student);
}

function courses_get_all(req, res){
	res.send(courses);
}

function course_get(req, res){
	const course =  courses.find(c=>c.id===parseInt(req.params.id));
	if(!course) return res.status(404).send('The course was not found');
	res.send(course);
}

function course_post(req, res){
	const {error} = validateCourse(req.body);
	if(error)return res.status(400).send(error.details[0].message);
	const course ={ id: courses.length+1,
		name:req.body.name,
		code:req.body.code,
		description:req.body.description
	};
	courses.push(course);
	res.send(course);
}

function course_put(req, res){
	const course =  courses.find(c=>c.id===parseInt(req.params.id));
	if(!course) return res.status(404).send('The course was not found');
	const {error} = validateCourse(req.body);
	if(error)  return  res.status(400).send(error.details[0].message);
	course.name=req.body.name;
	course.description=req.body.description;
	course.code=req.body.code;
	res.send(course);
}

function course_delete(req, res){
	const course =  courses.find(c=>c.id===parseInt(req.params.id));
	if(!course) return res.status(404).send('The course was not found');
	const index = courses.indexOf(course);
	courses.splice(index,1);
	res.send(course);
}

module.exports.courses_get_all = courses_get_all
module.exports.course_get = course_get
module.exports.course_post = course_post
module.exports.course_put = course_put
module.exports.course_delete = course_delete
