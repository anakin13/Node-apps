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

  fs.writeFileSync(fd, notesString);
  fs.closeSync(fd);
};

const getAll = () => {
  console.log('Getting all notes \n');

  if (extfs.isEmptySync('notes.json')) {
    console.log('There are no notes to list');
  } else {
    const notesString = fs.readFileSync('notes.json');
    const notesObj = JSON.parse(notesString);

    notesObj.forEach((note, key) => {
      console.log(`Note ${key}\n title: ${note.title} \n body: ${note.body}`);
    });
  }
};

const getNote = (title) => {
  console.log('Getting note', title);

  const notesString = fs.readFileSync('notes.json');
  const notesObj = JSON.parse(notesString);

  notesObj.forEach((note, key) => {
    if (note.title === title) {
      console.log(`Note ${key}\n title: ${note.title} \n body: ${note.body}`);
    }
  });
};

const removeNote = (title) => {
  console.log('Removing note', title);

  if (extfs.isEmptySync('notes.json')) {
    throw new Error('There are no notes');
  } else {
    let notesString = fs.readFileSync('notes.json');
    let notesObj = JSON.parse(notesString);

    var fd = fs.openSync('notes.json', 'w+');

    notesObj.forEach((note, key) => {
      if (note.title === title) {
        notesObj.splice(key, 1);
        notesString = JSON.stringify(notesObj);
        console.log('notesString ', notesString);

        fs.writeFileSync(fd, notesString);
      }
    });

    fs.closeSync(fd);
  }
};

const clearNotes = () => {
  var fd = fs.openSync('notes.json', 'w+');
  fs.closeSync(fd);
};

module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote,
  clearNotes,
};
