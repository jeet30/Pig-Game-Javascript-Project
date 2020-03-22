/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores,roundScore,dice1,dice2,activePlayer,playOn,max,prev1,prev2;

function reset()
{
scores=[0,0];
roundScore=0;
activePlayer=0;
playOn=true;
prev=0;
max=parseInt(max);
document.querySelector('#current-0').textContent='0';
document.querySelector('#score-0').textContent='0';
document.querySelector('#current-1').textContent='0';
document.querySelector('#score-1').textContent='0';
document.querySelector('.dice1').style.display="none";
document.querySelector('.dice2').style.display="none";
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
		document.querySelector('.dice1').style.display="none";
		document.querySelector('.dice2').style.display="none";
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
	dice1=Math.floor(Math.random()*6)+1;
	dice2=Math.floor(Math.random()*6)+1;
	// Since Math.random gives random number b/n 0 and 1(floor rounds off)
	var diceDOM=document.querySelector('.dice1');
	diceDOM.style.display='block';
	diceDOM.src='dice-'+dice1+'.png';
	var diceDOMM=document.querySelector('.dice2');
	diceDOMM.style.display='block';
	diceDOMM.src='dice-'+dice2+'.png';
	if((dice1!==1 && dice2!==1) && ( ((prev1!==6 && dice1!==6) || (prev2!==6 && dice2!==6))))
	{
		prev1=dice1;
		prev2=dice2;
		roundScore+=(dice1+dice2);
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
	max=document.getElementById('max').value;
	if(max)
	{
		max=parseInt(max);
	}
	else{
		max=30;
	}
	if(scores[activePlayer]>=max)
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

