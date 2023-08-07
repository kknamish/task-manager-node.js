const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const ObjectId = mongodb.ObjectId

// const connectionURL = 'mongodb://127.0.0.1:27017/task-manager'
const connectionURL = 'mongodb+srv://kknamish:kknamish@task-manager.k9rezvk.mongodb.net/?retryWrites=true&w=majority'
const databaseName = 'task-manager'

const connectToMongoDB = async () => {
    // Connect to MongoDB server
    const client = await MongoClient.connect(connectionURL, { useUnifiedTopology: true })
    console.log('Connected To Database.')

    const db = client.db(databaseName)
    
    // // CRUD operations
    try {
        // CREATE
        // const data = {
        //     name: 'Namish',
        //     age: 22,
        // }
        // const multipleData = [
        //     {
        //         name: 'Bunny',
        //         age: 19
        //     },
        //     {
        //         name: 'Sunny',
        //         age: 17
        //     }
        // ]
        // const multipleData = [
        //     {
        //         description: 'Read a book',
        //         completed: true
        //     },
        //     {
        //         description: 'Play football',
        //         completed: false
        //     },
        //     {
        //         description: 'Clean the kitchen',
        //         completed: true
        //     }
        // ]
        // const insertResult = await db.collection('users').insertOne(data);
        // const insertResult = await db.collection('users').insertMany(multipleData)
        // console.log('Inserted Successfully: ', insertResult)


        // READ
        // const fetchedData = await db.collection('users').findOne({ _id: new ObjectId('64cca7d5a84e9697daa0788d') })
        // const fetchedData = await db.collection('users').find().toArray()
        // const fetchedData = await db.collection('tasks').find({ completed: false }).toArray()
        // console.log(fetchedData)


        // UPDATE
        // const updatedData = await db.collection('users').updateOne({
        //     name: 'Namish'
        // }, {
        //     $inc: {
        //         age: 1
        //     }
        // })
        // const updatedData = await db.collection('tasks').updateMany({
        //     completed: true
        // }, {
        //     $set: {
        //         completed: false
        //     }
        // })
        // console.log(updatedData)


        // DELETE
        // const deletedData = await db.collection('users').deleteOne({ name: 'Bunny' })
        // const deletedData = await db.collection('tasks').deleteMany({ completed: false })
        // console.log(deletedData)

    } catch (error) {
        console.log('Error: ', error)
    } finally {
        client.close()
        console.log('Connection closed.')
    }
}

connectToMongoDB()
