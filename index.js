import app from './config/express'

app.listen(process.env.SERVER_PORT || 3000, () => {
  console.log(`server started on port ${process.env.SERVER_PORT} (${3000})`)
})

export default app
