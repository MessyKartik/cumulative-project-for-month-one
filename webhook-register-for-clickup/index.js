import express from 'express';

const app = express();
app.use(express.json());

const PORT = 3000;

// ✅ Root route just to check server
app.get('/', (req, res) => {
  res.json({ status: 'ok' });
});

// ✅ Webhook route where ClickUp will send notifications
app.post('/webhook/clickup', (req, res) => {
  console.log('🚀 Webhook received from ClickUp:');
  console.log(JSON.stringify(req.body, null, 2));

  // Respond quickly to ClickUp to acknowledge receipt
  res.status(200).send('Webhook received');
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));


//https://api.clickup.com/api/v2/team/90161286992/webhook This is the url for webhook that I integret in clickup