import Layout from "../components/Layout";
import { Grid, Card, Text, Divider, Code, Button } from "@geist-ui/react";
import { useEffect, useState } from "react";

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

interface Player {
    name: string,
    health: number,
    hand: any,
    deck: any,
    active: any,
    backup: any
}

export default function Play() {

    // view state is used to render a particular screen based on user interactions
    // 0 - click to init game
    // 1 - playing
    const [view, setView] = useState(0);

    const [playerX, setPlayerX]: any = useState(null);
    const [playerY, setPlayerY]: any = useState(null);

    const [activePlayerChoices, setActivePlayerChoices]: any = useState([]);
    const [opponentPlayerChoices, setOpponentPlayerChoices]: any = useState([]);
    const [apChoice, setApChoice]: any = useState(undefined);
    const [opChoice, setOpChoice]: any = useState(undefined);

    const [activePlayer, setActivePlayer]: any = useState(null);
    const [opponentPlayer, setOpponentPlayer]: any = useState(null);

    const [game, setGame]: any = useState(null);
    
    const [winner, setWinner]: any = useState(undefined);

    const [instructions, setInstructions] = useState("");

    function Player(this: any, name: any, deck: any) {
        this.name = name;
        this.health = 5;
        this.hand = [];
        this.deck = [...deck];
        this.backup = [];
        this.active = {};
    }

    Player.prototype = {
        shuffleDeck: function(active: boolean) {
            for (var i = this.deck.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = this.deck[i];
                this.deck[i] = this.deck[j];
                this.deck[j] = temp;
            }
        },
        drawCard: function(active: boolean) {

        }
    }

    function Game(this: any, uX: any, uY: any) {
        this.activePlayer = Math.random() >= 0.5 ? uX : uY;
        this.opponentPlayer = this.activePlayer === uX ? uY : uX;
        this.winner = undefined;
        this.firstTurn = 0;
        let activeChars: any = [];
        let opponentChars: any = [];

        for (let i = 0; i < 5; i++) {
            if (this.activePlayer.deck[i].type === "Character" && this.activePlayer.deck[i].grade == 0) {
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
        this.opponentPlayer.deck = this.opponentPlayer.deck.filter(function(el: any) { return el.id != opponentChars[k].id; }); 

        this.activePlayer.shuffleDeck(true);
        this.opponentPlayer.shuffleDeck(false);

        for (var i = 0; i < 2; i++) {
            this.activePlayer.drawCard();
            this.opponentPlayer.drawCard();
        }
        
        setActivePlayer(this.activePlayer);
        setOpponentPlayer(this.opponentPlayer);

        setView(1);
    }

    Game.prototype = {
        start: function() {
            if (winner === undefined) {
                console.log(this.activePlayer, this.opponentPlayer);
                if(Object.keys(this.activePlayer.active).length == 0 || Object.keys(this.opponentPlayer.active).length === 0) {
                    setInstructions("let's play")
                    this.beginTurnForAP();
                }
                // this.playTurn();
                // this.endTurn();
            }

            // setInstructions("one of the players won");
        },
        beginTurnForAP: function() {
            setInstructions(`${this.activePlayer.name} make choices`)
            this.findActiveChoices(this.activePlayer, true);
            this.findBackupChoices(this.activePlayer, true);

            // setInstructions(`${this.opponentPlayer.name} make choices`)
            // this.findActiveChoices(this.opponentPlayer);
            // this.findBackupChoices(this.opponentPlayer);
        },
        findActiveChoices: function (uXYZ: any, active: boolean) {
            let choices = [];

            for (let i = 0; i < uXYZ.hand.length; i++) {
                let currCard = uXYZ.hand[i];

                if(currCard.type == "Character" && currCard.grade == 0) {
                    choices.push(currCard);
                }
            }

            active ? setActivePlayerChoices(choices) : setOpponentPlayerChoices(choices);
        },
        findBackupChoices: function(uXYZ: any, active: boolean) {
            let choices = [];

            for(var i = 0; i < uXYZ.hand.length; i++){
                var currCard = uXYZ.hand[i]
                //console.log(currCard)
                if(currCard.type == "Character" && currCard.grade === 0 && currCard.id != uXYZ.active.id){
                    choices.push(currCard.id)
                }
    
            }

            active ? setActivePlayerChoices(choices) : setOpponentPlayerChoices(choices);
        }
    }

    function InitGame() {
        let tG = new (Game as any)(new (Player as any)("D", deckPlay1), new (Player as any)("V", deckPlay2));
        setGame(tG);
        tG.start();
    }

    return (
        <Layout pageTitle="Play Jenny">
            <div style={{
                textAlign: "center",
                marginTop: "100px"
            }}>
                <img src="https://firebasestorage.googleapis.com/v0/b/metalink-c9d12.appspot.com/o/animegirl.gif?alt=media&token=84155ce6-fdb0-495c-9d5a-364f6183aa93" />
                <Text style={{
                    fontSize: "25px",
                    fontWeight: "bold"
                }}>Game is coming soon!</Text>
            </div>
            {/* {view === 0 ? (
                <div style={{
                    textAlign: "center",
                    marginTop: "50px"
                }}> 
                    <Button type="success" onClick={InitGame}>Initiate Game</Button>   
                </div>
            ) : (
                <div style={{
                    textAlign: "center",
                    marginTop: "50px"
                }}>
                    {instructions}
                </div>
            )} */}
        </Layout>
    )
}