import fs from "fs/promises"

export class GameService {
    private async fetchCards(url: string): Promise<any[]> {
        try {
            const response = await fetch(url);
            const data: any = await response.json();
            return data.cards
        } catch (error) {
            console.error('Failed to fetch cards:', error);
            return [];
        }
    }

    private async fetchLegendaryCards(): Promise<any[]> {
        return this.fetchCards('https://api.magicthegathering.io/v1/cards?supertypes=legendary');
    }

    private async fetchCardsByColor(colors: string[]): Promise<any[]> {
        const colorQuery = colors.join("|");
        return this.fetchCards(`https://api.magicthegathering.io/v1/cards?colors=${colorQuery}`);
    }

    async createDeck() {
        const legendaryCards = await this.fetchLegendaryCards();
        const commander = legendaryCards[Math.floor(Math.random() * legendaryCards.length)];
        const myCards = await this.fetchCardsByColor(commander.colors);

        const commanderIndex = myCards.findIndex(card => card.name === commander.name);
        
        if (commanderIndex === -1) {
            myCards.unshift(commander);
            myCards.splice(legendaryCards.length - 1, 1)
        }


        await fs.writeFile('./src/mtg/deck.json', JSON.stringify(myCards, null, 4))
        return myCards;
    }

    async getDeck() {
        const data = (await fs.readFile('./src/mtg/deck.json')).toString()
        return JSON.parse(data)
        ;
    }
}
