import Logger from '../../util/logger';

import { Command } from './Interface';

import fs from 'fs';

const log = new Logger('/ping', 'blue');

import axios from 'axios';

function generateRandomKey(length:number=40) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
    let key = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      key += characters[randomIndex];
    }
  
    return key;
  }

export default async function handle(command: Command) {

    
}
