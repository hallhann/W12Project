class NewStudent{
    constructor(name) {
        this.name=name;
        this.age=[];

    }
    addAge (age, grade){
        this.ages.push(newAge(age, grade));
    }
}

class Age {
    constructor(age, grade) {
        this.name=age;
        this.area=grade;
    }
}

class StudentService {

    static getAllStudents() {
        return $.get(this.url);
    }

    static getStudent(id) {
        return $.get(this.url + `/${id}`);
    }

    static createStudent(student) {
        return $.post(this.url, student);
    }

    static updateStudent(Student) {
        return $.ajax({
            url: this.url + `/${student._id}`,
            dataType: 'json',
            data: JSON.stringify(student),
            contentType: 'application/json',
            type: 'PUT'
        });
    }

    static deleteStudent(id){
        return $.ajax({
            url: this.url + `/${id}`,
            type: 'DELETE'
        });
    }

}

class DOMManager {
    static students;

    static getAllStudents(){
        StudentService.getAllStudents().then(students => this.render(students));
    }

    static createStudent(name){
        StudentService.createStudent(new Student(name))
            .then(() => {
                return StudentService.getAllStudents()
            .then((students) => this.render(students));
            });
    }

    static deleteStudent(id) {
        StudentService.deleteStudent(id)
            .then(() => this.render(students));
    }

    static render(students) {
        this.students = students;
        $('#app').empty();
        for (let student of students) {
            $('#app').prepend(
                `<div id="${student._id}" class="card">
                    <div class="card-header">
                        <h2>New Student</h2>
                        <button class="btn btn-danger" onclick="DOMManager.deleteStudent('${student._id}')">Delete</button>
                    </div>

                    <div class="card-body">
                        <div class="card">
                            <div class="row">
                                <div class="col-sm">
                                    <input type="text" id="${student._id}-room.name" class="form-control" placeholder="Student Age">
                                </div>
                                <div class="col-sm">
                                    <input type="text" id="${student._id}-room.area" class="form-control" placeholder="Student Grade">
                                </div>
                            </div> 
                            <button id="${student._id}-new-student" onclick="DOMManager.addRoom('${student._id}')" class="btn btn-primary form-control">Add</button>

                        </div>
                    </div>
                </div>
                `
            );
        }
    }
}
 
$('#create-new-student').click(() => {
    DOMManager.createStudent($('#new-student-name').val());
    $('#new-student-name').val('');


});

