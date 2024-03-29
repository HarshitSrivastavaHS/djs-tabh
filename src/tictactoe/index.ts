import {
    MessageResolvable, 
    UserResolvable
} from "discord.js"

export interface data {
    message: MessageResolvable,
    player1: UserResolvable,
    player2: UserResolvable
}

export async function tictactoe(props: data) {
    let message = props.message;
    let player1 = props.player1;
    let player2 = props.player2;
    let pieces = {
        "player1": "❌",
        "player2": "⭕",
        "empty": "◼️"
    }
    let gameboard:any[] = [];
    for (let i = 1; i<=9; i++) {
        gameboard.push(pieces.empty+((i==6||i==3)?"\n":""));
    }

    const emojis:any[] = [
        "1️⃣",
        "2️⃣",
        "3️⃣",
        "4️⃣",
        "5️⃣",
        "6️⃣",
        "7️⃣",
        "8️⃣",
        "9️⃣"
    ]

    let actemo:any[] = [...emojis];

    let msg = await message.channel.send("Please wait for the reactions to load")
    for (let i = 0; i<9; i++){
        await msg.react(emojis[i]);
        setTimeout(()=>{}, 500);
    }

    let activeplayer = player1;
    msg.edit(`${activeplayer}'s turn\n${gameboard.join("")}`);

    const filter = (reaction, user) => !user.bot && user.id == activeplayer && actemo.includes(reaction.emoji.name);
    const collector = msg.createReactionCollector(filter, {time: 30000})

    const allEqual = (arr, one, two, three, pieces) => {
    let x = two==5?arr[two].substr(0, arr[two].length-1):arr[two]
    if (x!=pieces.player1 && x != pieces.player2)
        return false
        return arr[one].startsWith(x) && arr[three].startsWith(x); 
    }
    const winCon = [
        ["0", "1", "2"],
        ["3", "4", "5"],
        ["6", "7", "8"],
        ["0", "3", "6"],
        ["1", "4", "7"],
        ["2", "5", "8"],
        ["0", "4", "8"],
        ["2", "4", "6"],
    ];
    let win = false;
    collector.on("collect", (a, b)=>{
        let place = emojis.indexOf(a.emoji.name);
        let test = place == 2 || place == 5 ? gameboard[place].substr(0, gameboard[place].length-1): gameboard[place];
        if (test!=pieces.empty) return;
        if (b.id == player1) {
            gameboard[place] = gameboard[place].replace(pieces.empty,pieces.player1);
        }
        else {
            gameboard[place] = gameboard[place].replace(pieces.empty,pieces.player2);
        }
        let wint = undefined;
        for (let condition of winCon) {
            if (allEqual(gameboard, condition[0], condition[1], condition[2], pieces)) {
            win = true;
            wint = condition[1];
            break;
            }
        }
        if (win) {
            let winner = gameboard[wint].startsWith(pieces.player1)?player1:player2;
            a.message.edit(`${winner} has won!'\n${gameboard.join("")}`);
            collector.stop();
            return;
        }
        if (!gameboard.includes(pieces.empty)) {
            a.message.edit(`Its a draw!'\n${gameboard.join("")}`);
            collector.stop();
            return
        }
        actemo.splice(actemo.indexOf(a.emoji.name), 1);
        activeplayer = activeplayer==player1?player2:player1;
        a.message.edit(`${activeplayer}'s turn\n${gameboard.join("")}`);
        collector.resetTimer();
    })
    collector.on("end",(a,b)=>{
        if (b!="time") return;
        collector.message.edit(`Game Timed Out\n${gameboard.join("")}`);
    })    
}
