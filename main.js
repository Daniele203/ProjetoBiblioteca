import { Autor } from "./Autores.js";
import { Livro } from "./Livro.js";
import { UsuarioAluno, UsuarioProfessor } from "./Usuarios.js";
import { Biblioteca } from "./Biblioteca.js";

const biblioteca = new Biblioteca();

// CADASTRO

// Autor
const autor1 = new Autor("Machado de Assis", "Brasileiro", 1839);
const autor2 = new Autor("Clarice Lispector", "Brasileira", 1920);
const autor3 = new Autor("Guimarães Rosa", "Português", 1908);
const autor4 = new Autor("Paulo Coelho", "Brasileiro", 1947);
biblioteca.adicionarAutor(autor1);
biblioteca.adicionarAutor(autor2);
biblioteca.adicionarAutor(autor3);
biblioteca.adicionarAutor(autor4);
biblioteca._autores.forEach((autor) => {
  console.log(autor.exibirInfo());
});

// Não pernite a inclusão de autores já cadastrados
// const autor5 = new Autor("Guimarães Rosa", "Português", 1908);
// biblioteca.adicionarAutor(autor5); // Error: Autor com o nome "Guimarães Rosa" já está cadastrado.

// Livros
const livro1 = new Livro("Dom Casmurro", autor1, 1899, "Romance");
const livro2 = new Livro("A Hora da Estrela", autor2, 1977, "Ficção");
const livro3 = new Livro("Grande Sertão: Veredas", autor3, 1956, "Romance");
const livro4 = new Livro("O Alquimista", autor4, 1988, "Romance");
biblioteca.adicionarLivro(livro1);
biblioteca.adicionarLivro(livro2);
biblioteca.adicionarLivro(livro3);
biblioteca.adicionarLivro(livro4);
biblioteca._livros.forEach((livro) => {
  console.log(livro.exibirInfo());
});
// Não permite a inclusão de livros já cadastrados
// const livro5 = new Livro("Grande Sertão: Veredas", autor3, 1956, "Romance");
// biblioteca.adicionarLivro(livro5); // Error: Livro com o título "Grande Sertão: Veredas" já está cadastrado.

// Usuários
const aluno = new UsuarioAluno("Ana dos Santos", "A001", "Letras");
const professor = new UsuarioProfessor("João de Almeida", "P001", "Literatura");
const aluno1 = new UsuarioAluno("Beatriz Machado", "A002", "Direito");
const professor1 = new UsuarioProfessor("Alice Marinho", "P002", "História");
const aluno2 = new UsuarioAluno("Luciana de Almeida", "A003", "Matemática");
const professor2 = new UsuarioProfessor("Marcos Antunes", "P003", "Física");
biblioteca.adicionarUsuario(aluno);
biblioteca.adicionarUsuario(professor);
biblioteca.adicionarUsuario(aluno1);
biblioteca.adicionarUsuario(professor1);
biblioteca.adicionarUsuario(aluno2);
biblioteca.adicionarUsuario(professor2);
biblioteca._usuarios.forEach((usuario) => {
  console.log(usuario.exibirInfo());
});
// Não permite o uso do mesmo número de matrícula para dois usuários
// const aluno3 = new UsuarioAluno("Bruna Fernandes", "A001", "Direito");
// biblioteca.adicionarUsuario(aluno3); // Error: Matrícula "A001" já está cadastrada.

// Editar dados do autor
// set de validação para o nome
// autor1.nome = "";
// console.log(autor1.exibirInfo()); // Error: Campo 'nome' é obrigatório

autor3._nacionalidade = "Brasileiro";
console.log(autor3.exibirInfo());

// set de validação para o ano de nascimento
// autor2.anoNascimento = 2030;
// console.log(autor2.exibirInfo()); // Error: Ano de nascimento inválido: Inserir um número menor que 2025.

