/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores,roundScore,dice,activePlayer,playOn;

function reset()
{
scores=[0,0];
roundScore=0;
activePlayer=0;
playOn=true;
document.querySelector('#current-0').textContent='0';
document.querySelector('#score-0').textContent='0';
document.querySelector('#current-1').textContent='0';
document.querySelector('#score-1').textContent='0';
document.querySelector('.dice').style.display="none";
document.getElementById('name-0').textContent='Player 1';
document.getElementById('name-1').textContent='Player 2';
document.querySelector('.player-0-panel').classList.remove('winner');
document.querySelector('.player-1-panel').classList.remove('winner');
document.querySelector('.player-0-panel').classList.remove('active');
document.querySelector('.player-1-panel').classList.remove('active');
document.querySelector('.player-0-panel').classList.add('active');

}
reset();

/*dice=Math.floor(Math.random()*6)+1;// Since Math.random gives random number b/n 0 and 1(floor rounds off)
document.querySelector('#current-'+ activePlayer).textContent=dice;*/

function nextPlayer()
{
		document.querySelector('#current-0').textContent='0';
		document.getElementById('current-1').textContent='0';
		document.querySelector('.dice').style.display="none";
		document.querySelector('.player-0-panel').classList.toggle('active');
		document.querySelector('.player-1-panel').classList.toggle('active');
		activePlayer===0?activePlayer=1:activePlayer=0;
		roundScore=0;
}
function newGame()
{
	reset();
}
document.querySelector('.btn-roll').addEventListener('click',function(){
	if (playOn)
	{
	dice=Math.floor(Math.random()*6)+1;// Since Math.random gives random number b/n 0 and 1(floor rounds off)
	var diceDOM=document.querySelector('.dice');
	diceDOM.style.display='block';
	diceDOM.src='dice-'+dice+'.png';
	if(dice!=1)
	{
		roundScore+=dice;
		document.querySelector('#current-'+ activePlayer).textContent=roundScore;
	}
	else
	{
		nextPlayer();
	}	
}})
document.querySelector('.btn-hold').addEventListener('click',function(){
	if (playOn){
	scores[activePlayer]+=roundScore;
	document.getElementById('score-'+activePlayer).textContent=scores[activePlayer];
	if(scores[activePlayer]>=30)
	{
		document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
		document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
		document.getElementById('name-'+activePlayer).textContent='WINNER!';
		playOn=false;
	}
	else{
		nextPlayer();

	}
}})
document.querySelector('.btn-new').addEventListener('click',newGame);

