const { GoogleGenerativeAI } = require('@google/generative-ai');

async function listModels() {
  const genAI = new GoogleGenerativeAI('AIzaSyDNMFc1w7MYxNgfWUQFTxd58PzXQA43-Ic');
  const models = await genAI.listModels();
  console.log(JSON.stringify(models, null, 2));
}

listModels().catch(console.error);
