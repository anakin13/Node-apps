console.log('Notes file');

const fs = require('fs');
const _ = require('lodash');
const extfs = require('extfs');
const R = require('ramda');

const addNote = (title, body) => {
  console.log('Adding note', title + ' ' + body);

  const note = {
    title,
    body,
  };
  let notes = [];
  let notesString = '';

  if (extfs.isEmptySync('notes.json')) {
    var fd = fs.openSync('notes.json', 'w+');
  } else {
    var fd = fs.openSync('notes.json', 'r+');

    notesString = fs.readFileSync(fd);
    notes = JSON.parse(notesString);
  }

  notes.push(note);
  notesString = JSON.stringify(notes);
  console.log('This is notes array ', notes);

  fs.writeFileSync(fd, notesString);
  fs.closeSync(fd);
};

const getAll = () => {
  console.log('Getting all notes \n');

  const notesString = fs.readFileSync('notes.json');
  const notesObj = JSON.parse(notesString);

  // console.log(R.values(notesObj));
  notesObj.forEach((note, key) => {
    console.log(`Note ${key}\n title: ${note.title} \n body: ${note.body}`);
  });
};

const getNote = (title) => {
  console.log('Getting note', title);
};

const removeNote = (title) => {
  console.log('Removing note', title);
};

module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote,
};
