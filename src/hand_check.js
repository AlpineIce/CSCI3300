//checking the player and or players cards and determing what hand they have

export function checkplayerhand(playerhand, community){
    //orer of cards by value
    
    let fullseven = (playerhand).concat(community);   
    //sorted hand in order by value
    fullseven.sort((a, b) => getRankValue(a.number) - getRankValue(b.number));
    let hand_value;
    let highcard;

    
    if (checkflush(fullseven) && checkstraight(fullseven)){
            hand_value = "straight flush";
        }else if (checkfourofakind(fullseven)){
                hand_value = "four of a kind";
        }else if (checkfullhouse(fullseven)){
                hand_value = "full house";
        }else if (checkflush(fullseven)){
                hand_value = "flush";
        }else if (checkstraight(fullseven)){
                hand_value = "straight";
        }else if (checkThreeOfAKind(fullseven)){
                hand_value = "three of a kind";
            }else if (checkpair(fullseven) >= 2){
                hand_value = "two pair";
            }else if (checkpair(fullseven) == 1){
                hand_value = "one pair";
            }else {
                hand_value = "high card";
            }
    
    highcard = return_highcard(fullseven, hand_value);


    return {

        hand_value: hand_value,
        highcard: highcard,
    }


    }
export function getRankValue(number) {
    // gives me rank values so i can sort them
    const values = {
        '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7,
        '8': 8, '9': 9, '10': 10, 'jack': 11, 'queen': 12, 'king': 13, 'ace': 14
    };
    return values[number] || 0;
}

function checkflush(fullseven){
    // checks if something is a flush or straight flush
    let hearts = 0;
    let spades = 0; 
    let diamonds = 0;
    let clubs = 0;
    
    
    for (let y of fullseven){
        if (y.suit == 'heart'){
            hearts++;
        }
        else if (y.suit == 'spade'){
            spades++;
        }
        else if (y.suit == 'diamond'){
            diamonds++;
        }
        else if (y.suit == 'club') {
            clubs++;
        }

    }

    if (hearts >=5 || spades >= 5 || diamonds >= 5 || clubs >= 5){
        return true;
    }
    else {
        return false;
    }
}

function checkpair(fullseven){
    // checks if there is a pair
    let pairs = 0;
    for (let i = 0; i <= fullseven.length - 2; i++){
        if (fullseven[i].number == fullseven[i+1].number){
            pairs++;
        }
    }
    return pairs;
}

function checkThreeOfAKind(fullseven) {
    // checks if there is three of a kind
    let value = false
    for (let i = 0; i <= fullseven.length - 3; i++){
        if (fullseven[i].number == fullseven[i+1].number && fullseven[i].number == fullseven[i+2].number){
            value = true;
        }
    }
    return value;
}


function checkfourofakind(fullseven) {
    // checks if there are four of a kind
    let value = false
    for (let i = 0; i <= fullseven.length - 4 ; i++){
        if (fullseven[i].number == fullseven[i+1].number && fullseven[i].number == fullseven[i+2].number && fullseven[i].number == fullseven[i+3].number){
            value = true;
         }
    }
    return value;
}

function checkfullhouse(fullseven){
    // checks for a full house
    let pairs = 0;
    let tripples = 0;
    let heldrank;

    for (let i = 0; i <= fullseven.length - 3; i++){
        if (fullseven[i].number == fullseven[i+1].number && fullseven[i].number == fullseven[i+2].number){
           heldrank = fullseven[i].number;
            tripples++;
        }
    }
    for (let i = 0; i <= fullseven.length - 2; i++){
        if (fullseven[i].number == fullseven[i+1].number && fullseven[i].number != heldrank){
            pairs++;
        }
    }
    if (tripples >= 1 && pairs >= 1){
        return true;}
    else {
        return false;
    }
}


function checkstraight(fullseven) {
    // Get unique ranks sorted low to high
    const uniqueRanks = [...new Set(fullseven.map(card => getRankValue(card.number)))].sort((a,b) => a-b);
    
    // Check for normal straights (5 consecutive cards)
    for (let i = 0; i <= uniqueRanks.length - 5; i++) {
        if (uniqueRanks[i+4] - uniqueRanks[i] === 4) {
            return true;
        }
    }
    
    // Special case for Ace-low straight (A-2-3-4-5)
    if (uniqueRanks.includes(14)) { // Check if Ace is present
        const hasAceLow = [2,3,4,5].every(rank => uniqueRanks.includes(rank));
        if (hasAceLow) return true;
    }
    
    return false;
}

