import {Router} from 'express'
import gameController from './mtg/game.controller'

const routes = Router()

routes.get('/health-check')
routes.post('/create', gameController.createDeck)
routes.get('/get', gameController.getDeck)

export {
    routes
}