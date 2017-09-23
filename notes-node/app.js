console.log('Starting app');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const argv = yargs.argv;
const command = argv._[0];

console.log('argv', argv);
console.log('command', command);

switch (command) {
  case 'add':
    notes.addNote(argv.title, argv.body);
    break;
  case 'list':
    notes.getAll();
    break;
  case 'read':
    notes.getNote(argv.title);
    break;
  case 'remove':
    notes.removeNote(argv.title);
    break;
  case 'clear':
    notes.clearNotes();
    break;
  default:
    break;
}
