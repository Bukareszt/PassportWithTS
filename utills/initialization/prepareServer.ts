/* eslint-disable require-jsdoc */
import express from 'express';
import connection from '../db/connection';
import passportStrategies from '../../passport/passport.initialization';

export function prepareServer(server: express.Application): void {
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  server.use(passportStrategies());

  connection();
}


// twillio
// - chata pisanego - coś jak messanger
// - rejestrację i logowanie od strony serwisu
// - jak dodawać userów (jeśli trzeba)
// - jak robić videocalla
