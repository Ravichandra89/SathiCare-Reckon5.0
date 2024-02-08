import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import userRoute from '../server/Routes/userRoute.js';
import ticketRoute from '../server/Routes/ticketRoute.js';
import cors from 'cors';
import errorMiddleware from '../server/Middleware/error.middleware.js';

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));

// CORS configuration
const allowedOrigins = ['http://localhost:3000'];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// routes
app.use('/api/v1/user', userRoute);
app.use('/api/v1/ticket', ticketRoute);

app.use('/ping', (req, res) => {
  res.send('pong');
});

app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// Error middleware
app.use(errorMiddleware);

export default app;
