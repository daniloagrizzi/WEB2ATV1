var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');

const Message = require('../models/message');

router.get('/', async function(req, res, next) {
    try {
        console.log('Buscando mensagens...');
      
        const messageFindTodos = await Message.find().populate('user', ' _id firstName imageUrl');
        console.log(messageFindTodos);
      
      res.status(200).json({
        myMsgSucesso: "Mensagens recuperadas com sucesso",
        objSMessageSRecuperadoS: messageFindTodos
      });
    } catch (err) {
      return res.status(500).json({
        myMsgErro: "Erro ao buscar mensagens",
        err: err
      });
    }
  });
  

router.post('/', async function (req, res,next){
    const messageObject = new Message({
        content: req.body.content,
        user: req.body.user
    });
    try{
        const messageSave = await messageObject.save();
        await messageSave.populate('user', '_id firstName imageUrl');
        console.log(messageSave);

        res.status(201).json({
            myMsgSucesso: "Messagem salva com sucesso",
            objMessageSave: messageSave
        });
    }
    catch(err){
        return res.status(500).json({
            myMsgErro: "Erro ao salvar mensagem",
            err: err
        });
    }

});

router.delete('/:id', async function(req, res, next) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            myMsgErro: "ID inválido para exclusão",
        });
    }
    
        try {
            const result = await Message.findByIdAndDelete(req.params.id);
            if (!result) {
                return res.status(404).json({
                    myMsgErro: "Mensagem não encontrada",
                });
            }
            res.status(200).json({
                myMsgSucesso: "Mensagem excluída com sucesso",
                objMessageDelete: result
            });
        } catch (err) {
            return res.status(500).json({
                myMsgErro: "Erro ao excluir mensagem",
                err: err
            });
        }
});

router.put('/:id', async function(req, res, next) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            myMsgErro: "ID inválido para atualização",
        });
    }
    try {
        const message = await Message.findByIdAndUpdate(req.params.id, { content: req.body.content }, { new: true });
        if (!message) {
            return res.status(404).json({
                myMsgErro: "Mensagem não encontrada",
            });
            
        }
        res.status(200).json({
            myMsgSucesso: "Mensagem atualizada com sucesso",
            objMessageUpdate: message
        });
    } catch (err) {
        return res.status(500).json({
            myMsgErro: "Erro ao atualizar mensagem",
            err: err
        });
    }
});

module.exports = router;