import app from './app';
import './setup';

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));
