//managing chips
import { Player } from "./players.js";
//variables to hold number of chips
let pot = 0;
let ante = 50;
let curr = 50;

//function to set the chips for the player and dealer



export function betChips(player, wager) {
    if (player.chips >= wager) {
        player.bet = wager;
        player.chips -= wager;
        pot += wager;
    }else {
        return "Not enough chips to bet";
    }
}

export function addChips(player, chips) {
    player.chips += chips;
}

export function winPot(player) {
    player.chips += pot;
    pot = 0;
}

export function tieGame(player1, player2){
    if(pot % 2 != 0){
        let split = Math.floor(pot / 2);
        player1.chips += split + 1;
        player2.chips += split;
        pot = 0
    }
    else{
        let split = pot / 2;
        player1.chips += split;
        player2.chips += split;
        pot = 0;
    }
}

export function resetPlayerBets(player) {
    player.bet = 0;
}

export function resetPot() {
    pot = 0;
}

export function setAnte(amount){
    ante = Number(amount);
}

export function setCurrentBet(amount){
    curr = Number(amount);
    console.log(curr);
}

export function getAnte(){
    console.log("ante " + ante);
    return ante;
}

export function getCurr(){
    console.log("curr " + curr)
    return curr;
}

export function updateChips(player, id){
    document.getElementById("potPrint").innerText = "pot: " + pot
    document.getElementById(id).innerText = "chips: " + player.chips;
    //document.getElementById("dealerChipsPrint").innerText = "chips: " + dealer.chips;
}