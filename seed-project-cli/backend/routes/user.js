const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user'); 
const router = express.Router();

router.post('/register', async (req, res) => {
  const { name, email, password, profileImageUrl } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password,
      profileImageUrl,
    });

    await user.save();
    res.status(201).json({ message: 'Usuário registrado com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao registrar o usuário.' });
  }
});


// Rota de login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado!' });
    }

    // Comparar a senha
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Senha incorreta!' });
    }

    req.session.userId = user._id;  

    const userWithoutPassword = {
      id: user._id,
      name: user.name,
      email: user.email,
      profileImageUrl: user.profileImageUrl
    };

    return res.status(200).json({
      message: 'Login bem-sucedido!',
      user: userWithoutPassword
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erro ao fazer login.' });
  }
});


// Rota de logout
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao encerrar sessão.' });
    }
    res.status(200).json({ message: 'Logout bem-sucedido!' });
  });
});

module.exports = router;
