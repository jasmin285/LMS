const students =[{id: 1,name:'yasmin', code:'1601683'}];
const joi = require('joi');

function validateStudent(student){
  const schema2 =joi.object({
    name: joi.string().regex(/[A-Za-z-']*$/).required(),
    code: joi.string().min(7).max(7).required(),
    id:joi.number().integer()
  });
  return schema2.validate(student);

}

function student_get_all(req, res){
	res.send(students);
}

function student_get(req, res){
	const student =  students.find(c=>c.id===parseInt(req.params.id));
	if(!student) res.status(404).send('The student was not found');
	res.send(student);
}

function student_post(req, res){
	const {error} = validateStudent(req.body);
	if(error) return res.status(400).send(error.details[0].message);
	const student ={ id: students.length+1,
		name:req.body.name,
		code:req.body.code
	};
	courses.push(student);
	res.send(student);
}

function student_put(req, res){
	const student =  students.find(c=>c.id===parseInt(req.params.id));
	if(!student){return res.status(404).send('The student was not found');}
	const {error} = validateStudent(req.body);
	if(error){return res.status(400).send(error.details[0].message);}
	student.name=req.body.name;
	student.code=req.body.code;
	res.send(student);
}

function student_delete(req, res){
	const student =  students.find(c=>c.id===parseInt(req.params.id));
	if(!student) return res.status(404).send('The student was not found');
	const index = students.indexOf(student);
	students.splice(index,1);
	res.send(student);
}

module.exports.student_get_all = student_get_all
module.exports.student_get = student_get
module.exports.student_post = student_post
module.exports.student_put = student_put
module.exports.student_delete = student_delete
