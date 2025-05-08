const mongoose = require('mongoose');
const Message = require('./models/message');

mongoose.connect('mongodb://127.0.0.1:27017/MyMongoDB')
  .then(async () => {
    console.log('Conectado ao MongoDB');

    const messages = await Message.find({});

    for (const message of messages) {
      let changed = false;

      // Ignora mensagens sem texto válido
      if (!message.text || typeof message.text !== 'string' || message.text.trim() === '') {
        console.warn(`Mensagem ${message._id} inválida (sem texto). Ignorada.`);
        continue;
      }

      // Ignora mensagens sem usuário
      if (!message.user) {
        console.warn(`Mensagem ${message._id} inválida (sem usuário). Ignorada.`);
        continue;
      }

      if (!message.createdAt) {
        message.createdAt = new Date();
        changed = true;
      }

      if (!message.updatedAt) {
        message.updatedAt = new Date();
        changed = true;
      }

      if (changed) {
        await message.save();
        console.log(`Mensagem ${message._id} atualizada`);
      }
    }

    console.log('Migração de mensagens finalizada.');
    process.exit();
  })
  .catch((err) => {
    console.error('Erro ao conectar ao MongoDB:', err);
    process.exit(1);
  });
