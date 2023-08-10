require('../src/db/mongoose')
const User = require('../src/models/user')


// Promise Chaining style of code...
// User.findByIdAndUpdate('64d3376dcc9fe4c175d58a8c', { age: 1 }).then((user) => {
//     console.log(user)
//     return User.countDocuments({ age: 1 })
// }).then((result) => {
//     console.log(result)
// }).catch((err) => {
//     console.log(err)
// })


// Async-await style of code...
const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({ age })

    return count
}

updateAgeAndCount('64d32d7bb7bee193c06c841b', 2).then((count) => {
    console.log(count)
}).catch((error) => {
    console.log(error)
})