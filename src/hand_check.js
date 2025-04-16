//checking the player and or players cards and determing what hand they have

export function checkplayerhand(playerhand, community){
    //orer of cards by value
    
    let fullseven = (playerhand).concat(community);   
    //sorted hand in order by value
    fullseven.sort((a, b) => getRankValue(a.number) - getRankValue(b.number));
    let hand_value;
    let highcard;

    
    if (checkflush(fullseven)){
        if (checkstriaght(fullseven)){
            hand_value= "straight flush";
        }else {
            hand_value= "flush";
        }
    }else {}
    
    if (checkfourofakind(fullseven)){
            hand_value = "four of a kind";
    }else if (checkfullhouse(fullseven)){
            hand_value = "full house";
        }else if (checkThreeOfAKind(fullseven)){
            hand_value = "three of a kind";
            }else if (checkpair(fullseven) == 2){
                hand_value = "two pair";
            }else if (checkpair(fullseven) == 1){
                hand_value = "one pair";
            }else if (checkstraight(fullseven)){
                hand_value = "straight";
            }else {
                hand_value = "high card";
            }
    
    highcard = return_highcard(fullseven, hand_value);


    return {

        hand_value: hand_value,
        highcard: highcard,
    }


    }
function getRankValue(number) {
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
    
    
    for (let y in fullseven){
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
    for (let i = 0; i < fullseven.length; i++){
        if (fullseven[i].number == fullseven[i+1].number){
            pairs++;
        }
    }
    return pairs;
}

function checkThreeOfAKind(fullseven) {
    // checks if there is three of a kind
    let value = false
    for (let i = 0; i < fullseven.length; i++){
        if (fullseven[i].number == fullseven[i+1].number && fullseven[i].number == fullseven[i+2].number){
            value = true;
        }
    }
    return value;
}


function checkfourofakind(fullseven) {
    // checks if there are four of a kind
    let value = false
    for (let i = 0; i < fullseven.length; i++){
        if (fullseven[i].number == fullseven[i+1].number && fullseven[i].number == fullseven[i+2].number && fullseven[i].number == fullseven[i+3].number){
            value = true;
         }
    }
    return value;
}

function checkfullhouse(fullseven){
    // checks for a full house
    if (((fullseven[1].number == fullseven[2].number && fullseven[1].number == fullseven[3].number) && (fullseven[4].number == fullseven[5].number)) || ((fullseven[1].number == fullseven[2].number) && (fullseven[3].number == fullseven[4].number && fullseven[3].number == fullseven[5].number))) {
        return true;
    } else {
        return false
    }
        
}


function checkstraight (fullseven){
    // checks for a straight
    let value = false
    for (let i = 0; i < 3; i++){
        if (getRankValue(fullseven[i+4].number)-getRankValue(fullseven[i].number) ==4){
            value = true;
        }
    }
    if (getRankValue(fullseven[6].number == 13)){
        if (getRankValue(fullseven[0].number)== 2 && getRankValue(fullseven[1].number)==3 && getRankValue(fullseven[2])==4 && getRankValue(fullseven[3].number)==5){
            value = true;
        }
    }
    return yes;
}

function return_highcard (fullseven, hand_value){
    let returned_highcard;

    if (hand_value == "high card"){
        returned_highcard = fullseven[6].number;
    }
    else if (hand_value == "one pair"){
        for (let i = 0; i < fullseven.length; i++){
            if (fullseven[i].number == fullseven[i+1].number){
                returned_highcard = fullseven[i].number;
            }
        }
    }
    else if (hand_value == "two pair"){
        pairs = 0;
        for (let i = 0; i < fullseven.length; i++){
            if (fullseven[i] == fullseven[i+1]){
                pairs++;
                if (pairs == 2){
                    returned_highcard = fullseven[i].number
                }
            }
        }
    }
    else if (hand_value == "three of a kind"){
        for (let i = 0; i < fullseven.length; i++){
            if (fullseven[i].number == fullseven[i+1].number && fullseven[i].number == fullseven[i+2].number){
                returned_highcard = fullseven[i].number;
            }
        }

    }
    else if (hand_value == "straight"){
        for (let i = 0; i < 3; i++){
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
    else if (hand_value == "four of a kind"){
        for (let i = 0; i < fullseven.length; i++){
            if (fullseven[i].number == fullseven[i+1].number && fullseven[i].number == fullseven[i+2].number && fullseven[i].number == fullseven[i+3].number){
                returned_highcard = fullseven[i].number;
             }
        }
    }
    else if (hand_value == "full house"){
        for (let i = 0; i < fullseven.length; i++){
            if (fullseven[i].number == fullseven[i+1].number && fullseven[i].number == fullseven[i+2].number){
                returned_highcard = fullseven[i].number;
            }

        }
    }else if (hand_value == "flush"){
        let hearts = 0;
        let spades = 0; 
        let diamonds = 0;
        let clubs = 0;
    
    
        for(let y in fullseven){
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

        for (let i = 6; i >= 0; i--){
            if (fullseven[i].suit == high_suit){
                returned_highcard = fullseven[i].number;
            }
        }
    }
    else if (hand_value == "straight flush"){
        for (let i = 0; i < 3; i++){
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