const express = require('express');
const cors = require('cors');
const contactRoutes = require('./routes/contactRoutes');
const welcomeEmailRoutes = require('./routes/welcomeEmailRoutes');

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.use('/contact', contactRoutes);
app.use('/send-welcome-email', welcomeEmailRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});