import app from './app'
const { PORT = 9090 } = process.env;
app.listen(PORT, () => {
    return console.log(`Express is listening at http://localhost:${PORT}`);
  });