function testarEmprestimoLivro(matricula, tituloLivro) {
  console.log(`Empréstimo de '${tituloLivro}' para usuário ${matricula}.`);

  const livro = biblioteca._livros.find((l) => l.titulo === tituloLivro);
  if (!livro) {
    console.error(` Livro '${tituloLivro}' não encontrado.`);
    return;
  }

  try {
    biblioteca.emprestarLivro(matricula, livro);
    console.log(" Empréstimo realizado com sucesso.");

    if (!livro.disponivel) {
      console.log(" Livro marcado como indisponível.");
    } else {
      console.log(" Livro ainda aparece como disponível.");
    }

    const emprestimos = biblioteca._emprestimosAtivos.filter(
      (e) => e.usuario.matricula === matricula && e.livro.titulo === tituloLivro
    );
    if (emprestimos.length > 0) {
      console.log(" Empréstimo registrado corretamente.");
    } else {
      console.log(" Empréstimo não foi registrado.");
    }
  } catch (error) {
    console.log(` Erro ao emprestar: ${error.message}`);
  }
}

function testarDevolucaoLivro(matricula, tituloLivro) {
  console.log(`Devolução de '${tituloLivro}' por usuário ${matricula}.`);

  try {
    biblioteca.devolverLivro(matricula, tituloLivro);
    console.log(" Devolução realizada com sucesso.");

    const livro = biblioteca._livros.find((l) => l.titulo === tituloLivro);
    if (livro && livro.disponivel) {
      console.log(" Livro marcado como disponível.");
    } else {
      console.log(" Livro ainda aparece como indisponível.");
    }

    const historico = biblioteca.consultarHistorico(matricula);
    if (historico.some((item) => item.includes(tituloLivro))) {
      console.log(" Histórico atualizado corretamente.");
    } else {
      console.log(" Histórico não foi atualizado.");
    }
  } catch (error) {
    console.log(` Erro ao devolver: ${error.message}`);
  }
}

testarEmprestimoLivro("A001", "Dom Casmurro");
testarEmprestimoLivro("P002", "Dom Casmurro");
testarDevolucaoLivro("A001", "Dom Casmurro");
testarEmprestimoLivro("P002", "Dom Casmurro");
testarEmprestimoLivro("A001", "Harry Potter");

function exibirHistoricoUsuario(matricula) {
  try {
    const historico = biblioteca.consultarHistorico(matricula);
    const usuario = biblioteca._usuarios.find((u) => u.matricula === matricula);

    if (!usuario) {
      console.log(` Usuário com matrícula ${matricula} não encontrado.`);
      return;
    }

    console.log(`Histórico de ${usuario.nome}:`);
    if (historico.length === 0) {
      console.log(" Nenhum registro encontrado.");
    } else {
      historico.forEach((item) => console.log(" -", item));
    }
  } catch (error) {
    console.log(` Erro ao consultar histórico: ${error.message}`);
  }
}

exibirHistoricoUsuario("A001");
exibirHistoricoUsuario("A002");

function verificarDisponibilidadeLivro(tituloLivro) {
  const livro = biblioteca._livros.find((l) => l.titulo === tituloLivro);
  if (!livro) {
    console.log(`Livro '${tituloLivro}' não encontrado.`);
    return;
  }

  const status = livro.disponivel ? "Disponível" : "Indisponível";
  console.log(`Livro '${tituloLivro}' está: ${status}`);
}

verificarDisponibilidadeLivro("Dom Casmurro");
verificarDisponibilidadeLivro("Grande Sertão: Veredas");
verificarDisponibilidadeLivro("Harry Potter");

// Excluir livro
function excluirLivro(titulo) {
  biblioteca._livros = biblioteca._livros.filter((l) => l.titulo !== titulo);
}
// excluirLivro("Grande Sertão: Veredas");
// console.log(
//   "Livros após exclusão:",
//   biblioteca._livros.map((l) => l.titulo)
// );

// Excluir autor
function excluirAutor(nome) {
  biblioteca._autores = biblioteca._autores.filter((a) => a.nome !== nome);
}
// excluirAutor("Clarice Lispector");
// console.log(
//   "Autores após exclusão:",
//   biblioteca._autores.map((a) => a.nome)
// );

// Excluir usuário
function excluirUsuario(matricula) {
  biblioteca._usuarios = biblioteca._usuarios.filter(
    (u) => u.matricula !== matricula
  );
}
// excluirUsuario("P001");
// console.log(
//   "Usuários após exclusão:",
//   biblioteca._usuarios.map((u) => u.nome)
// );
