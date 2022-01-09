const taskCtrl = {}
const Tasks = require('../models/Tasks')

// Get all tasks
taskCtrl.getTask = async (req, res) => {
    const allTasks = await Tasks.find()
    res.status(200).json(allTasks);
}

// Get one task

taskCtrl.getOneTask = async (req, res) => {
    const id = req.params.id
    const id2 = ('ObjectId("' + id + '")');
    console.log(id2);
    const oneTask = await Tasks.findById(id).exec()
        .then(() => {
            console.log(oneTask);
            res.status(200).json(oneTask);
        })
}

//Post one task

taskCtrl.postTask = async (req, res) => { //OK
    const { _id, name, description, date } = req.body;
    const newTask = new Tasks({ _id, name, description, date })
    await newTask.save()
        .then(() => {
            res.status(200).json({ newTask });
            console.log('añadida nueva tarea');
        })

}


// Delete one task

taskCtrl.deleteTask = async (req, res) => {
    const id = req.params.id
    console.log(id)
    try {
        await Tasks.findByIdAndDelete(id)
            .then(() => {
                res.status(200);
                console.log('borrado')
            });
    } catch (err) {
        console.log(err);
    }
}

// update one task

taskCtrl.updateTask = async (req, res) => {
    const id = req.params.id;
    const body = req.body
    try {
        await Tasks.findByIdAndUpdate(id, body).exec()
            .then(() => {
                res.status(200);
                console.log('actualizado')
            })

    } catch (err) {
        console.log('error al actualizar');
    }
}

module.exports = taskCtrl;