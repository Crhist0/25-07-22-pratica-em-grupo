// 1. Dado a seguinte lista de números:
// 8, 72, 1, 37, 21, 54, 7, 81, 23, 92, 12, 87, 3, 12, 6, 4
// Crie uma nova lista somente com os números ímpares e usando o
// filter

const listaInicial = [8, 72, 1, 37, 21, 54, 7, 81, 23, 92, 12, 87, 3, 12, 6, 4];

const listaImpares = listaInicial.filter((item) => item % 2);
// console.log("===LISTA ÍMPARES=== \n", listaImpares);

// 2. Dado a seguinte lista de números:
// 8, 72, 1, 37, 21, 54, 7, 81, 23, 92, 12, 87, 3, 12, 6, 4
// Some o valor total de todos números utilizando o reduce

const listaSoma = listaInicial.reduce((prev, next) => prev + next, 0);
// console.log("=== SOMA === \n", listaSoma);

// 3. Crie uma classe chamada Pessoa que contém os seguintes
// atributos: nome (string) e idade (number), que receba esses valores
// pelo construtor. Depois crie uma lista de Pessoa com algumas
// idades diferentes e por fim crie uma nova lista a partir dessa lista
// inicial utilizando o filter somente com as pessoas que possuem a
// idade menor que 23.

class Pessoa {
  nome: string;
  idade: number;
  salario: number;

  constructor(nome: string, idade: number, salario: number) {
    this.nome = nome;
    this.idade = idade;
    this.salario = salario;
  }
}

const pessoasLista: Pessoa[] = [
  new Pessoa("Antonio", 38, 4000),
  new Pessoa("João", 21, 2000),
  new Pessoa("BoraBill", 40, 1000),
  new Pessoa("Pedrinho", 35, 5000),
  new Pessoa("FidoBill", 6, 900),
  new Pessoa("MulherdoBill", 24, 50)
];

const pessoasMenos23 = pessoasLista.filter((pessoa) => pessoa.idade < 23);
// console.log(`As pessoas com menos de 23 anos são: \n`, pessoasMenos23);

// Utilizando a lista de Pessoa criada na atividade 3, filtre somente as
// pessoas que possuem a idade menor que 30 e calcule a média das
// idades das pessoas filtradas utilizando o reduce.

// const pessoasMenos30 = pessoasLista.filter((pessoa) => pessoa.idade < 30);
// const media = pessoasMenos30.reduce((soma, valorAtual, indice, vetor) => {
// const media = pessoasLista.reduce(
//   (acc, { idade }, indice, vetor) => {
//     if (idade < 30) {
//       acc.soma += idade;
//       acc.quantidade++;
//     }
//     if (indice === vetor.length - 1) {
//       return {
//         soma: acc.soma,
//         quantidade: acc.quantidade,
//         media: acc.soma / acc.quantidade,
//       };
//     }
//     return acc;
//   },
//   { soma: 0, quantidade: 0, media: 0 }
// ).media;
// console.log("Media", media);

// 5. Utilizando a classe Pessoa da atividade 3, adicione mais um atributo
// chamado salario (number), faça receber esse valor pelo construtor.
// Depois filtre todas as pessoas que possuem o salário menor que
// R$1027,00 e crie uma nova lista somente com o nome e a idade da
// pessoa.

const salarioAbaixo1027 = pessoasLista.filter(pessoa => pessoa.salario < 1027).map(pessoa =>{
    return { nome: pessoa.nome, idade: pessoa.idade }
})
console.log(salarioAbaixo1027);



  
