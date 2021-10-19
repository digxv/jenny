import Layout from "../components/Layout";
import { Grid, Card, Text, Divider, Code } from "@geist-ui/react";
import { useState } from "react";

// test data
let deckPlay1 = [
    {
        id: 1,
        type: "Character",
        name: "Naruto Kurama Mode",
        hp : 30,
        damage : 5,
        damageTaken : 0,
        defense : 0,
        grade : 1,
        attacks : [
            {
                atid : 0,
                req : 1,
                attack : 20
                
            },
            {
                atid : 1,
                req : 2,
                attack : 30
            }
        ],
        upgrade : "No",
        pred : "Naruto Regular",
        imageSrc: "https://gateway.pinata.cloud/ipfs/Qmabwy4GvirUzHWEScSiUTTE4c2hhssZQ2PwowCnJtbLUL"
    },
    {
        id: 2,
        type: "Character",
        name : "Sakura",
        hp : 20,
        grade : 0,
        damage : 2,
        defense : 0,
        damageTaken : 0,
        attacks : [
            {
                atid : 0,
                req : 1,
                attack : 10
            },
            {
                atid : 1,
                req : 2,
                attack : 20
            }
        ],
        upgrade : "No",
        pred : "",
        imageSrc: "https://gateway.pinata.cloud/ipfs/Qmabwy4GvirUzHWEScSiUTTE4c2hhssZQ2PwowCnJtbLUL"
    },
    {
        id: 3,
        type: "Character",
        name: "Naruto Regular",
        grade : 0,
        hp : 20,
        damage : 1,
        damageTaken : 0,
        defense : 0,
        attacks : [
            {
                atid : 0,
                req : 1,
                attack : 20
            }
        ],
        upgrade : "No",
        pred : "",
        imageSrc: "https://gateway.pinata.cloud/ipfs/Qmabwy4GvirUzHWEScSiUTTE4c2hhssZQ2PwowCnJtbLUL"
    },
    {
        id: 4,
        type: "Kessho",
        color: "Red"
    },
    {
        id: 5,
        type : "Kessho",
        color : "Blue"
    },

    {
        id: 13,
        type : "Item",
        name : "Shine sword",
        function : "Increase",
        param : "attack",
        value : "10",
        description: "Having this sword will increase your attack score by 10"
    },
    {
        id: 14,
        type : "Item",
        name : "Mint Extra",
        function : "Draw",
        value : "2",
        description: "You get to draw 2 cards"
    }
]

let deckPlay2 = [
    {
        id: 8,
        type: "Character",
        name: "Sakura tsunade mode",
        hp : 30,
        damage : 4,
        damageTaken : 0,
        defense : 0,
        grade : 1,
        attacks : [
            {
                atid : 0,
                req : 1,
                attack : 30
            },
            {
                atid : 1,
                req : 2,
                attack : 40
            }
        ],
        upgrade : "No",
        pred : "Sakuraaa"
    },
    {
        id: 9,
        type: "Character",
        name : "Sakuraaa",
        hp : 20,
        grade : 0,
        damage : 2,
        damageTaken : 0,
        defense : 0,
        attacks : [
            {
                atid : 0,
                req : 1,
                attack : 20
            }
        ],
        upgrade : "No",
        pred : ""
    },
    {
        id: 10,
        type: "Character",
        name: "Boroouto",
        grade : 0,
        hp : 20,
        damage : 10,
        damageTaken : 0,
        defense : 0,
        attacks : [
            {
                atid : 0,
                req : 1,
                attack : 10
            }
        ],
        upgrade : "No",
        pred : ""
    },
    {
        id: 11,
        type: "Kessho",
        color: "Red"
    },
    {
        id: 12,
        type : "Kessho",
        color : "Green"
    }
]

