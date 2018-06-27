import app from './config/express'

app.listen(process.env.SERVER_PORT || 3000, () => {
  console.log(`server started on port ${process.env.SERVER_PORT} (${3000})`)
})

export default app

// // User.create({
// //   username : "manhhoang",
// //   password : "123"
// // })
// // .then(user => {
// //   console.log( user)
// // })

// let data = await  User.find()
// console.log(data);
