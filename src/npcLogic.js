import { betChips, getAnte, getCurr, updateChips } from "./chips.js";
import { createEndRoundContainer } from "./gui.js";
import { findProbabilty } from "./probabity.js";
import { resetGame, endGame, reveal } from "./card_logic.js";

const suitCheck = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace'];
export function npcBetting(hand, community, npc, player){
    let probability = findProbabilty(hand, community);
    let threshold = thresholdCheck(probability);
    
    if(community.length == 0){
        if(getCurr() > getAnte()){call(npc);}
        else{check(npc);}
    }
    else if(community.length == 3){
        if(threshold > 3){
            if(getCurr() > getAnte()){call(npc);}
            else{raise(npc, getAnte()*1.5);}
        }
        else if(threshold > 0 && threshold < 4){
            if(getCurr() < npc.chips*.2){call(npc);}
            else if(getCurr() < getAnte()*5){call(npc);}
            else if(getCurr() == getAnte()){check(npc)}
            else{fold(player);}
        }
        else if(threshold == 0 && getCurr() > getAnte()*3){fold(player);}
        else{
            if(getCurr > getAnte()){call(npc);}
            else{check(npc);}
        }
    }
    else if(community.length == 4){
        if(threshold > 1){
            if(getCurr() > getAnte()){call(npc);}
            else{raise(npc, getAnte()*1.5);}
        }
        else if(threshold > 0){
            if(getCurr() < npc.chips*.2){call(npc);}
            else if(getCurr() < getAnte()*5){call(npc);}
            else if(getCurr() == getAnte()){check(npc)}
            else{fold(player);}
        }
        else if(threshold == 0 && getCurr() > getAnte()*3){fold(player);}
        else{
            if(getCurr > getAnte()){call(npc);}
            else{check(npc);}
        }
    }
    else if(community.length == 5){
        if(threshold > 1){
            if(getCurr() > getAnte()){call(npc);}
            else{raise(npc, getAnte()*1.5);}
        }
        else if(threshold > 0){
            if(getCurr() < npc.chips*.2){call(npc);}
            else if(getCurr() < getAnte()*5){call(npc);}
            else if(getCurr() == getAnte()){check(npc)}
            else{fold(player);}
        }
        else if(threshold == 0 && getCurr() > getAnte()){fold(player);}
        else{check(npc);}
    }
}

function thresholdCheck(probability){
    let threshold = 0;

    for(let x in probability){
        if(suitCheck.includes(probability[x])){
            if(x==0){threshold = 1;}
            else if(x==1){threshold = 2;}
            else if(x==2){threshold = 3;}
            else if(x==3){threshold = 4;}
            else if(x==4){threshold = 5;}
            else if(x==5){threshold = 6;}
            else if(x==6){threshold = 7;}
            else if(x==7){threshold = 8;}
            else if(x==8){threshold = 9;}
        }
        else if(probability[x] > 0){
            if(x==0){threshold = 1;}
            else if(x==1){threshold = 1;}
            else if(x==2){threshold = 1;}
            else if(x==3){threshold = 2;}
            else if(x==4){threshold = 2;}
            else if(x==5){threshold = 3;}
            else if(x==6){threshold = 3;}
            else if(x==7){threshold = 5;}
            else if(x==8){threshold = 5;}
        }
    }
    return threshold;
}

function check(npc){
    if(getAnte() > npc.chips){betChips(npc, npc.chips);}
    else{betChips(npc, getAnte());}
    updateChips(npc, "dealerChipsPrint");
    console.log("dealer checks");
    let log = document.createElement("p");
    log.innerText = "Dealer checks " + getAnte() + ".";
    document.getElementById("gameLog").appendChild(log);
}

function call(npc){
    if(getCurr() > npc.chips){betChips(npc, npc.chips);}
    else{betChips(npc, getCurr());}
    updateChips(npc, "dealerChipsPrint");
    console.log("dealer calls")
    let log = document.createElement("p");
    log.innerText = "Dealer calls " + getCurr() + ".";
    document.getElementById("gameLog").appendChild(log);
}

function raise(npc, raise){
    if(getCurr() > npc.chips){betChips(npc, npc.chips);}
    else{betChips(npc, raise);}
    updateChips(npc, "dealerChipsPrint");
    console.log("dealer raises");
    let log = document.createElement("p");
    log.innerText = "Dealer raises " + raise + ".";
    document.getElementById("gameLog").appendChild(log);
}

function fold(player){
    console.log("dealer fold");
    let log = document.createElement("p");
    log.innerText = "Dealer folds.";
    document.getElementById("gameLog").appendChild(log);
    
    winPot(player);
    updateChips(player, "playerChipsPrint");
    
    reveal();
    
    const buttons = document.getElementsByTagName("button");
    for(const button of buttons) { button.disabled = true; }
    
    createEndRoundContainer("Dealer Folds");
    
    document.getElementById("newRoundButton").addEventListener("click", resetGame);
    document.getElementById("endGameButton").addEventListener("click", endGame);
}