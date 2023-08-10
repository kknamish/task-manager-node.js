require('../src/db/mongoose')
const Task = require('../src/models/task')


// Promise Chaining style of code...
// Task.findByIdAndDelete('64d36409e75927b3aa4cd56e').then((task) => {
//     console.log(task)
//     return Task.countDocuments({ completed: false })
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })


// Async-await style of code...
const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed: false })

    return count
}

deleteTaskAndCount('64d36409e75927b3aa4cd56e').then(count => {
    console.log(count)
}).catch(error => {
    console.log(error)
})