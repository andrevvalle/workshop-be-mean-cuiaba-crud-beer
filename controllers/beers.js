var Model = require('../models/beer');

var _beer = {
  create: function(req, res){
    // Aqui eu pego os dados do POST da requisição
    var dados = req.body;
    console.log('Dados: ', dados );

    var model = new Model(dados);
    model.save(function (err, data) {
      if (err){
        console.log('Erro: ', err);
        msg = err;
      }
      else{
        console.log('Cerveja Inserida: ', data);  
        msg = data;
      }
      res.json(msg);
    });  
  },
  retrieve: function(req, res){
    Model.find({}, function (err, data) {
      if (err){
        console.log('Erro: ', err);
        msg = err;
      }else{
        console.log('Listagem: ', data);
        msg = data;
      }
      res.json(msg);
    });
  },
  findOne: function(req, res){
    var query = {_id: req.params.id };
    Model.findOne(query, function (err, data) {
      if (err){
        console.log('Erro: ', err);
        msg = err;
      }else{
        console.log('Listagem: ', data);
        msg = data;
      }
      res.json(msg);
    });
  },
  update: function(req, res){
    var query = {_id: req.params.id };
    var mod = req.body;

    // removendo o _id do objeto para ser salvo
    delete mod._id;

    Model.update(query, mod, function (err, data) {
      if (err){
        console.log('Erro: ', err);          
        msg = err;
      }
      else{
        console.log('Cerveja atualizada com sucesso, quantidade: ', data);  
        msg = data;  
      }
      res.json(msg);
    });
  },
  remove: function(req, res){
    var query = {_id: req.params.id };
    Model.remove(query, function(err, data) {
      if(err) {
        console.log(err);        
        msg = err;
      } 
      else {
        console.log('Cerveja deletada com sucesso, quantidade: ', data);
      msg = data;
      }
    res.json(msg);
    });
  },
  renderList: function(req, res){
    Model.find({}, function (err, data) {
      if (err){
        console.log('Erro: ', err);
        msg = err;
        res.render('error', {error: msg});
      }
      else{
        console.log('Listagem: ', data);
        msg = data;
        res.render('beers/list', {
          beers: msg, 
          title: 'Listando cervejas'
        });
      }
    });
  },
  renderEntity: function(req, res){
    var query = {_id: req.params.id };
    Model.findOne(query, function (err, data) {
      if (err){
        console.log('Erro: ', err);
        msg = err;
        res.render('error', {error: msg});
      }
      else{
        console.log('Cerveja: ', data);
        msg = data;
        res.render('beers/get', {
          beer: msg, 
          title: 'Cerveja ' + msg.name
        });
      }
    });
  },
  renderCreate: function(req, res){
    res.render('beers/create', {title: 'Cadastro de Cerveja'})
  },
  renderUpdate: function(req, res){
    var query = {_id: req.params.id };
    Model.findOne(query, function (err, data) {
      if (err){
        console.log('Erro: ', err);
        msg = err;
        res.render('error', {error: msg});
      }
      else{
        console.log('Cerveja: ', data);
        msg = data;
        res.render('beers/update', {
          beer: msg, 
          title: 'Alteração da cerveja ' + msg.name
        });
      }
    });
  },
  renderRemove: function(req, res){
    var query = {_id: req.params.id };
    Model.findOne(query, function (err, data) {
      if (err){
        console.log('Erro: ', err);
        msg = err;
        res.render('error', {error: msg});
      }
      else{
        console.log('Cerveja: ', data);
        msg = data;
        res.render('beers/remove', {
          beer: msg, 
          title: 'Cerveja ' + msg.name
        });
      }
    });
  }
};

module.exports = _beer;




