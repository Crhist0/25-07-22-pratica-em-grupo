"use strict";
// 1. Dado a seguinte lista de números:
// 8, 72, 1, 37, 21, 54, 7, 81, 23, 92, 12, 87, 3, 12, 6, 4
// Crie uma nova lista somente com os números ímpares e usando o
// filter
const listaInicial = [8, 72, 1, 37, 21, 54, 7, 81, 23, 92, 12, 87, 3, 12, 6, 4];
const listaImpares = listaInicial.filter((item) => item % 2);
console.log("===LISTA ÍMPARES=== \n", listaImpares);
// 2. Dado a seguinte lista de números:
// 8, 72, 1, 37, 21, 54, 7, 81, 23, 92, 12, 87, 3, 12, 6, 4
// Some o valor total de todos números utilizando o reduce
const listaSoma = listaInicial.reduce((prev, next) => prev + next, 0);
console.log("=== SOMA === \n", listaSoma);
// 3. Crie uma classe chamada Pessoa que contém os seguintes
// atributos: nome (string) e idade (number), que receba esses valores
// pelo construtor. Depois crie uma lista de Pessoa com algumas
// idades diferentes e por fim crie uma nova lista a partir dessa lista
// inicial utilizando o filter somente com as pessoas que possuem a
// idade menor que 23.
class Pessoa {
    constructor(nome, idade) {
        this.nome = nome;
        this.idade = idade;
    }
}
const pessoasLista = [
    new Pessoa("Antonio", 38),
    new Pessoa("João", 21),
    new Pessoa("BoraBill", 40),
    new Pessoa("Pedrinho", 35),
    new Pessoa("FidoBill", 6),
    new Pessoa("MulherdoBill", 24),
];
const pessoasMenos23 = pessoasLista.filter((pessoa) => pessoa.idade < 23);
console.log(`As pessoas com menos de 23 anos são: \n`, pessoasMenos23);
// Utilizando a lista de Pessoa criada na atividade 3, filtre somente as
// pessoas que possuem a idade menor que 30 e calcule a média das
// idades das pessoas filtradas utilizando o reduce.
// const pessoasMenos30 = pessoasLista.filter((pessoa) => pessoa.idade < 30);
// const media = pessoasMenos30.reduce((soma, valorAtual, indice, vetor) => {
const media = pessoasLista.reduce((acc, { idade }, indice, vetor) => {
    if (idade < 30) {
        acc.soma += idade;
        acc.quantidade++;
    }
    if (indice === vetor.length - 1) {
        return {
            soma: acc.soma,
            quantidade: acc.quantidade,
            media: acc.soma / acc.quantidade,
        };
    }
    return acc;
}, { soma: 0, quantidade: 0, media: 0 }).media;
console.log("Media", media);
