const express = require('express');
const router = express.Router();
const Message = require('../models/message');
const User = require('../models/user');

// Criar uma nova mensagem
router.post('/create', async (req, res) => {
  const { text, userId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });

    const message = new Message({ text, user: userId });
    await message.save();

    user.messages.push(message._id);
    await user.save();

    res.status(201).json({ message: 'Mensagem criada com sucesso!', data: message });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao criar mensagem.' });
  }
});

// Editar uma mensagem
router.put('/edit/:id', async (req, res) => {
  const messageId = req.params.id;
  const { text } = req.body;

  try {
    const message = await Message.findByIdAndUpdate(messageId, { text }, { new: true });

    if (!message) return res.status(404).json({ message: 'Mensagem não encontrada.' });

    res.status(200).json({ message: 'Mensagem atualizada com sucesso!', data: message });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao atualizar mensagem.' });
  }
});

// Excluir uma mensagem
router.delete('/delete/:id', async (req, res) => {
  const messageId = req.params.id;

  try {
    const message = await Message.findByIdAndDelete(messageId);
    if (!message) return res.status(404).json({ message: 'Mensagem não encontrada.' });

    // Remover também do array de mensagens do usuário
    await User.findByIdAndUpdate(message.user, {
      $pull: { messages: messageId }
    });

    res.status(200).json({ message: 'Mensagem excluída com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao excluir mensagem.' });
  }
});

// Listar todas as mensagens com nome e imagem do usuário
router.get('/all', async (req, res) => {
  try {
    const messages = await Message.find()
      .populate('user', 'name profileImageUrl')
      .sort({ createdAt: -1 });

    res.status(200).json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao buscar mensagens.' });
  }
});

module.exports = router;
