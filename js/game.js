document.addEventListener("DOMContentLoaded", function() {

    var newGameElem = document.getElementById('js-newGameElement'),
        pickElem = document.getElementById('js-playerPickElement'),
        resultsElem = document.getElementById('js-resultsTableElement'),
        newGameBtn = document.getElementById('js-newGameButton');
    newGameBtn.addEventListener('click', newGame);

    //choise buttons-
    var pickRock = document.getElementById("js-playerPick_rock"),
        pickPaper = document.getElementById("js-playerPick_paper"),
        pickScissors = document.getElementById("js-playerPick_scissors");

    //start button
    pickRock.addEventListener('click', function() {
        playerPick('rock')
    });
    pickPaper.addEventListener('click', function() {
        playerPick('paper')
    });
    pickScissors.addEventListener('click', function() {
        playerPick('scissors')
    });
    //started value, scores and name of player, scores of computer

    var gameState = 'notStarted', //started // ended
        player = {
            name: '',
            score: 0
        },
        computer = {
            score: 0
        };




    //display game elements 
    function setGameElements() {
        switch (gameState) {
            case 'started':
                newGameElem.style.display = 'none';
                pickElem.style.display = 'block';
                resultsElem.style.display = 'block';
                break;
            case 'ended':
                newGameBtn.innerText = 'Jeszcze raz';
            case 'notStarted':
            default:
                newGameElem.style.display = 'block';
                pickElem.style.display = 'none';
                resultsElem.style.display = 'none';
        }
    }
    setGameElements();

    //start the game
    var playerPointsElem = document.getElementById('js-playerPoints'),
        playerNameElem = document.getElementById('js-playerName'),
        computerPointsElem = document.getElementById('js-computerPoints');


    function newGame() {
        player.name = prompt('Graczu, wpisz swoje imię', 'imię gracza');
        if (player.name) {
            player.score = computer.score = 0;
            gameState = 'started';
            setGameElements();

            playerNameElem.innerHTML = player.name;
            setGamePoints(); // refresh scores
        }

    }

    //set choise of player
    //choise of computer choise - random

    function getComputerPick() {
        var possiblePicks = ['rock', 'paper', 'scissors'];
        return possiblePicks[Math.floor(Math.random() * 3)];
    }
    //set choise to the website
    var playerPickElem = document.getElementById('js-playerPick'),
        computerPickElem = document.getElementById('js-computerPick'),
        playerResultElem = document.getElementById('js-playerResult'),
        computerResultElem = document.getElementById('js-computerResult');

    function playerPick(playerPick) {
        var computerPick = getComputerPick();
        playerPickElem.innerHTML = playerPick;
        computerPickElem.innerHTML = computerPick;
        checkRoundWinner(playerPick, computerPick);
        checkWinner();
    }
    //count othe score
    function setGamePoints() {
        playerPointsElem.innerHTML = player.score;
        computerPointsElem.innerHTML = computer.score;
    }

    function checkRoundWinner(playerPick, computerPick) {
        playerResultElem.innerHTML = computerResultElem.innerHTML = '';

        var winnerIs = 'player';

        if (playerPick == computerPick) {
            winnerIs = 'noone'; // remis
        } else if (
            (computerPick == 'rock' && playerPick == 'scissors') ||
            (computerPick == 'scissors' && playerPick == 'paper') ||
            (computerPick == 'paper' && playerPick == 'rock')) {

            winnerIs = 'computer';
        }

        if (winnerIs == 'player') {
            playerResultElem.innerHTML = "Wygrana!";
            player.score++;
        } else if (winnerIs == 'computer') {
            computerResultElem.innerHTML = "Wygrana!";
            computer.score++;
        } else {
            computerResultElem.innerHTML = "Remis"
            playerResultElem.innerHTML = "Remis"
        }
        setGamePoints()
    }

    function checkWinner() {


        if (computer.score - player.score >= 5) {
            var decWinner = confirm("Wymiękasz i chcesz zacząć od nowa?");

            if (decWinner == true) {
                gameState = 'notStarted';
            } else {
                alert("No to kończ rozgrywkę, gramy do 10 punktów!");
                gameState = 'started';
            }
        } else if (computer.score == 10) {
            alert("Wygrana komputera!");
            gameState = "ended";
        } else if (player.score == 10) {
            alert("Wygrana jest Twoja. Gratulacje!");
            gameState = "ended";
        }
        setGameElements();

    }

});

