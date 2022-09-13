"use strict";
// 1. Dado a seguinte lista de números:
// 8, 72, 1, 37, 21, 54, 7, 81, 23, 92, 12, 87, 3, 12, 6, 4
// Crie uma nova lista somente com os números ímpares e usando o
// filter
const listaInicial = [
    8, 72, 1, 37, 21, 54, 7, 81, 23, 92, 12, 87, 3, 12, 6, 4
];
const listaImpares = listaInicial.filter((item) => item % 2);
console.log("===LISTA ÍMPARES=== \n", listaImpares);
// 2. Dado a seguinte lista de números:
// 8, 72, 1, 37, 21, 54, 7, 81, 23, 92, 12, 87, 3, 12, 6, 4
// Some o valor total de todos números utilizando o reduce
// 3. Crie uma classe chamada Pessoa que contém os seguintes
// atributos: nome (string) e idade (number), que receba esses valores
// pelo construtor. Depois crie uma lista de Pessoa com algumas
// idades diferentes e por fim crie uma nova lista a partir dessa lista
// inicial utilizando o filter somente com as pessoas que possuem a
// idade menor que 23.
