import jsonServer from 'json-server'

const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// Mock endpoint for already registered users checking
server.get('/check-already-registered', (req, res) => {
  const avaible = req.param('q') !== 'natalia.romanova@shield.org'
  res.status(200).jsonp({ message: avaible
    ? 'OK' : 'The email address you have entered is already registered.' })
})

server.use(router)
server.listen(3001, () => {
  console.log('JSON Server is running')
})
