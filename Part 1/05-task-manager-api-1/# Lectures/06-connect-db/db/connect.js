const mongoose = require('mongoose')

const password = '121212%40001'
const database = 'task-manager'

const connectionString = `mongodb+srv://hungbui7690:${password}@cluster0.5g3x7fn.mongodb.net/${database}?retryWrites=true&w=majority&appName=Cluster0`

// ==========================================
// OLD METHOD
// ==========================================
// mongoose
//   .connect(connectionString, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log(`Connected to DB...`))
//   .catch((err) => console.log(err))

// ==========================================
// FIX DEPRECATION WARNING (MONGOOSE v5.xx)
// ==========================================
// return promise
mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`Connected to DB...`))
  .catch((err) => console.log(err))
