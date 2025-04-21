//managing chips
import { Player } from "./players.js";
//variables to hold number of chips
let pot = 0;

//function to set the chips for the player and dealer



function betChips(player, wager) {
    if (player.chips >= wager) {
        player.bet = wager;
        player.chips -= wager;
        pot += wager;
    }else {
        return "Not enough chips to bet";
    }
}

function addChips(player, chips) {
    player.chips += chips;
}

function winPot(player) {
    player.chip += pot;
    pot = 0;
}

function resetPlayerBets(player) {
    player.bet = 0;
}
function resetPot() {
    pot = 0;
}