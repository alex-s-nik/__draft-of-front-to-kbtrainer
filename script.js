//const text = "This is a text!\nThis is a text!";
//const text = "asdf";

const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dapibus placerat mattis. Duis placerat ligula vitae dolor egestas consectetur. Aenean vel odio non massa malesuada lobortis. Sed aliquam enim sit amet urna vehicula euismod. Aliquam at velit accumsan, scelerisque eros ac, vestibulum dui. Quisque a sem vitae erat ultrices venenatis. Sed vel efficitur nibh. Maecenas vitae dapibus neque, vel blandit velit. Proin nibh orci, fermentum id cursus vel, consectetur id neque. Nam leo lectus, accumsan id molestie sit amet, viverra eu mi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam rhoncus justo eget dictum rutrum. Etiam sit amet auctor elit.
Vestibulum porta sollicitudin est id condimentum. Donec purus erat, finibus id egestas ut, facilisis et turpis. Phasellus pellentesque, enim et rutrum condimentum, erat metus vehicula quam, convallis sollicitudin libero purus congue odio. Aliquam vel eros ligula. Praesent quis eros id nisi vehicula mollis. Vivamus at blandit arcu. Pellentesque euismod eu quam nec ullamcorper. Integer volutpat semper massa, quis tincidunt diam. Integer ut rhoncus augue. Curabitur eu porttitor felis, sit amet feugiat risus. Suspendisse at ipsum consequat, convallis metus vel, convallis dolor. Donec eu magna nec ante eleifend condimentum ac in turpis. In porta convallis aliquet.
Pellentesque sodales augue sit amet malesuada varius. Integer molestie ante sed tortor tincidunt, eget scelerisque erat aliquam. Quisque convallis lobortis diam. Suspendisse efficitur molestie ipsum vel hendrerit. Sed vehicula, quam eu varius aliquam, massa ligula malesuada est, nec commodo ipsum ex sit amet eros. Aliquam laoreet, justo non fermentum vestibulum, risus lorem viverra urna, in laoreet risus nunc in nisl. Maecenas id dictum neque, non iaculis diam.
Aenean ac egestas eros, sed scelerisque nisi. Nulla felis elit, convallis in erat et, ultrices sollicitudin nisl. Integer in lacus a risus fringilla tempor. Pellentesque libero lacus, pretium eget urna hendrerit, porttitor tristique arcu. Quisque quis lacinia enim. Integer convallis dui a ipsum semper, eget scelerisque diam convallis. Nullam tempor tortor ac varius tincidunt. Vivamus sed lectus dui. Praesent porta felis non feugiat vestibulum. Proin pulvinar, tellus auctor viverra pellentesque, ex mauris pharetra quam, nec hendrerit sem est et ipsum. Pellentesque ultrices eu purus ac aliquet. In pretium vestibulum urna, interdum sodales lorem sodales congue. Maecenas euismod laoreet purus. Sed sit amet diam a ipsum blandit posuere id at magna. Ut volutpat finibus nunc, vitae luctus augue sagittis eget. Morbi varius finibus felis, a sollicitudin ipsum mattis convallis.
Donec lectus sem, sodales consequat nunc id, bibendum pretium nisi. Morbi quis lobortis nisl. Phasellus et neque non massa tempus tempor in id tellus. Morbi facilisis, ligula ac consectetur ullamcorper, turpis lacus cursus diam, sodales ultrices velit purus ac felis. Praesent convallis volutpat diam eget facilisis. Nunc eleifend est id sem congue, quis tempor ligula condimentum. Cras sed lectus nisl.
Integer posuere at metus quis pretium. Suspendisse leo odio, dapibus non metus ac, mattis ornare nisl. Nunc ut turpis sit amet mi elementum laoreet. Curabitur maximus nunc in purus blandit consequat. Quisque mollis elit efficitur magna auctor, a rutrum sem pulvinar. Nunc id luctus.`;


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
    if (text[i] === String.fromCharCode(10)) {
        console.log('code == 10');
        letter.innerText += String.fromCharCode(8629); // ensp - 8194; crarr
        letter.innerHTML += '<br />';
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
        if (e.key === ' ') {
            console.log('Space has been pressed.');
            e.preventDefault();
        }
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

