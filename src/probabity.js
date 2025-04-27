const order = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace'];
const suitOrder =['heart', 'spade', 'diamond', 'club']
export function findProbabilty(hand, community){
    let faces = [0/*2*/, 0/*3*/, 0/*4*/, 0/*5*/, 0/*6*/, 0/*7*/, 0/*8*/, 0/*9*/, 0/*10*/, 0/*jack*/, 0/*queen*/, 0/*king*/, 0/*ace*/];
    let suits = [0/*heart*/, 0/*spade*/, 0/*diamond*/,0/*club*/];
    let percents =["42.2569"/*pair*/, "4.7539"/*two pair*/, "2.1128"/*three of a kind*/, "0.3925"/*straight*/, "0.1965"/*flush*/, "0.1441"/*full house*/, "0.02401"/*four of a kind*/, "0.00139"/*straight flush*/, "0.000154"/*royal flush*/]

    let cards = (hand).concat(community);

    for(let x in cards){
        let card = cards[x];
        if(card.number == '2'){faces[0]++}
        else if(card.number == '3'){faces[1]++}
        else if(card.number =='4'){faces[2]++}
        else if(card.number == '5'){faces[3]++}
        else if(card.number == '6'){faces[4]++}
        else if(card.number == '7'){faces[5]++}
        else if(card.number == '8'){faces[6]++}
        else if(card.number == '9'){faces[7]++}
        else if(card.number == '10'){faces[8]++}
        else if(card.number == 'jack'){faces[9]++}
        else if(card.number == 'queen'){faces[10]++}
        else if(card.number == 'king'){faces[11]++}
        else if(card.number == 'ace'){faces[12]++}

        if(card.suit == 'heart'){suits[0]++}
        else if(card.suit == 'spade'){suits[1]++}
        else if(card.suit == 'diamond'){suits[2]++}
        else if(card.suit == 'club'){suits[3]++}
    }

    console.log(faces);
    console.log(suits);
    
    percents[0] = pairProb(faces, hand, community.length);
    percents[1] = twoPairProb(faces, hand, community.length);
    percents[2] = threeProb(faces, hand, community.length);
    percents[3] = straightProb(faces, hand, community.length);
    percents[4] = flushProb(suits, hand, cards,community.length);
    percents[5] = fullHouseProb(faces, hand, community.length);
    percents[6] = FourProb(faces, hand, community.length);
    percents[7] = StraightFlushProb(community, hand, community.length);
    percents[8] = royalProb(community, hand, community.length);

    return percents;
}

function combinations(n,r){
    let top = fact(n);
    let botleft = fact(r);
    let botright = fact(n - r);
    let bot = botleft * botright;
    let result = top / bot;
    return result;
}

function fact(n) {
    let res = 1;
    for (let i = 1; i <= n; i++) {
        res *= i;
    }
    return res;
}

function pairProb(faces, hand, drawn){
    let prob1 = "T"
    let pair = false;
    let remaining = 50 - drawn;
    let toBeDrawn = 5 - drawn;

    if(hand[0].number === hand[1].number){pair = true;}
        
    for(let x in faces){
        if(faces[x]>1){
            if(hand[0].number == order[x] || hand[1].number == order[x]){prob1 = order[x];pair = true;}
        }
    }

    if(!pair && toBeDrawn>0){
        prob1 = (((2 * combinations(4,2) * (4**(toBeDrawn-1)) * combinations(12, toBeDrawn-1)) / combinations(remaining, toBeDrawn))*100).toFixed(3);
    }
    else if(!pair && toBeDrawn<1){prob1 = 0;}

    console.log(prob1);
    return prob1;
}

