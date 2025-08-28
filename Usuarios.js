export class Usuario {
  static #matriculasRegistradas = new Set();
  #historico;

  constructor(nome, matricula) {
    if (Usuario.#matriculasRegistradas.has(matricula)) {
      throw new Error(`Matrícula "${matricula}" já está cadastrada.`);
    }

    this._nome = nome;
    this._matricula = matricula;
    this.#historico = [];

    Usuario.#matriculasRegistradas.add(matricula);
  }

  exibirInfo() {
    return `Usuário: ${this._nome} (Matrícula: ${this._matricula})`;
  }

  get nome() {
    return this._nome;
  }

  get matricula() {
    return this._matricula;
  }

  adicionarAoHistorico(item) {
    this.#historico.push(item);
  }

  exibirHistorico() {
    return [...this.#historico];
  }

  static limparMatriculas() {
    Usuario.#matriculasRegistradas.clear();
  }
}

// Classe UsuarioAluno (herda da classe Usuario)
export class UsuarioAluno extends Usuario {
  constructor(nome, matricula, curso) {
    super(nome, matricula);
    this._curso = curso;
  }

  get curso() {
    return this._curso;
  }
  //polimorfismo por sobrescrita de método
  exibirInfo() {
    return `Aluno: ${this.nome} (Matrícula: ${this.matricula}, Curso: ${this.curso})`;
  }
}

// Classe UsuarioProfessor (herda da classe Usuario)
export class UsuarioProfessor extends Usuario {
  constructor(nome, matricula, departamento) {
    super(nome, matricula);
    this._departamento = departamento;
  }

  get departamento() {
    return this._departamento;
  }

  // polimorfismo por sobrescrita de método
  exibirInfo() {
    return `Professor: ${this.nome} (Matrícula: ${this.matricula}, Departamento: ${this.departamento})`;
  }
}
