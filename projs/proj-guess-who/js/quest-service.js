var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;
var gLastRes = null;
const QUEST_KEY = 'quests';

function createQuestsTree() {
    gQuestsTree = createQuest('Male?');

    gQuestsTree.yes = createQuest('Gandhi!');
    gQuestsTree.no = createQuest('Rita!');

    if (loadFromStorage(QUEST_KEY)) {
        gQuestsTree = loadFromStorage(QUEST_KEY);
    }

    gCurrQuest = gQuestsTree;

    gPrevQuest = null;
}

function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
    };
}

function isChildless(node) {
    return (node.yes === null && node.no === null);
}

function moveToNextQuest(res) {
    gPrevQuest = gCurrQuest;
    gCurrQuest = gCurrQuest[res];
}

function addGuess(newQuestTxt, newGuessTxt, res) {
    var newQuest = createQuest(newQuestTxt);
    newQuest.yes = createQuest(newGuessTxt);
    newQuest.no = createQuest(res);
    gPrevQuest[gLastRes] = newQuest;
    gCurrQuest = gQuestsTree;
    saveToStorage(QUEST_KEY, gQuestsTree);
}

function getCurrQuest() {
    return gCurrQuest;
}

function updateGLastRes(res) {
    gLastRes = res;
}

function resetLastRes() {
    gLastRes = null;
}

function getQuestsTree() {
    return gQuestsTree;
}