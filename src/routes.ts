import { Router } from 'express'

import auth from './middlewares/authMiddleware'

import UserController from './controllers/UserController'
import GoalController from './controllers/GoalController'
import AuthController from './controllers/AuthController'

import UserValidator from './validators/user'
import GolValidator from './validators/goal'

const routes = Router()

// session
routes.post('/session', UserValidator.user, AuthController.create)

// users
routes.post('/users', UserValidator.user, UserController.create)

routes.get('/users/:id', auth, UserValidator.user, UserController.show)
routes.put('/users/:id', auth, UserValidator.user, UserController.update)
routes.delete('/users/:id', auth, UserValidator.user, UserController.delete)

// goals
routes.get('/users/goals/:userId', auth, GoalController.index)
routes.post('/users/goals/:userId', auth, GolValidator.goal, GoalController.create)

export default routes