function twoPairProb(faces, hand, drawn){
    let prob2 = "T";
    let pair = false;
    let twoPair = false;
    let tablePair = false;
    let handPair = false;
    let pairInHand = false;
    let remaining = 50 - drawn;
    let toBeDrawn = 5 - drawn;

    if(hand[0].number === hand[1].number){pair = true;pairInHand = true;}

    if(pairInHand){
        let handFace = order.indexOf(hand.number);
        for(let x in faces){
            if(faces[x]>1){
                if(x>handFace){prob2 = order[x];}
                else{prob2 = hand[0].number;}
                twoPair = true;
            }
        }
    }
    else{
        for(let x in faces){
            if(faces[x] > 1){
                if(order[x] != hand[0].number && order[x] != hand[1].number){
                    if(handPair){
                        twoPair = true;
                        prob2 = order[x];
                    }
                    else{pair = true;tablePair = true;}
                }
                if(hand[0].number == order[x] || hand[1].number == order[x]){
                    if(pair){
                        twoPair = true;
                        prob2 = order[x];
                    }
                    else{pair = true;handPair = true;}
                }
            }
        }
    }

    if(!twoPair && !pair && toBeDrawn>1){
        prob2 = (((combinations(4,2) * combinations(4,2) * (4**(toBeDrawn-2)) * combinations(11,toBeDrawn-2))/combinations(remaining,toBeDrawn))*100).toFixed(3);;
    }
    else if(handPair && !twoPair && pair && toBeDrawn>0){
        prob2 = (((drawn * combinations(4,2) * (4**(toBeDrawn-1)) * combinations(12-drawn,toBeDrawn-1))/combinations(remaining, toBeDrawn))*100).toFixed(3);
    }
    else if(tablePair && !twoPair && pair && toBeDrawn>0){
        prob2 = (((2 * combinations(4,2) * (4**(toBeDrawn-1)) * combinations(12,toBeDrawn-1))/combinations(remaining, toBeDrawn))*100).toFixed(3);
    }
    else if(pairInHand && !twoPair && pair && toBeDrawn>0){
        if(toBeDrawn == 5){
            prob2 = (((12 * combinations(4,2) * (4**3) * combinations(11, 3)) / combinations(50, 5))*100).toFixed(3);
        }
        else{
            prob2 = (((drawn * combinations(4,2) * (4**(toBeDrawn-1)) * combinations(12-drawn, toBeDrawn-1))/combinations(remaining, toBeDrawn))*100).toFixed(3);
        }
    }
    else if(!twoPair && !pair && toBeDrawn<2){prob2 = 0;}
    else if(!twoPair && pair && toBeDrawn<1){prob2 = 0;}

    console.log(prob2);
    return prob2;
}

function threeProb(faces, hand, drawn){
    let prob3 = "T"
    let three = false;
    let pair = false;
    let remaining = 50 - drawn;
    let toBeDrawn = 5 - drawn;

    if(hand[0].number === hand[1].number){pair = true;}

    for(let x in faces){
        if(faces[x]>2){
            if(hand[0].number == order[x] || hand[1].number == order[x]){prob3 = order[x];three = true;pair = true;}
        }
        else if(!three && faces[x]==2){
            if(hand[0].number == order[x] || hand[1].number == order[x]){pair = true;}
        }
    }

    if(!three && !pair && toBeDrawn>1){
        prob3 = (((2 * combinations(4,2) * (4**(toBeDrawn-2)) * combinations(12,toBeDrawn-2))/combinations(remaining, toBeDrawn))*100).toFixed(3);
    }
    else if(!three && pair && toBeDrawn>0){
        let temp = (combinations(3,2) * (4**(toBeDrawn-1)) * combinations(11,toBeDrawn-1))
        if(toBeDrawn>1){temp += (combinations(4,3) * (4**(toBeDrawn-1)) * combinations(11, toBeDrawn-1));}
        temp /= combinations(remaining, toBeDrawn)
        temp *= 100;
        prob3 = temp.toFixed(3);
    }
    else if(!three && !pair&& toBeDrawn<2){prob3 = 0;}
    else if(!three && pair && toBeDrawn<1){prob3 = 0;}

    console.log(prob3);
    return prob3;
}

function straightProb(faces, hand, drawn){
    let prob4 = 'T';
    let straight = false;
    let remaining = 50 - drawn;
    let toBeDrawn = 5 - drawn;
    let card1 = order.indexOf(hand[0].number);
    let card2 = order.indexOf(hand[1].number);
    let count = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    let curr = 0;
    let ace = false;

    if(card1 == 12 || card2 == 12 || faces[12]>0){ace = true;count[0]++;count[9]++}

    if(ace){for(let i=0;i<4;i++){if(faces[i]>0){count[0]++}}}
    for(let i=0;i<5;i++){if(faces[i]>0){count[1]++;}}
    for(let i=1;i<6;i++){if(faces[i]>0){count[2]++;}}
    for(let i=2;i<7;i++){if(faces[i]>0){count[3]++;}}
    for(let i=3;i<8;i++){if(faces[i]>0){count[4]++;}}
    for(let i=4;i<9;i++){if(faces[i]>0){count[5]++;}}
    for(let i=5;i<10;i++){if(faces[i]>0){count[6]++;}}
    for(let i=6;i<11;i++){if(faces[i]>0){count[7]++;}}
    for(let i=7;i<12;i++){if(faces[i]>0){count[8]++;}}
    for(let i=8;i<12;i++){if(faces[i]>0){count[9]++;}}

    for(let i = 0;i <+ count.length; i++){
        if(count[i]>=count[curr]){curr=i;}
    }

    if(count[curr] == 5){
        straight = true;
        if(curr == 0){prob4 = '5';}
        if(curr == 1){prob4 = '6';}
        if(curr == 2){prob4 = '7';}
        if(curr == 3){prob4 = '8';}
        if(curr == 4){prob4 = '9';}
        if(curr == 5){prob4 = '10';}
        if(curr == 6){prob4 = 'jack';}
        if(curr == 7){prob4 = 'queen';}
        if(curr == 8){prob4 = 'king';}
        if(curr == 9){prob4 = 'ace';}
    }

    if(!straight && toBeDrawn>=5-count[curr]){
        let r = 5-count[curr]
        let temp = r * 4;
        temp *= 4**(toBeDrawn-r);
        temp *= combinations(8, toBeDrawn-r);
        temp /= combinations(remaining, toBeDrawn);
        temp *= 100;
        prob4 = temp.toFixed(3);
    }
    if(!straight && toBeDrawn<5-count[curr]){prob4 = 0;}
    console.log(prob4);
    return prob4;
}

