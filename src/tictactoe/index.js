"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
exports.__esModule = true;
exports.tictactoe = void 0;
function tictactoe(props) {
    return __awaiter(this, void 0, void 0, function () {
        var message, player1, player2, pieces, gameboard, i, emojis, actemo, msg, i, activeplayer, filter, collector, allEqual, winCon, win;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    message = props.message;
                    player1 = props.player1;
                    player2 = props.player2;
                    pieces = {
                        "player1": "❌",
                        "player2": "⭕",
                        "empty": "◼️"
                    };
                    gameboard = [];
                    for (i = 1; i <= 9; i++) {
                        gameboard.push(pieces.empty + ((i == 6 || i == 3) ? "\n" : ""));
                    }
                    emojis = [
                        "1️⃣",
                        "2️⃣",
                        "3️⃣",
                        "4️⃣",
                        "5️⃣",
                        "6️⃣",
                        "7️⃣",
                        "8️⃣",
                        "9️⃣"
                    ];
                    actemo = __spreadArray([], emojis);
                    return [4 /*yield*/, message.channel.send("Please wait for the reactions to load")];
                case 1:
                    msg = _a.sent();
                    i = 0;
                    _a.label = 2;
                case 2:
                    if (!(i < 9)) return [3 /*break*/, 5];
                    return [4 /*yield*/, msg.react(emojis[i])];
                case 3:
                    _a.sent();
                    setTimeout(function () { }, 500);
                    _a.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 2];
                case 5:
                    activeplayer = player1;
                    msg.edit("<@" + activeplayer + ">'s turn\n" + gameboard.join(""));
                    filter = function (reaction, user) { return !user.bot && user.id == activeplayer && actemo.includes(reaction.emoji.name); };
                    collector = msg.createReactionCollector(filter, { time: 30000 });
                    allEqual = function (arr, one, two, three, pieces) {
                        var x = two == 5 ? arr[two].substr(0, arr[two].length - 1) : arr[two];
                        if (x != pieces.player1 && x != pieces.player2)
                            return false;
                        return arr[one].startsWith(x) && arr[three].startsWith(x);
                    };
                    winCon = [
                        ["0", "1", "2"],
                        ["3", "4", "5"],
                        ["6", "7", "8"],
                        ["0", "3", "6"],
                        ["1", "4", "7"],
                        ["2", "5", "8"],
                        ["0", "4", "8"],
                        ["2", "4", "6"],
                    ];
                    win = false;
                    collector.on("collect", function (a, b) {
                        var place = emojis.indexOf(a.emoji.name);
                        var test = place == 2 || place == 5 ? gameboard[place].substr(0, gameboard[place].length - 1) : gameboard[place];
                        if (test != pieces.empty)
                            return;
                        if (b.id == player1) {
                            gameboard[place] = gameboard[place].replace(pieces.empty, pieces.player1);
                        }
                        else {
                            gameboard[place] = gameboard[place].replace(pieces.empty, pieces.player2);
                        }
                        var wint = undefined;
                        for (var _i = 0, winCon_1 = winCon; _i < winCon_1.length; _i++) {
                            var condition = winCon_1[_i];
                            if (allEqual(gameboard, condition[0], condition[1], condition[2], pieces)) {
                                win = true;
                                wint = condition[1];
                                break;
                            }
                        }
                        if (win) {
                            var winner = gameboard[wint].startsWith(pieces.player1) ? player1 : player2;
                            a.message.edit("<@" + winner + "> has won!'\n" + gameboard.join(""));
                            collector.stop();
                            return;
                        }
                        if (!gameboard.includes(pieces.empty)) {
                            a.message.edit("Its a draw!'\n" + gameboard.join(""));
                            collector.stop();
                            return;
                        }
                        actemo.splice(actemo.indexOf(a.emoji.name), 1);
                        activeplayer = activeplayer == player1 ? player2 : player1;
                        a.message.edit("<@" + activeplayer + ">'s turn\n" + gameboard.join(""));
                        collector.resetTimer();
                    });
                    collector.on("end", function (a, b) {
                        if (b != "time")
                            return;
                        collector.message.edit("Game Timed Out\n" + gameboard.join(""));
                    });
                    return [2 /*return*/];
            }
        });
    });
}
exports.tictactoe = tictactoe;
