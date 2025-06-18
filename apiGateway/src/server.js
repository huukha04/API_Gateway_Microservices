import app from './app.js';
import { PORT } from './config/dotenv.js';


app.listen(PORT, () => {
  console.log(`Gateway is running on port http://localhost:${PORT}`);
});