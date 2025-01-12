import prompt from "prompt-sync";
import { Conta, Banco } from "./banco";

const input = prompt();
const banco = new Banco();

let opcao: string = "";

do {
  console.log("\nBem vindo ao Banco!");
  console.log("Escolha uma opção:");
  console.log(
    "1 - Inserir Conta\n2 - Consultar Conta\n3 - Sacar\n4 - Depositar\n5 - Excluir Conta\n6 - Transferir\n7 - Totalizações\n0 - Sair"
  );
  opcao = input("Opção: ");

  switch (opcao) {
    case "1":
      inserirConta();
      break;
    case "2":
      consultarConta();
      break;
    case "3":
      sacar();
      break;
    case "4":
      depositar();
      break;
    case "5":
      excluirConta();
      break;
    case "6":
      transferir();
      break;
    case "7":
      totalizacoes();
      break;
    case "0":
      console.log("Encerrando aplicação...");
      break;
    default:
      console.log("Opção inválida.");
  }

  if (opcao !== "0") {
    input("Operação finalizada. Pressione <enter> para continuar.");
  }
} while (opcao !== "0");

// Funções
function inserirConta(): void {
  console.log("\nInserir Conta:");
  const numero = input("Digite o número da conta: ");
  const conta = new Conta(numero, 0);
  banco.inserir(conta);
  console.log("Conta inserida com sucesso!");
}

function consultarConta(): void {
  console.log("\nConsultar Conta:");
  const numero = input("Digite o número da conta: ");
  const conta = banco.consultar(numero);
  if (conta) {
    console.log(`Conta: ${conta.numero}, Saldo: ${conta.saldo}`);
  } else {
    console.log("Conta não encontrada.");
  }
}

function sacar(): void {
  console.log("\nSacar:");
  const numero = input("Digite o número da conta: ");
  const valor = parseFloat(input("Digite o valor do saque: "));
  if (banco.sacar(numero, valor)) {
    console.log("Saque realizado com sucesso.");
  } else {
    console.log("Saldo insuficiente ou conta não encontrada.");
  }
}

function depositar(): void {
  console.log("\nDepositar:");
  const numero = input("Digite o número da conta: ");
  const valor = parseFloat(input("Digite o valor do depósito: "));
  banco.depositar(numero, valor);
  console.log("Depósito realizado com sucesso.");
}

function excluirConta(): void {
  console.log("\nExcluir Conta:");
  const numero = input("Digite o número da conta: ");
  banco.excluir(numero);
  console.log("Conta excluída com sucesso.");
}

function transferir(): void {
  console.log("\nTransferir:");
  const numeroOrigem = input("Digite o número da conta de origem: ");
  const numeroDestino = input("Digite o número da conta de destino: ");
  const valor = parseFloat(input("Digite o valor da transferência: "));
  if (banco.transferir(numeroOrigem, numeroDestino, valor)) {
    console.log("Transferência realizada com sucesso.");
  } else {
    console.log("Transferência falhou. Verifique os dados e tente novamente.");
  }
}

function totalizacoes(): void {
  console.log("\nTotalizações:");
  console.log(`Total de contas: ${banco.quantidadeContas()}`);
  console.log(`Total em dinheiro: ${banco.totalDinheiro()}`);
  console.log(`Média de saldo: ${banco.mediaSaldo()}`);
}