export default function Game() {

    // shuffle deck for players
    // draw 3 cards each
    // set active and backup characters
    // use a kessho
    // apply kesho to some active or backup characters
    // attach
    // reduce opponents hp
    // if opponent's active card's hp becomes zero, the player takes damage 

    const [initialized, setInitialized] = useState(false);
    const [game, setGame]: any = useState(null);

    const [activePlayer, setActivePlayer]: any = useState(null);
    const [opponentPlayer, setOpponentPlayer]: any = useState(null);

    const [player1, setPlayer1] = useState({
        name: "Digs",
        health: 5,
        hand: [],
        deck: deckPlay1,
        active: {},
        backup: []
    });
    const [player2, setPlayer2] = useState({
        name: "Vishaka",
        health: 5,
        hand: [],
        deck: deckPlay2,
        active: {},
        backup: []
    });

    const [winner, setWinner] = useState(null);

    const [instructions, setInstructions] = useState("");

    function Player (this: any, name: any, deck: any) {
        this.name = name;
        this.health = 5;
        this.hand = [];
        this.deck = [...deck];
        this.active = {};
        this.backup = [];
    }

    Player.prototype = {
        shuffleDeck : function (){
            for (var i = this.deck.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = this.deck[i];
                this.deck[i] = this.deck[j];
                this.deck[j] = temp;
            }
    
        },
        drawCard : function (){
    
            //if there are no cards left to draw for a player, they lose
            if (this.deck.length === 0) {
                this.health = 0;
            } 
            else {
                //remove first element from deck and add card to hand
                var card = this.deck[0];
                this.deck.shift();
                this.hand.push(card);
                
            }
        },
        playCard: function (card: any, target: any){
    
        }
    }

    function Game(this: any, player1: any, player2: any): any {
        this.activePlayer = Math.random() >= 0.5 ? player1 : player2;
        this.opponentPlayer = this.activePlayer === player1 ? player2 : player1;
        this.winner = undefined;
        this.firstTurn = 0;
        let activeChars: any = []
        let opponentChars: any = []
    
        for(var i = 0; i < 5; i++){
            if(this.activePlayer.deck[i].type == "Character" && this.activePlayer.deck[i].grade == 0){
                activeChars.push(this.activePlayer.deck[i]);
            }
            if(this.opponentPlayer.deck[i].type == "Character" && this.opponentPlayer.deck[i].grade == 0){
                opponentChars.push(this.opponentPlayer.deck[i]);
            }
    
        }
        var j = Math.floor(Math.random() * activeChars.length);
        var k = Math.floor(Math.random() * opponentChars.length);
        this.activePlayer.hand.push(activeChars[j]);
        this.opponentPlayer.hand.push(opponentChars[k]);
    
        this.activePlayer.deck = this.activePlayer.deck.filter(function(el: any) { return el.id != activeChars[j].id; }); 
        this.opponentPlayer.deck = this.opponentPlayer.deck.filter(function(el: any) { return el.id != opponentChars[j].id; }); 
    
        this.activePlayer.shuffleDeck();
        this.opponentPlayer.shuffleDeck();
        for (var i = 0; i < 2; i++) {
            this.activePlayer.drawCard();
            this.opponentPlayer.drawCard();
        }

        setActivePlayer(this.activePlayer);
        setOpponentPlayer(this.opponentPlayer);

        console.log(this.activePlayer.name + "'s hand")
        console.log(this.activePlayer.hand)
        console.log(this.opponentPlayer.name + "'s hand")
        console.log(this.opponentPlayer.hand)
    }

    Game.prototype = {
        start: function () {
            while (this.winner === undefined) {
    
                if(Object.keys(this.activePlayer.active).length === 0 || Object.keys(this.opponentPlayer.active).length === 0){
                    console.log('begin turn: ')
                    this.beginTurn();
                }
                
                this.playTurn();
                this.endTurn();
            }
        },

        beginTurn: function () {
            this.setActive(this.activePlayer);
            this.setBackup(this.activePlayer);
            console.log(this.activePlayer.name + " active: ");
            console.log(this.activePlayer.active)
            
            setInstructions(`${this.opponentPlayer.name} your turn to set active players`)

            this.setActive(this.opponentPlayer);
            this.setBackup(this.opponentPlayer);
            console.log(this.opponentPlayer.name + " active: ")
            console.log(this.opponentPlayer.active)
        },

        //STEPS 
        setActive : function (playy: any){

            var choices = [] 

            for(var i = 0; i < playy.hand.length; i++){
                var currCard = playy.hand[i]
                console.log(currCard)
                if(currCard.type == "Character" && currCard.grade == 0){
                    choices.push(currCard.id)
                }

            }

            var choice = window.prompt(playy.name + ", choose your active player " + choices)
            //document.getElementById("activeplay").innerHTML = str;
            for(var i = 0; i < playy.hand.length; i++){
                var currCard = playy.hand[i]
                //console.log(currCard)
                if(currCard.id == choice){
                    playy.active = currCard
                }

            }
            
        },
        setBackup : function (playy: any){
            var choices = [] 
            
            for(var i = 0; i < playy.hand.length; i++){
                var currCard = playy.hand[i]
                console.log(currCard)
                if(currCard.type == "Character" && currCard.grade == 0 && currCard.id != playy.active.id){
                    choices.push(currCard.id)
                }

            }

            var choice = window.prompt(playy.name + ", choose your backup player(comma separated) " + choices)
            if(choice){
                var ccs = choice.split(",").map(Number)
                //document.getElementById("activeplay").innerHTML = str;
                for(var j = 0; j < ccs.length; j++){
                    for(var i = 0; i < playy.hand.length; i++){
                        var currCard = playy.hand[i]
                        //console.log(currCard)
                        if(currCard.id == ccs[j]){
                            playy.backup.push(currCard) 
                        
                        }
            
                    }
                }
            }
            
            
        },

        useKessho: function (){

            //check in hand if kessho available. if yes, show kessho cards. ask player to choose which kessho card to apply and to which player
            //character choices will be either active or backup.
            this.activePlayer.drawCard();
    
            var choices = [] 
            for(var i = 0; i < this.activePlayer.hand.length; i++){
                var currCard = this.activePlayer.hand[i]
                if(currCard.type == "Kessho"){
                    choices.push(currCard.id)
                }
    
            }
    
            let choice: any = window.prompt(this.activePlayer.name + ", choose your kessho card. Or type 0 to skip: " + choices)
            
            //to show choices
            /*document.getElementById('kessho-cards').innerHTML = choices
    
            str = ""
            for (var item of choices) {
                str += "<option value='" + item.id + "'>" + item.color + "</option>"
            }
            document.getElementById("pickone").innerHTML = str;
    
            var currKessho = ""
            function getVal(){
                
                currKessho = document.getElementById("pickone").value;
               
            }
            
            //check how to get the kessho card
            document.getElementById("btn").addEventListener("click", getVal)*/
    
    
    
            //currKessho has current kessho. now remove it from hand
            var newHand = []
            for(var i = 0; i < this.activePlayer.hand.length; i++){
                if(this.activePlayer.hand[i].id === parseInt(choice)){
                    continue
                }
                else{
                    newHand.push(this.activePlayer.hand[i])
                }
            }
            this.activePlayer.hand = []
            this.activePlayer.hand = [...newHand]
    
    
    
            //choose which character to apply it on
            if(choice != 0){
                var charChoices = []
                for(var i = 0; i < this.activePlayer.backup.length; i++){
                    charChoices.push(this.activePlayer.backup[i].id);
                } 
                charChoices.push(this.activePlayer.active.id);
                let str = ""
               /* for (var item of charchoices) {
                    str += "<option value='" + item.id + "'>" + item.name + "</option>"
                }
                document.getElementById("pickchar").innerHTML = str;
                
                //to show choices
                document.getElementById('kessho-cards').innerHTML = choices
    
                var currCharacter = ""
                function getChar(){
                    
                    currCharacter = document.getElementById("pickchar").value;
                
                }
                
                //check how to get the charcater card
                document.getElementById("btn1").addEventListener("click", getChar)*/
                var currCharacter: any = window.prompt(this.activePlayer.name + ", choose the character you want to apply it to." + charChoices)
                console.log(currCharacter + " curr character for kessho");
    
                //APPLY KESSHO TO CHARACTER CARD
    
                if(this.activePlayer.active.id === parseInt(currCharacter)){
                    console.log(this.activePlayer.name + " applying to active")
                    if(this.activePlayer.active.kesshos){
    
                        if(this.activePlayer.active.kesshos < this.activePlayer.active.attacks[this.activePlayer.active.attacks.length - 1].req){
                            this.activePlayer.active.kesshos += 1;
                        }
                        else{
                            window.alert('max kesshos already applied');
                        }
    
    
                    }
                    else{
                        this.activePlayer.active.kesshos = 1;
                    }
                    console.log("after kessho: ")
                    console.log(this.activePlayer.active.kesshos)
                }
                else{
    
                    for(var i = 0; i < this.activePlayer.backup.length; i++){
                        if(this.activePlayer.backup[i].id === parseInt(currCharacter)){
                            if(this.activePlayer.backup[i].hasOwnProperty('kesshos')){
    
                                if(this.activePlayer.backup[i].kesshos < this.activePlayer.backup[i].attacks[this.activePlayer.backup[i].attacks.length - 1].req){
                                    this.activePlayer.backup[i].kesshos += 1;
                                }
                                else{
                                    alert('max kesshos already applied');
                                }
                
                            }
                            else{
                                this.activePlayer.backup[i].kesshos = 1;
                            }
                            console.log("after kessho: ")
                            console.log(this.activePlayer.backup[i].kesshos)
                        }
                        
                    }
                }
            }
            
    
    
        },

        upgradeCharacter : function(){

            //current names in active + backup
            var currNames = []
            if(this.activePlayer.active.grade === 0){
                currNames.push(this.activePlayer.active.name)
            }
            for(var i = 0; i < this.activePlayer.backup.length; i++){
    
                if(this.activePlayer.backup[i].grade === 0){
                    currNames.push(this.activePlayer.backup[i].name)
                }
     
            }
    
            console.log(currNames)
    
            //check hand
            //if grade 1 and predecessor in currNames
            var eligibleCards = []
            for(var i = 0; i < this.activePlayer.hand.length; i++){
                var cch = this.activePlayer.hand[i]
                console.log(cch.name)
                if(cch.grade === 1 && currNames.includes(cch.pred)){
                    eligibleCards.push(cch.id)
                }
            }
    
            //choose card
            var upgradeChoice: any = window.prompt(this.activePlayer.name + ", choose the character you want to use upgrade with." + eligibleCards)
            var uchar: any = {}
    
            for(var i = 0; i < this.activePlayer.hand.length; i++){
                var cch = this.activePlayer.hand[i]
                if(cch.id === parseInt(upgradeChoice)){
                    uchar = cch
                    console.log("uchar: ")
                    console.log(uchar)
                    break
                }
            }
    
    
            if(upgradeChoice){
                //check which active/backup card is eligible for upgrade        
                var choices = []
                if(this.activePlayer.active.name === uchar.pred){
    
                    choices.push(this.activePlayer.active.id)
                    
                }
                
    
                for(var i = 0; i < this.activePlayer.backup.length; i++){
    
                    if(this.activePlayer.backup[i].name === uchar.pred){
                        choices.push(this.activePlayer.backup[i].id)
                    }
    
                }
    
                //choose which character to apply it to
                var upgradableChar: any = window.prompt(this.activePlayer.name + ", choose the character you want to apply upgrade to." + choices)
    
                
                //change the stats of the grade 0 character and upgrade with new grade 1 card. the damage taken remains regardless
                if(this.activePlayer.active.id === parseInt(upgradableChar)){
    
                    this.activePlayer.active.name = uchar.name
                    this.activePlayer.active.grade = uchar.grade
                    this.activePlayer.active.hp = uchar.hp
                    this.activePlayer.active.hp -= this.activePlayer.active.damageTaken
                    this.activePlayer.active.damage = uchar.damage
                    this.activePlayer.active.upgrade = "Yes"
                    this.activePlayer.active.attacks = [...uchar.attacks]
                    this.activePlayer.active.pred = uchar.pred
    
                    console.log("after upgrade: ")
                    console.log(this.activePlayer.active)
    
                    
                }
                else{
                    
                    for(var i = 0; i < this.activePlayer.backup.length; i++){
    
                        if(this.activePlayer.backup[i].id === parseInt(upgradableChar)){
                            this.activePlayer.backup[i].name = uchar.name
                            this.activePlayer.backup[i].grade = uchar.grade
                            this.activePlayer.backup[i].hp = uchar.hp
                            this.activePlayer.backup[i].hp -= this.activePlayer.backup[i].damageTaken
                            this.activePlayer.backup[i].damage = uchar.damage
                            this.activePlayer.backup[i].upgrade = "Yes"
                            this.activePlayer.backup[i].attacks = [...uchar.attacks]
                            this.activePlayer.backup[i].pred = uchar.pred
                            console.log("after upgrade: ")
                            console.log(this.activePlayer.backup[i])
                            break;
                        }
            
                    }
                }
    
                //remove this grade 1 character from hand
                var newHand = []
                for(var i = 0; i < this.activePlayer.hand.length; i++){
                    if(this.activePlayer.hand[i].id === parseInt(upgradeChoice)){
                        continue
                    }
                    else{
                        newHand.push(this.activePlayer.hand[i])
                    }
                }
                this.activePlayer.hand = []
                this.activePlayer.hand = [...newHand]
            }
           
    
            
    
    
        },

        attackOpponent : function (){


            var attackChoices = []
            
            var ch: any = window.prompt("Press 1 to attack or press 0 to let go of the turn");
            console.log(this.activePlayer.active.kesshos + " kesshos available currently ")
            if(ch == 1 && this.activePlayer.active.kesshos){

                var validAttacks = []
                for(var i = 0; i < this.activePlayer.active.attacks.length; i++){
                    var at = this.activePlayer.active.attacks[i]

                    if(this.activePlayer.active.kesshos && at.req <= this.activePlayer.active.kesshos){
                        //document.getElementById('curr-attackname').innerHTML = at.name
                        //document.getElementById('curr-attackpoints').innerHTML = at.attack
                        validAttacks.push(at.attack)
                    }
                    
                }
                console.log("atcckss " + validAttacks);
            
                var cch: any = window.prompt(this.activePlayer.name + ", choose an attack: " + validAttacks)
                
                this.opponentPlayer.active.hp -= parseInt(cch)
                this.opponentPlayer.active.hp += this.opponentPlayer.active.defense

                this.opponentPlayer.active.damageTaken += parseInt(cch)
                
                
                if(this.opponentPlayer.active.hp <= 0){
                    console.log(this.opponentPlayer.health + " opponent health before")
                    this.opponentPlayer.health -= this.activePlayer.active.damage
                    
                    if(this.opponentPlayer.backup.length == 0){
                        this.opponentPlayer.health = 0

                    }
                    else{
                        var potentialActive = []
                        for(var i = 0; i < this.opponentPlayer.backup.length; i++){
                            potentialActive.push(this.opponentPlayer.backup[i].id)
                        }
                        var cch: any = window.prompt(this.opponentPlayer.name + ", choose an active player: " + potentialActive)
                        
                        for(var i = 0; i < this.opponentPlayer.backup.length; i++){
                            if(this.opponentPlayer.backup[i].id === parseInt(cch)){
                                this.opponentPlayer.active = JSON.parse(JSON.stringify(this.opponentPlayer.backup[i]))
                                this.opponentPlayer.backup.splice(i, 1)
                                console.log(this.opponentPlayer.active + " new active")
                                break;
                            }
                            
                        }
                    }
                }
                console.log("attack: "+  this.opponentPlayer.active.hp)
                console.log("opponent health: " + this.opponentPlayer.health)
                console.log("opponent damage taken: " + this.opponentPlayer.active.damageTaken)
            }

            else{
                this.firstTurn = 1;
            }
    
            
            
    
        },

        playTurn: function () {
        
            this.useKessho();
            //this.useItem();
            this.upgradeCharacter();
            this.attackOpponent();
    
        },

        endTurn: function () {
            if (this.opponentPlayer.health <= 0) {
                this.winner = this.activePlayer;
                window.confirm(this.winner.name + " wins!");
            } else {
                switchPlayers.call(this);
                window.alert(this.activePlayer.name + ", it's your turn.")
            }
    
            function switchPlayers(this: any) { // ECMA6: [activePlayer, opponentPlayer] = [opponentPlayer, activePlayer]
                var tmp = this.activePlayer;
                this.activePlayer = this.opponentPlayer;
                this.opponentPlayer = tmp;
            }
        }
    }

    return (
        <Layout pageTitle="Play Jenny">

            <h4>{instructions}</h4>

            <button onClick={() => {
                setGame(new (Game as any)(new (Player as any)(player1.name, deckPlay1), new (Player as any)(player2.name, deckPlay2)))
            }}>Init Players</button>

            <button onClick={() => {
                game.start();
            }}>
                Start Game
            </button>

            {activePlayer || opponentPlayer ? (
            <>
            <h4>{activePlayer.name}</h4>

            <Grid.Container mt="50px" gap={5} justify="center">
                {activePlayer.hand.map((item: any, index: any) => {
                    return (
                        <Card key={index} style={{
                            marginLeft: "10px"
                        }} width="400px">
                            <Card.Content>
                                <Text b>{item.name}</Text>
                            </Card.Content>
                            <Card.Content>
                                <Text>
                                    {JSON.stringify(item)}
                                </Text>
                            </Card.Content>
                        </Card>
                    )
                })}
            </Grid.Container>

            <br />

            <h4>{opponentPlayer.name}</h4>

            <Grid.Container mt="50px" gap={5} justify="center">
                {opponentPlayer.hand.map((item: any, index: any) => {
                    return (
                        <Card key={index} style={{
                            marginLeft: "10px"
                        }} width="400px">
                            <Card.Content>
                                <Text b>{item.name}</Text>
                            </Card.Content>
                            <Card.Content>
                                <Text>
                                    {JSON.stringify(item)}
                                </Text>
                            </Card.Content>
                        </Card>
                    )
                })}
            </Grid.Container>
            </>) : null}
        </Layout>
    )
}