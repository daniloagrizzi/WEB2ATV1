const express = require('express');
const User = require('../models/user');
const mongoose = require('mongoose');

const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        const { firstName, lastName, email, password, imageUrl, country,terms } = req.body;

        const usuarioExiste = await User.findOne({ email });
        if (usuarioExiste) {
            return res.status(400).json({ error: 'Usuário já existe' });
        }


        const novoUser = new User({
            firstName,
            lastName,
            email,
            password,
            imageUrl,
            country,
            terms
            
        });

        await novoUser.save();

        res.status(201).json({ message: 'Usuário cadastrado com sucesso!',user: {
            _id: novoUser._id,
            firstName: novoUser.firstName,
            lastName: novoUser.lastName,
            email: novoUser.email,
            imageUrl: novoUser.imageUrl
        } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao cadastrar o usuário' });
    }
});
router.post('/signin', async (req, res) => {
    try{
        console.log('teste para ver se ta chamando')
        const { email, password } = req.body;
        const emailValido = await User.findOne({email});
        if(emailValido){
            console.log('teste if')
            if (emailValido.password === password){
                return res.status(200).json({ message: 'Login realizado com sucesso', 
                    user:{
                        _id: emailValido._id,
                        firstName: emailValido.firstName,
                        lastName: emailValido.lastName,
                        email: emailValido.email,
                        imageUrl: emailValido.imageUrl
                    }  });
            }
            else {
                return res.status(400).json({ message: 'E-mail ou senha inválidos.' });
            }
        }
        else{
            return res.status(400).json({ message: 'E-mail ou senha inválidos.' });
            }
        }
        catch(err){
            console.log(err);
            res.status(500).json({ error: 'Erro ao fazer login' });

        }

    
});

module.exports = router;
