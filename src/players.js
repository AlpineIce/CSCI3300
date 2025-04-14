export class player {
    constructor(name, chips, hand, bet = 0, isfolded = false, isdealer = false) {
        this.name = name;
        this.chips = chips;
        this.hand = hand;
        this.bet = bet;
        this.isfolded = isfolded;
        this.isdealer = isdealer;
    }
}