import 'reflect-metadata';
import express from 'express';
import './database';

const app = express();

app.use(express.json());

/**
 * GET: Buscar
 * Post: Salvar/Criar
 * Put: Alterar
 * Delete
 * Patch: Alteracao Especifica
 */

app.get('/', (request, response)=>{
  return response.json({msg : 'Hello World NLW04!'});
});

app.post('/', (request, response)=>{
  //Receber dados
  return response.json({msg: 'Dados salvos com sucesso!'});
});

app.listen(3333, ()=>{
  console.log('🚴 Server running at http://localhost:3333');
});