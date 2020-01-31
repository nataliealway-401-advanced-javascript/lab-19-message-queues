'use strict';

// WORKER APPLICATION
// Credit to Calvins walk through
//----------------------------------------------------

const util = require('util');
const fs = require('fs');
// const net = require('net');
const events = require('./src/events.js');

// const client = new net.Socket();
// client.connect(3001, 'localhost', () => console.log('Socket in app.js is connected!'));

/**
 * This readFile function is a promise that reads the file
 * util.promisfy changes a callback to a promise
 * @param {object} file
 */
const readFile = util.promisify(fs.readFile);
/**
 * This writeFile function updates the file contents with the modified content
 * util.promisfy changes a callback to a promise
 * @param {object} file
 */
const writeFile = util.promisify(fs.writeFile);

const loadFile = (file) => readFile(file);
const saveFile = (file, buffer) => writeFile(file, buffer);
/**
 * @function converter
 * takes in the file's contents, changes them to strings and converts them to uppercase
 */
const converter = buffer => Buffer.from(buffer.toString().trim().toUpperCase());

/**
 * @function alterFile
 * @param  {} file
 * This function takes in the stringified content and overwrites it, saves it or gives an error
 */
const alterFile = async (file) => {
  try {
    let fileBuffer = await loadFile(file);
    let textBuffer = await converter(fileBuffer);
    await saveFile(file, textBuffer);
    let status = {
      status: 1,
      file: file,
      text: 'Saved Properly',
    };
    events.emit('file-save', status);
    return status;
  } catch (error) {
    let status = {
      status: 1,
      file: file,
      text: error.message,
    };
    events.emit('file-error', status);
  }
};

module.exports = {loadFile, saveFile, converter, alterFile};
