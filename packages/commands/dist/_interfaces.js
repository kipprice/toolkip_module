"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CommandState;
(function (CommandState) {
    CommandState[CommandState["ERR"] = 0] = "ERR";
    CommandState[CommandState["EXECUTED"] = 1] = "EXECUTED";
    CommandState[CommandState["REVERSED"] = 2] = "REVERSED";
})(CommandState = exports.CommandState || (exports.CommandState = {}));
