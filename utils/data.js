const fs = require("fs");
const path = require("path");
const originalsDataPath = path.join(__dirname, "./../data/originals.json");
const memesDataPath = path.join(__dirname, "./../data/memes.json");

const loadOriginals = () => {
    try {
        const buffer = fs.readFileSync(originalsDataPath);
        const dataJSON = buffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        console.log("loadOriginals ex " + e);
        return [];
    }
}

const saveOriginal = (file) => {
    
    const currentData = loadOriginals();
    let id = 1;
    if (currentData.length > 0) {
        id = currentData[currentData.length-1].id + 1;
    } 

    const original = {
        id: id,
        originalname: file.originalname,
        size: file.size,
        filename: file.filename
    }
    currentData.push(original)

    const data = JSON.stringify(currentData);
    fs.writeFileSync(originalsDataPath, data);
} 

const loadMemes = () => {
    try {
        const buffer = fs.readFileSync(memesDataPath);
        const dataJSON = buffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
}

const saveMeme = (file) => {
    const currentData = loadMemes();
    let id = 1;
    if (currentData.length > 0) {
        id = currentData[currentData.length-1].id + 1;
    } 

    const meme = {
        id: id,
        originalname: file.originalname,
        size: file.size,
        filename: file.filename
    }
    currentData.push(meme)
    const data = JSON.stringify(currentData);
    fs.writeFileSync(memesDataPath, data);
}

const saveOriginaWithMemeData = (currentData) => {
    const data = JSON.stringify(currentData);
    fs.writeFileSync(memesDataPath, data);
}

module.exports = {
    saveOriginal,
    saveMeme,
    loadOriginals,
    loadMemes,
    saveOriginaWithMemeData
}