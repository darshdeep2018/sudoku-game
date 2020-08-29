var genarray=[[],[],[],[],[],[],[],[],[]]
var temparray=[[],[],[],[],[],[],[],[],[]]
var board=[[],[],[],[],[],[],[],[],[]]


var newGame=document.getElementById('new-game')
var solve=document.getElementById('solve')


for(var i=0;i<9;i++){
	for(var j=0;j<9;j++){
		genarray[i][j]=document.getElementById(i*9+j);
	}
}


function initializeTemparray(temparray){
	for(var i=0;i<9;i++){
		for(var j=0;j<9;j++){
			temparray[i][j]=false;
		}
	}
}


function setTemparray(board,temparray){
	for(var i=0;i<9;i++){
		for(var j=0;j<9;j++){
			if(board[i][j]!=0)
			temparray[i][j]=true;
		}
	}
}


function setColor(temparray){
	for(var i=0;i<9;i++){
		for(var j=0;j<9;j++){
			if(temparray[i][j]!=0)
			genarray[i][j].style.color('RED');
		}
	}
}


function resetColor(temparray){
	for(var i=0;i<9;i++){
		for(var j=0;j<9;j++)
			genarray[i][j].style.color('GREEN');
	}
}


function changeBoard(board){
	for(var i=0;i<9;i++){
		for(var j=0;j<9;j++){
			if(board[i][j]!=0)
				genarray[i][j].innerText=board[i][j]
			else
				genarray[i][j].innerText=''
		}
	}
}

newGame.onclick=function(){
	var xhrRequest=new XMLHttpRequest()
	xhrRequest.onload=function(){
		var response=JSON.parse(xhrRequest.response)
		initializeTemparray(temparray)
		resetColor()
		board=response.board
		setTemparray(board,temparray)
		setColor(temparray)
		changeBoard(board)
	}
	xhrRequest.open('get','https://sugoku.herokuapp.com/board?difficulty=easy')
	xhrRequest.send()
}

function okToFill(board,x,y,num){
	for(var i=0;i<9;i++){
		if(board[x][i]==num||board[i][y]==num)
			return false
	}
	for(var i=x-x%3;i<x+3-x%3;i++){
		for(var j=y-y%3;j<y+3-y%3;j++){
			if(board[i][j]==num)
				return false
		}
	}
	return true
}


function solveSudokuUtil(board,x,y){
	if(x==9)
		return
	if(y==9){
		solveSudokuUtil(board,x+1,0)
		return
	}
	if(board[x][y]!=0){
		solveSudokuUtil(board,x,y+1)
		return
	}
	for(var num=1;num<=9;num++){
		if(okToFill(board,x,y,num)){
			board[x][y]=num;
			solveSudokuUtil(board,x,y+1)
			board[x][y]=0;
		}
	}
}

solve.onclick=function () {
	solveSudoku(board)
}

function solveSudoku(board){
	solveSudokuUtil(board,0,0)
}