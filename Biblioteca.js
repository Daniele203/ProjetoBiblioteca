export class Biblioteca {
  constructor() {
    this._livros = [];
    this._autores = [];
    this._usuarios = [];
    this._emprestimosAtivos = [];
    this._emprestimosHistorico = [];
  }

  adicionarLivro(livro) {
    const existe = this._livros.some((l) => l.titulo === livro.titulo);
    if (existe) {
      throw new Error(
        `Livro com o título "${livro.titulo}" já está cadastrado.`
      );
    }
    this._livros.push(livro);
  }

  adicionarAutor(autor) {
    const existe = this._autores.some((a) => a.nome === autor.nome);
    if (existe) {
      throw new Error(`Autor com o nome "${autor.nome}" já está cadastrado.`);
    }
    this._autores.push(autor);
  }

  adicionarUsuario(usuario) {
    const existe = this._usuarios.some(
      (u) => u.matricula === usuario.matricula
    );
    if (existe) {
      throw new Error(
        `Usuário com matrícula ${usuario.matricula} já está cadastrado.`
      );
    }
    this._usuarios.push(usuario);
  }

  emprestarLivro(matricula, livro) {
    const usuario = this._usuarios.find((u) => u.matricula === matricula);
    if (!usuario) {
      throw new Error(`Usuário com matrícula ${matricula} não encontrado.`);
    }

    const livroDisponivel = this._livros.find(
      (l) => l.titulo === livro.titulo && l.disponivel
    );
    if (!livroDisponivel) {
      throw new Error(`Livro "${livro.titulo}" não está disponível.`);
    }

    livroDisponivel.emprestar();
    usuario.adicionarAoHistorico(`Empréstimo: ${livro.titulo}`);
    this._emprestimosAtivos.push({
      usuario,
      livro: livroDisponivel,
      data: new Date(),
    });
  }

  devolverLivro(matricula, tituloLivro) {
    const emprestimoIndex = this._emprestimosAtivos.findIndex(
      (e) => e.usuario.matricula === matricula && e.livro.titulo === tituloLivro
    );

    if (emprestimoIndex === -1) {
      throw new Error(
        `Empréstimo não encontrado para o livro "${tituloLivro}".`
      );
    }

    const emprestimo = this._emprestimosAtivos.splice(emprestimoIndex, 1)[0];
    emprestimo.livro.devolver();
    emprestimo.usuario.adicionarAoHistorico(`Devolução: ${tituloLivro}`);
    this._emprestimosHistorico.push(emprestimo);
  }

  consultarHistorico(matricula) {
    const usuario = this._usuarios.find((u) => u.matricula === matricula);
    if (!usuario) {
      throw new Error(`Usuário com matrícula ${matricula} não encontrado.`);
    }
    return usuario.exibirHistorico();
  }
}
