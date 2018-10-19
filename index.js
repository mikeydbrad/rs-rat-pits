/*
* Name: Michael David Bradley
* Date: October 17 2018
* Section: CSE 154 AC
*
* This is the javascript file for a very simple game of rock paper scissors that users random
* number generation to determine the victor. After each round, the user can see their stats
* for their current browser session.
*/
(function() {
  "use strict";

  let wins = 0;
  let losses = 0;
  let ties = 0;

  window.addEventListener("load", initialize);

  /**
   * Creates starting functionality for the three buttons: rock, paper, and scissors
   * rock = 0, paper = 1, scissors = 2
   */
  function initialize() {
    $("rock").addEventListener("click", useRock);
    $("paper").addEventListener("click", usePaper);
    $("scissors").addEventListener("click", useScissors);
  }

  /**
   * If the user picks rock, then it gets compared against the AI's choice which is generated
   * within the function aiTurn. The aiChoice and lastRound are then passed into the function
   * endRound.
   */
  function useRock() {
    let aiChoice = aiTurn();
    let lastRound = comparator(0, aiChoice);
    endRound(aiChoice, lastRound);
  }

  /**
   * If the user picks paper, then it gets compared against the AI's choice which is generated
   * within the function aiTurn. The aiChoice and lastRound are then passed into the function
   * endRound.
   */
  function usePaper() {
    let aiChoice = aiTurn();
    let lastRound = comparator(1, aiChoice);
    endRound(aiChoice, lastRound);
  }

  /**
   * If the user picks scissors, then it gets compared against the AI's choice which is generated
   * within the function aiTurn. The aiChoice and lastRound are then passed into the function
   * endRound.
   */
  function useScissors() {
    let aiChoice = aiTurn();
    let lastRound = comparator(2, aiChoice);
    endRound(aiChoice, lastRound);
  }

  /**
   * Generates a random number and returns that number (from 0 to 2, inclusive)
   * @returns {int} - random number, 0-2 inclusive
   */
  function aiTurn() {
    let aiChoiceNumber = Math.floor(Math.random() * 3);
    return aiChoiceNumber;
  }


  /**
   * Compares the choices of the user and the AI to determine the winner.  This function increments
   * the win/loss/tie for scorekeeping, and also stores a string value of the result.
   * @param {int} user - the corresponding choice of the user, 0 = rock, 1 = paper, 2 = scissors
   * @param {int} ai - the corresponding choice of the ai, 0 = rock, 1 = paper, 2 = scissors
   * @return {string} - the state of the game in string format
   */
  function comparator(user, ai) {
    if (user === ai) {
      ties++;
      return "tied";
    } else {
      if (user === 0 && ai === 1) {
        losses++;
        return "lost";
      } else if (user === 0 && ai === 2) {
        wins++;
        return "won";
      } else if (user === 1 && ai === 0) {
        wins++;
        return "won";
      } else if (user === 1 && ai === 2) {
        losses++;
        return "lost";
      } else if (user === 2 && ai === 0) {
        losses++;
        return "lost";
      } else {
        wins++;
        return "won";
      }
    }
  }

  /**
   * This function resets the display by creating a new element and replacing the old one, and
   * shows for 3000ms the results of the round before calling a different method to return to the
   * default display.
   * @param {int} aiChoiceNumber - the choice of the ai, 0 = rock, 1 = paper, 2 = scissors
   * @param {string} lastRound - the string result of the previous round
   */
  function endRound(aiChoiceNumber, lastRound){
    let output1 = document.createElement("P");
    output1.id = "output-results";
    let outputText = document.createTextNode("The rat chose " + converter(aiChoiceNumber) + 
    ". You " + lastRound + ".");

    output1.appendChild(outputText);
    $("output-section").replaceChild(output1, $("output-score"));
    setTimeout(showResults, 3000);
  }

  /**
   * This function updates the display so it shows the user's stats from playing the game in the 
   * current browser session. It creates a new element and replaces the previous one from the 
   * function endRound().
   */
  function showResults() {
    let output2 = document.createElement("P");
    output2.id = "output-score";
    let outputText2 = document.createTextNode("Wins: " + wins + "  Losses: " + losses + 
    "  Ties: " + ties);

    output2.appendChild(outputText2);
    $("output-section").replaceChild(output2, $("output-results"));
  }

  /**
   * This is a utility function to convert the corresponding number to a string version of the
   * choice.
   * @param {int} number - the numerical value of the choice, 0 = rock, 1 = paper, 2 = scissors
   * @return {string} - the choice converted into string format
   */
  function converter(number) {
    if (number === 0) {
      return "rock";
    } else if (number === 1) {
      return "paper";
    } else {
      return "scissors";
    }
  }

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} id - element ID
   * @returns {object} DOM object associated with id.
   */
  function $(id) {
    return document.getElementById(id);
  }

})();