const mongoose = require('mongoose');
const User = require('./models/user'); 

mongoose.connect('mongodb://127.0.0.1:27017/MyMongoDB')
  .then(async () => {
    console.log('Conectado ao MongoDB');

    const users = await User.find();

    for (const user of users) {
      const nomeCompleto = [user.firstName, user.lastName].filter(Boolean).join(' ').trim();
      user.Name = nomeCompleto || 'Sem Nome';

      user.profileImageUrl = user.imageUrl || '';

      user.firstName = undefined;
      user.lastName = undefined;
      user.imageUrl = undefined;
      user.country = undefined;
      user.terms = undefined;

      await user.save();
      console.log(`Usuário ${user.email} migrado`);
    }

    console.log('Migração finalizada.');
    process.exit();
  })
  .catch((err) => {
    console.error('Erro ao conectar ao MongoDB:', err);
    process.exit(1);
  });