function flushProb(suits, hand, cards, drawn){
    let prob5 = 'T';
    let currSuit = '';
    let remaining = 50 - drawn;
    let toBeDrawn = 5 - drawn;
    let flush = false;
    let curr = 0;
    
    for(let x in suits){
        if(suits[x]>curr)
            if(hand[0].suit == suitOrder[x] || hand[1].suit == suitOrder[x]){
                curr = suits[x]
                currSuit = suitOrder[x];
            }
    }

    if(curr == 5){
        flush = true;
        for(let x in cards){
            if(cards[x].suit == currSuit){prob5 = cards[x].number;}
        }
    }

    let r = 5 - curr;
    if(!flush && toBeDrawn >= r){
        prob5 = (((combinations(13-curr, r) * (13**(toBeDrawn-r)) * combinations(3, toBeDrawn-r))/combinations(remaining, toBeDrawn))*100).toFixed(3);
    }
    else if(!flush && toBeDrawn < r){prob5 = 0;}

    console.log(prob5);
    return(prob5);
}

function fullHouseProb(faces, hand, drawn){
    let prob6 = "T";
    let fullHouse = false;
    let pair = false;
    let pair2 = false;
    let three = false;
    let remaining = 50 - drawn;
    let toBeDrawn = 5 - drawn;

    for(let x in faces){
        if(faces[x]>1){
            if(faces[x]>2){
                three = true;
                if(order[x] == hand[0].number || order[x] == hand[1].number){
                    if(pair && three){fullHouse = true;prob6 = order[x];}
                }
            }
            else{
                if(!pair){pair = true;}
                else{pair2 = true;}
                if(order[x] == hand[0].number || order[x] == hand[1].number){
                    if(pair && three){fullHouse = true;prob6 = order[x];}
                }
            }
        }
    }

    if(!fullHouse && !pair && !pair2 && !three && toBeDrawn > 2){
        prob6 = (((combinations(4,2) * combinations(4, 3) * (4**(toBeDrawn-3)) * combinations(11, toBeDrawn-3)) / combinations(remaining, toBeDrawn))*100).toFixed(3);
    }
    else if(!fullHouse && pair && !pair2 && !three && toBeDrawn > 1){
        prob6 = (((2 * combinations(3, 2) * (4**(toBeDrawn-2)) * combinations(11, toBeDrawn-2)) / combinations(remaining, toBeDrawn))*100).toFixed(3);
    }
    else if(!fullHouse && pair && pair2 && !three && toBeDrawn > 0){
        prob6 = (((2 * combinations(3, 2) * (4**(toBeDrawn-1)) * combinations(11, toBeDrawn-1)) / combinations(remaining, toBeDrawn))*100).toFixed(3);
    }
    else if(!fullHouse && !pair && !pair2 &&three && toBeDrawn > 0){
        prob6 = (((combinations(4, 2) * (4**(toBeDrawn-1)) * combinations(11, toBeDrawn-1)) / combinations(remaining, toBeDrawn))*100).toFixed(3);
    }
    else if(!fullHouse && !pair && !pair2 && !three && toBeDrawn < 3){prob6 = 0;}
    else if(!fullHouse && pair && !pair2 && !three && toBeDrawn < 2){prob6 = 0;}
    else if(!fullHouse && pair && pair2 && !three && toBeDrawn < 1){prob6 = 0;}
    else if(!fullHouse && !pair && !pair2 && three && toBeDrawn < 1){prob6 = 0;}

    console.log(prob6);
    return prob6;
}

