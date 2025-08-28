export class Autor {
  #nome; //uso de propriedade privada
  #anoNascimento; //uso de propriedade privada
  constructor(nome, nacionalidade, anoNascimento) {
    this.#nome = nome;
    this._nacionalidade = nacionalidade;
    this.#anoNascimento = anoNascimento;
  }

  exibirInfo() {
    return `${this.#nome}: ${this._nacionalidade}, nascido em ${
      this.#anoNascimento
    }`;
  }

  get nome() {
    return this.#nome;
  }

  get nacionalidade() {
    return this._nacionalidade;
  }

  get anoNascimento() {
    return this.#anoNascimento;
  }

  //Método set de validação para garantir que o nome seja preenchido
  set nome(novoNome) {
    if (novoNome.trim() === "") {
      throw new Error("Campo 'nome' é obrigatório");
    }
    this.#nome = novoNome.trim();
  }

  set nacionalidade(novaNacionalidade) {
    this._nacionalidade = novaNacionalidade;
  }

  //Método set de validação
  set anoNascimento(novoAno) {
    const anoAtual = new Date().getFullYear();
    if (typeof novoAno !== "number" || novoAno > anoAtual) {
      throw new Error(
        `Ano de nascimento inválido: Inserir um número menor que ${anoAtual}.`
      );
    }
    this.#anoNascimento = novoAno;
  }
}
