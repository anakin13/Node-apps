console.log('Notes file');

const fs = require('fs');
const _ = require('lodash')

const addNote = (title, body) => {
  console.log('Adding note', title + ' ' + body);

  const note = {
    title,
    body,
  };
  const fd = fs.openSync('notes.json', 'w+');

  const noteString = JSON.stringify(note);

  fs.writeFileSync(fd, noteString);
};

const getAll = () => {
  console.log('Getting all notes \n');

  const notesString = fs.readFileSync('notes.json');
  const notesObj = JSON.parse(notesString);

  console.log(notesObj);
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
