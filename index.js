function getActions(playerActionInt) {
  enemyActionInt = enemyTurn();
  var playerHealthElement = document.getElementById("playerHealth");
  var enemyHealthElement = document.getElementById("enemyHealth");
  var messageElement = document.getElementById("action");

  //Player: 1-attack 2-defend 3-heal 4-magic
  //Enemy: 1- attack 2-attack 3- defend 4-heal
  switch (playerActionInt) {
    case 1: //You attack
      if (enemyActionInt == 3) {
        //Logic to attack and defend
        messageElement.innerHTML = "You attacked, but the enemy defended.";
      } else if (enemyActionInt == 4) {
        //logic to attack and heal
        messageElement.innerHTML = "You attacked, but the enemy healed itself.";
      } else {
        //logic to both attack
        messageElement.innerHTML = "You both successfully attacked each other.";
        playerAttacked();
        enemyAttacked();
      }
      break;
    case 2: //You defend
      if (enemyActionInt == 1 || enemyActionInt == 2) {
        //logic to defend and attack
        messageElement.innerHTML = "You defended the enemy's attack.";
      } else if (enemyActionInt == 3) {
        //logic to defend and defend
        messageElement.innerHTML = "You both tried to defend for some reason?";
      } else {
        //logic to defend and heal
        messageElement.innerHTML = "You defended, while the enemy recovered";
        if (parseInt(document.getElementById("enemyHealth").innerText) < 5) {
          enemyHealed();
        }
      }
      break;
    case 3: //You heal
      let playerHealth = parseInt(
        document.getElementById("playerHealth").innerHTML
      );
      if (playerHealth == 5) {
        messageElement.innerHTML = "You're already at full health.";
        return;
      }
      if (enemyActionInt == 4) {
        //logic to heal and heal
        messageElement.innerHTML = "You healed, while the enemy recovered";
        if (parseInt(document.getElementById("playerHealth").innerHTML) < 5) {
          playerHealed();
        }
        if (parseInt(document.getElementById("enemyHealth").innerHTML) < 5) {
          enemyHealed();
        }
      } else if (enemyActionInt == 3) {
        //logic to heal and defend
        messageElement.innerHTML =
          "You healed, while the enemy attempted to defend.";
        if (parseInt(document.getElementById("playerHealth").innerHTML) < 5) {
          playerHealed();
        }
      } else {
        //logic to heal and attack
        messageElement.innerHTML =
          "While you were healing, the enemy attacked you.";
      }
      break;
    case 4: //You use magic
      mana = parseInt(document.getElementById("playerMana").innerHTML);
      if (mana == 0) {
        messageElement.innerHTML =
          "You don't have enough mana to cast a spell.";
        return;
      }

      if (enemyActionInt == 1 || enemyActionInt == 2) {
        //logic to use magic and attack
        messageElement.innerHTML = "You cast a spell while being attacked.";
        playerAttacked();
        //Magic attack does 2 damage
        enemyAttacked();
        enemyAttacked();
        playerUsedMana();
      } else if (enemyActionInt == 3) {
        //logic to use magic and defend
        messageElement.innerHTML = "The enemy blocked your spell.";
        playerUsedMana();
      } else if (enemyActionInt == 4) {
        //logic to use magic and heal
        messageElement.innerHTML =
          "You cast a spell while the enemy was healing.";
        //enemy takes 2 damage but healed 1
        playerUsedMana();
        enemyAttacked();
      }
      break;
  }
  checkWin();
}
function playerAttacked() {
  playerHealth = parseInt(document.getElementById("playerHealth").innerHTML);
  playerHealth = playerHealth - 1;
  document.getElementById("playerHealth").innerHTML = playerHealth;
}
function enemyAttacked() {
  enemyHealth = parseInt(document.getElementById("enemyHealth").innerHTML);
  enemyHealth = enemyHealth - 1;
  document.getElementById("enemyHealth").innerHTML = enemyHealth;
}
function playerHealed() {
  playerHealth = parseInt(document.getElementById("playerHealth").innerHTML);
  playerHealth = playerHealth + 1;
  document.getElementById("playerHealth").innerHTML = playerHealth;
}
function enemyHealed() {
  enemyHealth = parseInt(document.getElementById("enemyHealth").innerHTML);
  enemyHealth = enemyHealth + 1;
  document.getElementById("enemyHealth").innerHTML = enemyHealth;
}
function playerUsedMana() {
  mana = parseInt(document.getElementById("playerMana").innerHTML);
  mana = mana - 1;
  document.getElementById("playerMana").innerHTML = mana;
}
function stopAnimation() {
  var player = document.getElementById("playerShake");
  var enemy = document.getElementById("enemyShake");
  player.style.animation = "none";
  enemy.style.animation = "none";
  void player.offsetWidth;
  void enemy.offsetWidth;
}
function restartAnimation() {
  var player = document.getElementById("playerShake");
  var enemy = document.getElementById("enemyShake");
  player.style.animation = "shake 5s infinite";
  enemy.style.animation = "shake 5s infinite";
}
function checkWin() {
  playerHealth = parseInt(document.getElementById("playerHealth").innerHTML);
  enemyHealth = parseInt(document.getElementById("enemyHealth").innerHTML);
  if (playerHealth <= 0 && enemyHealth <= 0) {
    //logic for a tie
    win("It was a tie!");
    stopAnimation();
    document.getElementById("playerShake").style.transform = "rotate(-90deg)";
    document.getElementById("enemyShake").style.transform = "rotate(90deg)";
  } else if (enemyHealth <= 0) {
    //logic for player win
    win("The player has won!");
    stopAnimation();
    document.getElementById("enemyShake").style.transform = "rotate(90deg)";
    document.getElementById("playerShake").style.transform = "rotate(0deg)";
  } else if (playerHealth <= 0) {
    //logic for enemy win
    win("The enemy has won!");
    stopAnimation();
    document.getElementById("playerShake").style.transform = "rotate(-90deg)";
    document.getElementById("enemyShake").style.transform = "rotate(0deg)";
  }
}
function win(message) {
  document.getElementById("attackBtn").style.visibility = "hidden";
  document.getElementById("defendBtn").style.visibility = "hidden";
  document.getElementById("healBtn").style.visibility = "hidden";
  document.getElementById("magicBtn").style.visibility = "hidden";
  document.getElementById("action").innerHTML = message;
}
function enemyTurn() {
  const actionVariable = Math.floor(Math.random() * 4) + 1;
  return actionVariable;
}
function playerAttack() {
  getActions(1);
  updateBars();
}

