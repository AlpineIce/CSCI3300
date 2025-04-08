import { gameIterate } from "./card_logic.js";
function getNewCardSprite() {
    const container = document.createElement("div");
    container.classList.add("card");

    return container;
}

function createInteractionContainer() {
    const container = document.createElement("div");
    container.id = "button-container"
    document.body.appendChild(container);

    //Create a slider with a min, max, and default value
    function createSliderContainer(min, max) {
        const startingValue = min;

        //create label
        const label = document.createElement("label");
        label.innerText = `Amount: ${startingValue}`;

        //then create slider
        const slider = document.createElement("input");
        slider.id = "bet-raise-slider";
        slider.type = "range";
        slider.min = min;
        slider.max = max;
        slider.value = startingValue;
        
        //slider event
        slider.addEventListener("input", () => {
            label.innerText = `Amount: ${slider.value}`;
        });

        //create container for label and slider
        const sliderContainer = document.createElement("div");
        sliderContainer.id = "slider-container";

        // Append label and slider to the container
        sliderContainer.appendChild(label);
        sliderContainer.appendChild(slider);

        return sliderContainer;
    }

    //button helper class
    function createButton(label, id, onClick) {
        const button = document.createElement("button");
        button.id = id;
        button.innerText = label;
        button.addEventListener("click", () => {
            //call event with the value of the slider as a parameter
            const value = document.getElementById("bet-raise-slider").value;
            onClick(value);
        });

        return button;
    }

    function createBetRaiseContainer(betEvent, raiseEvent) {
        //create div
        const container = document.createElement("div");
        container.id = "bet-raise-buttons-container"

        //create bet and raise buttons
        container.appendChild(createButton("Bet", "bet-button", betEvent));
        container.appendChild(createButton("Raise", "raise-button", raiseEvent));

        return container;
    }

    //betEvent and raiseEvents take in the value of the slider as the only parameter
    function createButtonSliderPair(min, max, betEvent, raiseEvent) {
        //create div
        const container = document.createElement("div");
        container.id = "buttons-with-slider-container";

        // Create slider and buttons containers
        container.appendChild(createSliderContainer(min, max));
        container.appendChild(createBetRaiseContainer(betEvent, raiseEvent));

        return container;
    }

    //check button
    // 
    // ----------TODO TO WHOEVER WORKS ON THIS STUFF NEXT: REMOVE THE INLINE FUNCTIONS AND ADD ACTUAL FUNCTIONALITY TO THEM!!!----------
    // 
    const checkButton = createButton("Check", "check-button", (value) => {
        console.log("Player checks"); 
        gameIterate();
    });

    //call button
    // 
    // ----------TODO TO WHOEVER WORKS ON THIS STUFF NEXT: REMOVE THE INLINE FUNCTIONS AND ADD ACTUAL FUNCTIONALITY TO THEM!!!----------
    // 
    const callButton = createButton("Call", "call-button", (value) => {
        console.log("Player calls");  
        gameIterate();
    });

    //append independent buttons
    container.appendChild(checkButton);
    container.appendChild(callButton);

    //append buttons that use slider 
    // 
    // ----------TODO TO WHOEVER WORKS ON THIS STUFF NEXT: REMOVE THE INLINE FUNCTIONS AND ADD ACTUAL FUNCTIONALITY TO THEM!!!----------
    // 
    container.appendChild(createButtonSliderPair(50, 500, (value) => { console.log("Bet: " + value); gameIterate();}, (value) => { console.log("Raise: " + value); gameIterate();}));
}

function createCommunityCardsContainer() {
    const container = document.createElement("div");
    container.id = "community-cards-container"
    document.body.appendChild(container);

    container.appendChild(getNewCardSprite());
    container.appendChild(getNewCardSprite());
    container.appendChild(getNewCardSprite());
    container.appendChild(getNewCardSprite());
    container.appendChild(getNewCardSprite());
}

function createHoleCardsContainer() {
    const container = document.createElement("div");
    container.id = "hole-cards-container"
    document.body.appendChild(container);

    container.appendChild(getNewCardSprite());
    container.appendChild(getNewCardSprite());
}

//Function to initialize the buttons and sliders
export function initializeGui() {
    //add button container
    createInteractionContainer();
    
    //create community cards container
    createCommunityCardsContainer();

    //create hole cards container
    createHoleCardsContainer();
}
