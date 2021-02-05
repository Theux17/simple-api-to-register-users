import { Router } from 'express'

import UserController from './controllers/UserController'
import UserValidator from './validators/user'

const routes = Router()

routes.post('/users', UserValidator.user, UserController.create)
routes.get('/users/:id', UserValidator.user, UserController.show)
routes.put('/users/:id', UserValidator.user, UserController.update)
routes.delete('/users/:id', UserValidator.user, UserController.delete)

export default routes