function playerDefend() {
  getActions(2);
  updateBars();
}
function playerHeal() {
  getActions(3);
  updateBars();
}
function playerMagicAttack() {
  getActions(4);
  updateBars();
}
function updateBars() {
  let playerHealth = parseInt(
    document.getElementById("playerHealth").textContent
  );
  let enemyHealth = parseInt(
    document.getElementById("enemyHealth").textContent
  );
  let mana = parseInt(document.getElementById("playerMana").textContent);
  const maxHealth = 5;
  const maxMana = 2;

  // Calculate the width percentages
  const playerHealthPercent = (playerHealth / maxHealth) * 100;
  const playerManaPercent = (mana / maxMana) * 100;
  const enemyHealthPercent = (enemyHealth / maxHealth) * 100;

  // Update bar widths
  document.getElementById("playerHealthBar").style.width =
    playerHealthPercent + "%";
  document.getElementById("playerManaBar").style.width =
    playerManaPercent + "%";
  document.getElementById("enemyHealthBar").style.width =
    enemyHealthPercent + "%";

  // Update the displayed numbers
  document.getElementById("playerHealthValue").textContent = playerHealth;
  document.getElementById("playerManaValue").textContent = playerMana;
  document.getElementById("enemyHealthValue").textContent = enemyHealth;
}
function reset() {
  document.getElementById("action").innerHTML =
    "Pick an action to start the game";
  document.getElementById("playerHealth").innerHTML = 5;
  document.getElementById("playerMana").innerHTML = 2;
  document.getElementById("enemyHealth").innerHTML = 5;
  restartAnimation();
  document.getElementById("attackBtn").style.visibility = "visible";
  document.getElementById("defendBtn").style.visibility = "visible";
  document.getElementById("healBtn").style.visibility = "visible";
  document.getElementById("magicBtn").style.visibility = "visible";
  updateBars();
}
