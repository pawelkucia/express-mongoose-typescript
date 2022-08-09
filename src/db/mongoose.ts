//const mongoose = require('mongoose');
import { connect } from 'mongoose';
require('dotenv').config()

const uri = process.env.DB_URL_DEV || "";

connect(uri);