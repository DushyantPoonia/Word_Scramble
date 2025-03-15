let words = [
    { word: "addition", hint: "The process of adding numbers" },
    { word: "meeting", hint: "Event in which people come together" },
    { word: "number", hint: "Math symbol used for counting" },
    { word: "exchange", hint: "The act of trading" },
    { word: "canvas", hint: "Piece of fabric for oil painting" },
    { word: "garden", hint: "Space for planting flowers and plants" },
    { word: "position", hint: "Location of someone or something" },
    { word: "feather", hint: "Hair-like outer covering of a bird" },
    { word: "comfort", hint: "A pleasant feeling of relaxation" },
    { word: "tongue", hint: "The muscular organ in the mouth" },
    { word: "expansion", hint: "The process of increase or growth" },
    { word: "country", hint: "A politically identified region" },
    { word: "friend", hint: "A person you trust and like" },
    { word: "needle", hint: "A thin, sharp metal pin" },
    { word: "library", hint: "Place with a collection of books" },
    { word: "climate", hint: "Weather conditions in a region" },
    { word: "pencil", hint: "A tool for writing or drawing" },
    { word: "diamond", hint: "A precious gemstone" },
    { word: "planet", hint: "A celestial body orbiting a star" },
    { word: "galaxy", hint: "A system of stars and planets" },
    { word: "rocket", hint: "A vehicle for space exploration" },
    { word: "guitar", hint: "A stringed musical instrument" },
    { word: "festival", hint: "A celebration or holiday event" },
    { word: "ocean", hint: "A large body of saltwater" },
    { word: "island", hint: "Land surrounded by water" },
    { word: "forest", hint: "Area covered with trees and plants" },
    { word: "desert", hint: "A dry, sandy region" },
    { word: "butterfly", hint: "An insect with colorful wings" },
    { word: "volcano", hint: "A mountain that erupts with lava" },
    { word: "puzzle", hint: "A game that tests problem-solving skills" }
  ];
    
  const wordText = document.querySelector(".word"),
    hintText = document.querySelector(".hint span"),
    timeText = document.querySelector(".time b"),
    inputField = document.querySelector("input"),
    resultMessage = document.querySelector(".result-message"),
    refreshBtn = document.querySelector(".refresh-word"),
    checkBtn = document.querySelector(".check-word"),
    scoreText = document.querySelector(".score");
  
  let correctWord, timer, score = 0;
  
  const initTimer = (maxTime) => {
    clearInterval(timer);
    timer = setInterval(() => {
      if (maxTime > 0) {
        maxTime--;
        return (timeText.innerText = maxTime);
      }
      clearInterval(timer); 
      displayMessage(`Time's up! The correct word was "${correctWord.toUpperCase()}"`, false);
      setTimeout(initGame, 5000); 
    }, 1000);
  };
  
  const initGame = () => {
    clearInterval(timer); 
    resultMessage.textContent = ""; 
    initTimer(30); 
    let randomObj = words[Math.floor(Math.random() * words.length)];
    let wordArray = randomObj.word.split("");
    for (let i = wordArray.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    wordText.innerText = wordArray.join(""); 
    hintText.innerText = randomObj.hint; 
    correctWord = randomObj.word.toLowerCase(); 
    inputField.value = ""; 
    inputField.setAttribute("maxlength", correctWord.length); 
  };
  
  const displayMessage = (message, isSuccess) => {
    resultMessage.textContent = message;
    resultMessage.style.color = isSuccess ? "green" : "red";
  };
  
  const checkWord = () => {
    let userWord = inputField.value.toLowerCase();
    if (!userWord) {
      return displayMessage("Please enter a word to check!", false);
    }
    if (userWord !== correctWord) {
      return displayMessage(`Oops! "${userWord}" is not correct.`, false);
    }
    displayMessage(`Congrats! "${correctWord.toUpperCase()}" is correct!`, true); 
    score++; 
    scoreText.textContent = `Score: ${score}`; 
    setTimeout(initGame, 5000); 
  };
  
  refreshBtn.addEventListener("click", initGame);
  checkBtn.addEventListener("click", checkWord);
  
  initGame(); 
