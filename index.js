#!/usr/bin/env node

const fs = require("fs");
const insertLine = require("insert-line");
const [,, ...args] = process.argv;
var targetPath = __dirname + "/changelog.txt";

if (args[0] == "setup") {
    var setupPath = __dirname + "/.pc/";
    if (!args[2]) return console.log("Pocket Change: No Enough Paremeters!")
    fs.mkdir(setupPath, function (err) {
        if (err) return console.log("Pocket Change: An Error Occured.")

        fs.writeFile(setupPath + "name.setup", `${args[1]}`, function (err) {
            if (err) return console.log("Pocket Change: An Error Occured.")
            fs.writeFile(targetPath, `${args[1]}` + " v" + args[2] + ":\n", function (err) {
                if (err) return console.log("Pocket Change: An Error Occured.");
                console.log("Pocket Change: Setup for " + `${args[1]}` + " v" + args[2] + " Is complete!");
            })
        })
    })


} else if (args[0] == "version") {

    fs.readFile(__dirname + "/.pc/name.setup","utf8",function (err,name) {
if (err) return console.log("Pocket Change: An Error Occured.");
        if (name == "") return console.log("Pocket Change: An Error Occured!");
        insertLine(targetPath).content(name + " v" + args[1] + ":\n").at(1).then(function (err) {
            if (err) return console.log("Pocket Change: An Error Occured!");
            console.log("Pocket Change: Changed " + name + " version to " + args[1]);
        })
    })


} else {
    fs.access(targetPath, fs.constants.F_OK | fs.constants.W_OK, (err) => {
        if (err) {
            console.log("Pocket Change: You need to setup project first! (pchg setup <Project Name> <Project Version>)")
        } else {
            insertLine(targetPath).content("- " + args.join(" ")).at(3).then(function (err) {
            if (err) return console.log("An Error Occured: " + err)
                console.log("Pocket Change: Added to ChangeLog.");

            })
        }
    })
}