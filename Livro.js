export class Livro {
  #disponivel;

  constructor(titulo, autor, ano, genero) {
    this._titulo = titulo;
    this._autor = autor;
    this._ano = ano;
    this._genero = genero;
    this.#disponivel = true;
  }

  get titulo() {
    return this._titulo;
  }

  get autor() {
    return this._autor;
  }

  get ano() {
    return this._ano;
  }

  get genero() {
    return this._genero;
  }

  get disponivel() {
    return this.#disponivel;
  }

  set disponivel(valor) {
    this.#disponivel = valor;
  }

  emprestar() {
    if (!this.disponivel) {
      throw new Error("Livro não está disponível para empréstimo");
    }
    this.disponivel = false;
  }

  devolver() {
    this.disponivel = true;
  }

  exibirInfo() {
    const disponibilidade = this.disponivel ? "Disponível" : "Indisponível";
    return `O livro ${this._titulo} de ${this._autor.nome} está ${disponibilidade}`;
  }
}
