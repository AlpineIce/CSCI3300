//checking the player and or players cards and determing what hand they have

export function checkplayerhand(playerHand, community){
    //orer of cards by value
    
    let fullseven = playerHand.concat(community);   
    //sorted hand in order by value
    fullseven.sort((a, b) => getRankValue(a.number) - getRankValue(b.number));
    
    if (checkflush(fullseven)){
        if (checkstriaght(fullseven)){
            return "straight flush";
        }else {
            return "flush";
        }
    }else {}
    
    if (checkfourofakind(fullseven)){
        return "four of a kind";
    }else if (checkfullhouse(fullseven)){
            return "full house";
        }else if (checkThreeOfAKind(fullseven)){
            return "three of a kind";
            }else if (checkpair(fullseven) == 2){
                return "two pair";
            }else if (checkpair(fullseven) == 1){
                return "one pair";
            }else if (checkstraight(fullseven)){
                return "straight";
            }else {
                return "high card";
            }
    }
function getRankValue(numbrer) {
    // gives me rank values so i can sort them
    const values = {
        '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7,
        '8': 8, '9': 9, '10': 10, 'jack': 11, 'queen': 12, 'king': 13, 'ace': 14
    };
    return values[numbrer] || 0;
}

function checkflush(fullseven){
    // checks if something is a flush or straight flush
    let hearts = 0;
    let spades = 0; 
    let diamonds = 0;
    let clubs = 0;
    
    
    for (let y in fullseven){
        if (y == 'heart'){
            hearts++;
        }
        else if (y == 'spade'){
            spades++;
        }
        else if (y == 'diamond'){
            diamonds++;
        }
        else if (y == 'club') {
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
    for (let y in fullseven){
        for (let x in fullseven){
            if (y == x){
                pairs++;
            }
        }
    }
    return pairs;
}

function checkThreeOfAKind(fullseven) {
    // checks if there is three of a kind
    let count = 0;
    for (let y in fullseven){
        for (let x in fullseven){
            if (y ==x){
                count++;
            }
            
        }
    }
    if (count == 3) {
        return true;
    }else {
        return false;
    }
}

function checkfourofakind(fullseven) {
    // checks if there are four of a kind
    let count = 0;
    for (let y in fullseven){
        for (let x in fullseven){
            if (y ==x){
                count++;
            }
            
        }
    }
    if (count == 4) {
        return true;
    }else {
        return false;
    }
}

function checkfullhouse(fullseven){
    // checks for a full house
    if (((fullseven[1] == fullseven[2] && fullseven[1] == fullseven[3]) && (fullseven[4] == fullseven[5])) || ((fullseven[1] == fullseven[2]) && (fullseven[3] == fullseven[4] && fullseven[3] == fullseven[5]))) {
        return true;
    } else {
        return false
    }
        
}


function checkstraight (fullseven){
    // checks for a straight
    let yes = false
    for (let i = 0; i < 3; i++){
        if (getRankValue(fullseven[i+4].number)-getRankValue(fullseven[i].number) ==4){
            yes = true;
        }
    }
    if (getRankValue(fullseven[6].number == 13)){
        if (getRankValue(fullseven[0].number)== 2 && getRankValue(fullseven[1].number)==3 && getRankValue(fullseven[2])==4 && getRankValue(fullseven[3].number)==5){
            yes = true;
        }
    }
    return yes;
}

