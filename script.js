const text = "This is a text!\nThis is a text!";
//const text = "asdf";

const type_container = document.querySelector(".typing-field");
const type_wrapper = document.createElement("div");
const brTag = document.createElement("br");
type_wrapper.className = "font-size-zero-wrapper";
type_container.append(type_wrapper);

const timerField = document.querySelector('.timer');

let textPosition = 0;

let startTypingTime;
let endTypingTime;
let isTyping = false;

makeTypingField = (text, container) => {
  for (let i = 0; i < text.length; i++) {
    const letter = document.createElement("span");
    letter.className = "letter";
    if (i === 0) {
        letter.classList.add('cursor');
    }
    letter.innerText = text[i];
    if (text[i] === "\n") {
        letter.innerText += String.fromCharCode(8629); // ensp - 8194; crarr
        letter.append(brTag);
    }
    letter.setAttribute("data-order", i);
    container.append(letter);
  }
};



makeTypingField(text, type_wrapper);

window.addEventListener("keydown", (e) => {
    if (e.key !== "Shift" && textPosition < text.length) {
        console.log(e.key);
        if (!isTyping) {
            isTyping = true;
            startTypingTime = Date.now();
        }
        const letter = document.querySelector(`.letter[data-order='${textPosition}']`);
        if (e.key === text[textPosition] || (e.key === "Enter" && text[textPosition] === "\n")) {
            letter.classList.remove('cursor');
            console.log(`textPosition ${textPosition} < text.length ${text.length}`);
            if (textPosition + 1 < text.length) { 
                // the char isn't last
                // and it has right neighbour
                const nextLetter = document.querySelector(`.letter[data-order='${textPosition + 1}']`);
                nextLetter.classList.add('cursor');
            }
            letter.classList.add('right');
            console.log(textPosition);
            textPosition++;
            
            if (textPosition === text.length) {
                // end of the exam
                endTypingTime = Date.now();
                isTyping = false;
                let deltaTime = endTypingTime - startTypingTime;
                const millisecTyping = deltaTime % 1000;
                deltaTime = Math.round(deltaTime / 1000);
                const secondsTyping = deltaTime % 60;
                deltaTime = Math.round(deltaTime / 60);
                // need to make check if minutes more than some big value, ex. 40
                const minutesTyping = deltaTime;
                timerField.innerText = `${minutesTyping}:${secondsTyping}.${millisecTyping}`;
            }


        } else {
            letter.classList.add('mistake');
        }
    } 

});