function FourProb(faces, hand, drawn){
    let prob7 = "T";
    let four = false;
    let three = false;
    let pair = false;
    let remaining = 50 - drawn;
    let toBeDrawn = 5 - drawn;

    if(hand[0].number === hand[1].number){pair = true;}

    for(let x in faces){
        if(faces[x]==4){
            if(hand[0].number == order[x] || hand[1].number == order[x]){prob7 = order[x];four = true;three = true; pair = true;}
        }
        else if(!four && faces[x]==3){
            if(hand[0].number == order[x] || hand[1].number == order[x]){three = true;pair = true;}
        }
        else if(!four && !three && faces[x]==2){
            if(hand[0].number == order[x] || hand[1].number == order[x]){pair = true;}
        }
    }    

    if(!four && !three && !pair && toBeDrawn>2){
        prob7 = (((2*(4**(toBeDrawn-3))*combinations(12,toBeDrawn-3))/combinations(remaining, toBeDrawn))*100).toFixed(3);
    }
    else if(!four && !three && pair && toBeDrawn>1){
        let temp = (4**(toBeDrawn-2))*combinations(11,toBeDrawn-2);
        if(toBeDrawn>2){temp += (4**(toBeDrawn-3))*combinations(11, toBeDrawn-3)}
        temp /= combinations(remaining, toBeDrawn);
        temp *= 100;
        prob7 = temp.toFixed(3);
    }
    else if(!four && three && pair && toBeDrawn>0){
        let temp = (4**(toBeDrawn-1))*combinations(11,toBeDrawn-1);
        if(toBeDrawn>2){temp += (4**(toBeDrawn-3))*combinations(11,toBeDrawn-3);}
        temp /= combinations(remaining, toBeDrawn);
        temp *= 100;
        prob7 = temp.toFixed(3);
    }
    else if(!four && !three && !pair && toBeDrawn<3){prob7 = 0;}
    else if(!four && !three && pair && toBeDrawn<2){prob7 = 0;}
    else if(!four && three && pair && toBeDrawn<1){prob7 = 0;}

    console.log(prob7);
    return prob7;
}

function StraightFlushProb(community, hand, drawn){
    let prob8 = 'T';
    let straightFlush = false;
    let count = 0;
    let remaining = 50 - drawn;
    let toBeDrawn = 5 - drawn;

    if(hand[0].suit == hand[1].suit){
        if(order.indexOf(hand[0].number) - order.indexOf(hand[1].number) < 5 && order.indexOf(hand[0].number) - order.indexOf(hand[1].number) > -5){count=2;}
    }

    for(let x in community){
        if(community[x].suit == hand[0].suit || community[x].suit == hand[1].suit){
            if(order.indexOf(community[x].number) - order.indexOf[hand[0].number] < 5 && order.indexOf(community[x].number) - order.indexOf[hand[0].number] > -5){count++;}
            else if(order.indexOf(community[x].number) - order.indexOf[hand[1].number] < 5 && order.indexOf(community[x].number) - order.indexOf[hand[1].number] > -5){count++;}
            if(count >= 5){straightFlush = true;prob8 = order[x]}
        }
    }

    let r = 5 - count;
    if(!straightFlush && r <= toBeDrawn){
        prob8 = (((combinations(13-count, r) * 3 * combinations(13, toBeDrawn - r) + 8) / combinations(remaining, toBeDrawn))*100).toFixed(3); 
    }
    else if(!straightFlush && r > toBeDrawn){prob8 = 0;}

    console.log(prob8);
    return prob8;
}

function royalProb(community, hand, drawn){
    let prob9 = 'T';
    let royal = false;
    let count = 0;
    let remaining = 50 - drawn;
    let toBeDrawn = 5 - drawn;
    let facecheck = ['10', 'jack', 'queen', 'king', 'ace'];
    let suitcheck = [hand[0].suit, hand[1].suit];

    if(facecheck.includes(hand[0].number)){count++;}
    if(facecheck.includes(hand[1].number)){
        if(count > 0){
            if(hand[1].suit == hand[0].suit){count++;}}
        else{count++;}
    }
    if(count == 0){royal = true; prob9 = 0;}

    for(let x in community){
        if(suitcheck.includes(community[x].suit)){
            if(facecheck.includes(community[x].number)){count++;}
        }
    }
    if(count >= 5){royal = true; prob9 = 'Wow!';}

    let r = 5 - count
    if(!royal && r <= toBeDrawn){
        prob9 = (((r*3*combinations(13, toBeDrawn-r)+8) / combinations(remaining, toBeDrawn))*100).toFixed(3);
    }
    else if(!royal && r > toBeDrawn){prob9 = 0;}

    console.log(prob9);
    return prob9;
}