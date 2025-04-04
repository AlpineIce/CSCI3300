//Create a button with a label and clickable action
function createButton(label, onClick) {
    const button = document.createElement("button");
    button.innerText = label;
    button.style.margin = "5px";
    button.style.padding = "10px 20px";
    button.style.fontSize = "16px";
    button.addEventListener("click", onClick);
    return button;
}

//Create a slider with a min, max, and default value
function createSlider(min, max, defaultValue) {
    const sliderContainer = document.createElement("div");
    sliderContainer.style.marginTop = "10px";
    sliderContainer.style.display = "none";  
    sliderContainer.style.flexDirection = "column";
    sliderContainer.style.alignItems = "center";

    const label = document.createElement("label");
    label.innerText = `Amount: ${defaultValue}`;

    const slider = document.createElement("input");
    slider.type = "range";
    slider.min = min; 
    slider.max = max;  
    slider.value = defaultValue; 

    
    slider.addEventListener("input", () => {
        label.innerText = `Amount: ${slider.value}`;
    });

    // Append label and slider to the container
    sliderContainer.appendChild(label);
    sliderContainer.appendChild(slider);

    return { sliderContainer, slider };  
}

//Function to initialize the buttons and sliders
export function initializeGui(gameContainer) {
    const buttonContainer = document.createElement("div");
    buttonContainer.style.position = "fixed";
    buttonContainer.style.bottom = "20px";
    buttonContainer.style.right = "20px";
    buttonContainer.style.display = "flex";
    buttonContainer.style.flexDirection = "column";
    buttonContainer.style.alignItems = "flex-end";
    buttonContainer.style.background = "rgba(255, 255, 255, 0.9)";
    buttonContainer.style.padding = "10px";
    buttonContainer.style.borderRadius = "12px";
    buttonContainer.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.2)";
    document.body.appendChild(buttonContainer); 

    // Create sliders for both Bet and Raise
    const { sliderContainer: betSliderContainer, slider: betSlider } = createSlider(50, 500, 50);  
    const { sliderContainer: raiseSliderContainer, slider: raiseSlider } = createSlider(50, 500, 50);  

    // Shows the slider for the bet button
    const betButton = createButton("Bet", () => {
        betSliderContainer.style.display =
            betSliderContainer.style.display === "none" ? "flex" : "none";  
        console.log(`Bet Amount: ${betSlider.value}`);  
    });

    // Shows the slider for the raise button
    const raiseButton = createButton("Raise", () => {
        raiseSliderContainer.style.display =
            raiseSliderContainer.style.display === "none" ? "flex" : "none";  
        console.log(`Raise Amount: ${raiseSlider.value}`);  
    });

    
    const checkButton = createButton("Check", () => {
        console.log("Player checks"); 
    });

    // Call Button
    const callButton = createButton("Call", () => {
        console.log("Player calls");  
    });

    // Append buttons and sliders to the button container
    buttonContainer.appendChild(betButton);
    buttonContainer.appendChild(betSliderContainer);  
    buttonContainer.appendChild(raiseButton);
    buttonContainer.appendChild(raiseSliderContainer); 
    buttonContainer.appendChild(checkButton);
    buttonContainer.appendChild(callButton);
}
