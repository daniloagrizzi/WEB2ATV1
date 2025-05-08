const User = require('../models/user');
const bcrypt = require('bcryptjs');

// Registro
const register = async (req, res) => {
    const { name, email, password, profileImageUrl } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'Usuário já existe' });
        }
        
        const user = new User({ name, email, password, profileImageUrl });
        await user.save();
        req.session.userId = user._id; 
        res.status(201).json({ message: 'Usuário registrado com sucesso' });
    } catch (err) {
        res.status(500).json({ message: 'Erro no servidor' });
    }
};

// Login
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Usuário não encontrado' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Senha incorreta' });
        }

        req.session.userId = user._id;  
        res.json({ message: 'Login bem-sucedido' });
    } catch (err) {
        res.status(500).json({ message: 'Erro no servidor' });
    }
};

const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao fazer logout' });
        }
        res.json({ message: 'Logout bem-sucedido' });
    });
};

module.exports = { register, login, logout };
