let picks=document.querySelectorAll('.pick');
let grid=document.querySelector('#game-grid');
let turn=document.querySelector('#turn');



class connectFour{
    constructor(y=5,x=6){
        this.x=x;
        this.y=y;
        this.board=Array(x+1).fill().map(()=>Array(y+1).fill(0));
        this.player='RED';
    }

    makeMove(x){
        for(let i=0;i<=this.y;i++){
            if(this.board[x][i]===0){
                this.board[x][i]=this.player;
                return i;
            }
        }
        alert("column full");
        return -1;
    }

    checkwin(x,y){
        for(let i=0;i+3<=this.y;i++){
            if(this.board[x][i]==this.player && this.board[x][i+1]==this.player&& this.board[x][i+2]==this.player&& this.board[x][i+3]==this.player){
                return 1;
            }
        }

        for(let i=0;i+3<=this.x;i++){
            if(this.board[i][y]==this.player && this.board[i+1][y]==this.player&& this.board[i+2][y]==this.player&& this.board[i+3][y]==this.player){
                return 1;
            }
        }

        let X=(x>=y)?(x-y):0;
        let Y=(x>=y)?0:(y-x);
        while(X+3<=this.x && Y+3<=this.y){
            if(this.board[X][Y]==this.player && this.board[X+1][Y+1]==this.player && this.board[X+2][Y+2]==this.player && this.board[X+3][Y+3]==this.player){
                return 1;
            }
            X++;
            Y++;
        }

        X=(x+y<=this.x)?(x+y):this.x;
        Y=(x+y<=this.x)?0:(y-(this.x-x));
        console.log(X+`and`+Y);
        while(X>=0 && Y+3<=this.y){
            if(X-3>0 && this.board[X][Y]==this.player && this.board[X-1][Y+1]==this.player && this.board[X-2][Y+2]==this.player && this.board[X-3][Y+3]==this.player){
                return 1;
            }
            X--;
            Y++;
        }


        this.player=(this.player=='RED')?'YELLOW':'RED';
        turn.innerText=(this.player=='RED')?'TURN: RED':'TURN: YELLOW';
        turn.style.color=(this.player=='RED')?'red':'yellow';
        return -1;
    }

}

const game=new connectFour();

picks.forEach((pick)=>{
    pick.addEventListener('click',()=>{
        let xval=Number(pick.getAttribute('id').substring(3));
        let yval=game.makeMove(xval);
        if(yval!=-1)
        {
        let ball=document.createElement('div');
        ball.classList.add('ball');
        grid.append(ball);
        ball.style.gridArea=`${(game.y+2)-yval}/${xval+1}/${(game.y+2)-yval+1}/${xval+2}`;
        ball.style.backgroundColor=(game.player=='RED')?'red':'yellow';
        if(game.checkwin(xval,yval)==1){
            picks.forEach((pick)=>{pick.style.visibility='hidden'});
            displayWin();
        }
        picks.forEach((p)=>{p.style.backgroundColor=(game.player=='RED')?'red':'yellow';})
        }

    })
});

delayedDisplay=(message)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            turn.innerText=message;
            resolve("success");
        },75);
    })
}

displayWin = async ()=>{
    msg=`TURN: ${game.player}`;
    await delayedDisplay(msg.substring(1));
    await delayedDisplay(msg.substring(2));
    await delayedDisplay(msg.substring(3));
    await delayedDisplay(msg.substring(4));
    await delayedDisplay(msg.substring(5));
    await delayedDisplay(msg.substring(5).concat(' W'));
    await delayedDisplay(msg.substring(5).concat(' WI'));
    await delayedDisplay(msg.substring(5).concat(' WIN'));
    await delayedDisplay(msg.substring(5).concat(' WINS'));
    await delayedDisplay(msg.substring(5).concat(' WINS!'));
};

document.querySelector('#reset-button').addEventListener('click',()=>{
    window.location.reload();
})
