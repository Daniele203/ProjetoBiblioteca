Projeto Biblioteca - desafio ADA
Classes:

- Autor
  Atributos: nome, nacionalidade, anoNascimento
  Uso de propriedade privada para os atributos #nome e #anoNascimento com setter de validação
- Livro
  Atributos: titulo, autor, ano, gênero, disponivel
- Usuario
  Atributos: nome, matricula, historico
  classes UsuarioAluno e UsuarioProfessor que herdam da classe Usuario
  Possuem atributos próprios:
  UsuarioAluno – curso
  UsuarioProfessor – departamento
  Método exibirInfo() - polimorfismo por sobrescrita de método

Projeto Biblioteca
Este projeto permite o cadastro de autores, livros e usuários, além de realizar empréstimos, devoluções e realizar consulta do histórico dos empréstimos e devoluções feitas pelos usuários e da disponibilidade dos livros do acervo.
Como rodar o projeto
Organize os arquivos da seguinte forma:
| Autores.js | Livro.js | Usuarios.js | Biblioteca.js | main.js
O arquivo `main.js` contém o código principal com os testes e execuções.
Uso do arquivo package.json com a instrução
{
"type": "module"
}

Funcionalidades disponíveis
Cadastro
• Autores
• Livros
• Usuários (Alunos e Professores)
Empréstimos e Devoluções
• Impede que um livro que esteja indisponível seja emprestado para outro usuário
• Impede que livros que não constam no acervo da biblioteca sejam emprestados
Histórico de empréstimos
• Exibe histórico dos empréstimos e devoluções feitas pelos usuários
Histórico de Livros
• Verifica se um livro está disponível ou não para empréstimo e se ele faz parte do acervo da biblioteca.
Exclusões
• Livro
• Autor
• Usuario
Dicas
• Para testar funcionalidades específicas, descomente as chamadas das funções. (Alguns testes de chamadas específicas foram comentadas para que o terminal pudesse mostrar as principais funcionalidades).
• O sistema evita duplicidade de autores, livros e usuários por nome ou matrícula.
=======

# ProjetoBiblioteca

Projeto Biblioteca - desafio ADA - POO

> > > > > > > 01788872ec34369625ee6855f2e67d2e39b32fed