function return_highcard (fullseven, hand_value){
    let returned_highcard;

    if (hand_value == "high card"){
        returned_highcard = fullseven[6].number;
    }
    else if (hand_value == "one pair"){
        for (let i = 0; i <= fullseven.length - 2; i++){
            if (fullseven[i].number == fullseven[i+1].number){
                returned_highcard = fullseven[i].number;
            }
        }
    }
    else if (hand_value == "two pair"){
        let heldrank = 0;
        for (let i = 0; i <= fullseven.length - 2; i++){
            if (fullseven[i].number == fullseven[i+1].number){
                heldrank = fullseven[i].number;
                }
            }
            returned_highcard = heldrank;
        }
        
    
    else if (hand_value == "three of a kind"){
        for (let i = 0; i <= fullseven.length - 3; i++){
            if (fullseven[i].number == fullseven[i+1].number && fullseven[i].number == fullseven[i+2].number){
                returned_highcard = fullseven[i].number;
            }
        }

    }
    else if (hand_value == "straight"){
            for (let i = 0; i <= fullseven.length - 5; i++){
                if (getRankValue(fullseven[i+1].number)-getRankValue(fullseven[i].number) == 1 && getRankValue(fullseven[i+2].number)-getRankValue(fullseven[i].number) == 2 && getRankValue(fullseven[i+3].number)-getRankValue(fullseven[i].number) == 3 && getRankValue(fullseven[i+4].number)-getRankValue(fullseven[i].number) == 4){
                returned_highcard = fullseven[i+4].number;
        }
    }
        if (getRankValue(fullseven[6].number == 13)){
            if (getRankValue(fullseven[0].number)== 2 && getRankValue(fullseven[1].number)==3 && (fullseven[2].number)==4 && (fullseven[3].number)==5){
                returned_highcard = 5;
        }
    }
    }
    else if (hand_value == "four of a kind"){
        for (let i = 0; i <= fullseven.length - 4 ; i++){
            if (fullseven[i].number == fullseven[i+1].number && fullseven[i].number == fullseven[i+2].number && fullseven[i].number == fullseven[i+3].number){
                returned_highcard = fullseven[i].number;
             }
        }
    }
    else if (hand_value == "full house"){
        for (let i = 0; i <= fullseven.length - 3; i++){
            if (fullseven[i].number == fullseven[i+1].number && fullseven[i].number == fullseven[i+2].number){
                returned_highcard = fullseven[i].number;
            }

        }
    }else if (hand_value == "flush"){
        let hearts = 0;
        let spades = 0; 
        let diamonds = 0;
        let clubs = 0;
    
    
        for(let y of fullseven){
            if (y.suit == 'heart'){
                hearts++;
            }
            else if (y.suit == 'spade'){
                spades++;
            }
            else if (y.suit == 'diamond'){
                diamonds++;
            }
            else if (y.suit == 'club') {
                clubs++;
            }

        }
        let high_suit;
        if(hearts >= 5){
            high_suit = 'heart';}
        else if (spades >= 5){
            high_suit = 'spade';}
        else if (diamonds >= 5){
            high_suit = 'diamond';}
        else if (clubs >= 5){
            high_suit = 'club';}

        for (let i = 0; i <= fullseven.length - 1; i++){
            if (fullseven[i].suit == high_suit){
                returned_highcard = fullseven[i].number;
            }
        }
    }
    else if (hand_value == "straight flush"){
        for (let i = 0; i <= fullseven.length - 5; i++){
            if (getRankValue(fullseven[i+4].number)-getRankValue(fullseven[i].number) ==4){
                returned_highcard = fullseven[i+4].number;
            }
        }
            if (getRankValue(fullseven[6].number == 13)){
                if (getRankValue(fullseven[0].number)== 2 && getRankValue(fullseven[1].number)==3 && (fullseven[2].number)==4 && (fullseven[3].number)==5){
                    returned_highcard = fullseven[3].number;
            }
        }
    }


    
    return returned_highcard;
    
}


//gets my 7 cards for the kicker functions
export function getcardsforkicker (userhand, community){
    let fullseven = (userhand).concat(community);
    fullseven.sort((a, b) => getRankValue(a.number) - getRankValue(b.number));
    return fullseven;
}

 //gets the values of all pairs
export function twopair_kicker (playerhand, community){
        let fullseven = getcardsforkicker(playerhand, community);
        let playerheldrank = [];
    for (let i = 0; i <= fullseven.length - 2; i++){
        if (fullseven[i].number == fullseven[i+1].number){
            playerheldrank.push(fullseven[i].number);
                    }
                }
                playerheldrank.sort((a, b) => a - b);
        return playerheldrank;
    }

export function decide_twopair_kicker (player1pairs, player2pairs){
    while (player1pairs.length !== player2pairs.length) {
        if (player1pairs.length > player2pairs.length) {
            player1pairs.shift(); }
        else if (player2pairs.length > player1pairs.length) {
            player2pairs.shift(); }
    }


    for (let i = player1pairs.length-1; i >= 0; i--) {
        if (getRankValue(player1pairs[i]) > getRankValue(player2pairs[i])) {
             return ["player 1 wins", player1pairs[i]]; 
        } else if (getRankValue(player1pairs[i]) < getRankValue(player2pairs[i])) {
            return ["player 2 wins", player2pairs[i]];
        }else {
            return ["tie", 0];
        }
    }
}

export function full_house_kicker (playerhand, community){
    let fullseven = getcardsforkicker(playerhand, community);
    let heldrank;
    let kicker_rank;
    for (let i = 0; i <= fullseven.length - 3; i++){
        if (fullseven[i].number == fullseven[i+1].number && fullseven[i].number == fullseven[i+2].number){
            heldrank = fullseven[i].number;
                    }
                }
    for (let i = 0; i <= fullseven.length - 2; i++){
        if (fullseven[i].number == fullseven[i+1].number && fullseven[i].number != heldrank){
            kicker_rank = fullseven[i].number;
            break;
        }
    }
    return getRankValue(kicker_rank);
}

export function kicker(player1hand, player2hand) {
    // Sort both hands from high to low rank
    const p1Sorted = [...player1hand].sort((a, b) => getRankValue(b.number) - getRankValue(a.number));
    const p2Sorted = [...player2hand].sort((a, b) => getRankValue(b.number) - getRankValue(a.number));
    
    // Compare each card in order
    for (let i = 0; i < 7; i++) {
        const p1Val = getRankValue(p1Sorted[i].number);
        const p2Val = getRankValue(p2Sorted[i].number);
        
        if (p1Val > p2Val) return ["player 1 wins", p1Sorted[i].number];
        if (p2Val > p1Val) return ["player 2 wins", p2Sorted[i].number];
    }
    
    return ["tie", 0];
}