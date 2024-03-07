import {Request, Response} from 'express'
import { GameService } from './game.service'

class GameController {
    async createDeck(req: Request, res: Response) {
        const deck = await new GameService().createDeck()
        return res.json(deck)
    }

    async getDeck(req: Request, res: Response) {
        const deck = await new GameService().getDeck()
        return res.json(deck)
    }
}
export default new GameController()