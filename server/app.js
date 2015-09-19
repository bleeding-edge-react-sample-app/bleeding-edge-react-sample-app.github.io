import express, {Router} from 'express';
import {promisifyAll} from 'bluebird';
const fs = promisifyAll(require('fs'));

var router = module.exports = Router();

export default router;

