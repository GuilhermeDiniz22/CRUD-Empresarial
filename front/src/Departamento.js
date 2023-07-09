import React, { Component } from 'react';
import { variaveis } from './Variaveis.js';

/* O código importa as dependências necessárias para o componente: React e Component do pacote 'react' e o objeto variaveis 
de um arquivo local Variaveis.js.*/

export class Departamento extends Component {
  constructor(props) {
    super(props);
    this.state = {
      departamentos: [],
      modal: '',
      nomeDepartamento: '',
      idDepartamento: 0
    };
  }

  /* O componente Departamento é definido como um componente de classe que estende a classe Component do React. 
  O construtor define o estado inicial do componente, incluindo departamentos (uma matriz para armazenar dados do departamento),
  modal (para controlar o título de um modal), 
  nomeDepartamento (para armazenar o nome do departamento) e idDepartamento (para rastrear o ID do departamento). */

  atualizar = () => {
    fetch(variaveis.API_URL + 'departamento')
      .then(res => res.json())
      .then(data => {
        this.setState({ departamentos: data });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

/*O método atualizar busca dados de departamento de um ponto de extremidade de API especificado por variaveis. API_URL. 
Ele usa a função fetch para fazer uma solicitação HTTP GET, converte a resposta em JSON e atualiza o estado com os dados 
recuperados. O método de componentDidMount chama atualizar quando o componente é montado para buscar os dados iniciais. */

  componentDidMount() {
    this.atualizar();
  }

  /*O método componentDidMount() é um método de ciclo de vida fornecido pelo React. 
  Ele é chamado automaticamente pelo React quando o componente foi montado (inserido na árvore DOM). 
  Nesse código, componentDidMount() é usado para chamar o método atualizar(), 
  que busca dados do departamento de um ponto de extremidade da API e atualiza o estado do componente. */

  mudarNomeDepartamento = e => {
    this.setState({ nomeDepartamento: e.target.value });//e: 
    /*O parâmetro e representa o objeto de evento que é passado para a função de manipulador de eventos. 
    Ele contém informações sobre o evento que ocorreu. e.target: 
    A propriedade target do objeto de evento representa o elemento no qual o evento foi acionado. 
    Nesse caso, ele se refere ao elemento de entrada HTML onde o evento ocorreu. e.target.value: 
    A propriedade value do elemento target representa o valor atual inserido ou selecionado pelo usuário. 
    Ele é comumente usado para recuperar o valor de um campo de entrada ou a opção selecionada em um menu suspenso*/
  }

/*mudarNomeDepartamento é uma função de flecha que é definida dentro do componente Departamento. 
Ele é usado como um manipulador de eventos para atualizar a propriedade nomeDepartamento no estado do componente. 
Quando o valor de um campo de entrada é alterado, essa função é chamada e extrai o novo valor da propriedade de destino do evento 
e o define como o novo estado nomeDepartamento usando this.setState(). */

  addClick = () => {
    this.setState({
      modal: 'Adicionar departamento',
      idDepartamento: 0,
      nomeDepartamento: ''
    });
  }

/*addClick é uma função de seta atribuída a uma propriedade de classe. 
  Essa sintaxe garante que a função seja automaticamente vinculada à instância do componente e mantém a referência correta a ela. 
  Quando o método addClick é chamado, ele atualiza o estado do componente usando this.setState(). 
  Dentro de this.setState(), um objeto é fornecido com os novos valores de estado. 
  As propriedades que estão sendo atualizadas são: modalTitle: Define o valor como 'Adicionar departamento'. 
  Isso normalmente é usado para definir o título de um modal ou caixa de diálogo. 
  idDepartamento: Define o valor como 0, indicando que nenhuma ID de departamento específica está sendo editada no momento. 
  nomeDepartamento: Define o valor como uma cadeia de caracteres vazia, limpando qualquer nome de departamento inserido 
  anteriormente. */

  editClick = departamento => {
    this.setState({
      modal: 'Editar',
      idDepartamento: departamento.idDepartamento,
      nomeDepartamento: departamento.nomeDepartamento
    });
  }

  /*editClick é um método definido dentro do componente Departamento. 
Quando o método editClick é chamado, ele recebe um objeto departamento como um parâmetro. 
Esse objeto representa o departamento que está sendo editado. 
Dentro do método, o estado do componente é atualizado usando this.setState(). 
As propriedades de estado que estão sendo atualizadas são: modal: define o valor como 'Editar'. 
Isso normalmente é usado para definir o título ou o modo de um modal ou caixa de diálogo. idDepartamento: 
Define o valor para a propriedade idDepartamento do objeto departamento. Isso atualiza a ID do departamento que está sendo editado. 
nomeDepartamento: Define o valor para a propriedade nomeDepartamento do objeto departamento. 
Isso atualiza o nome do departamento que está sendo editado. */

  criarClick() {
    fetch(variaveis.API_URL + 'departamento', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nomeDepartamento: this.state.nomeDepartamento
      })
    })
    /* criarClick é um método definido dentro do componente Departamento. 
    Quando o método criarClick é chamado, ele executa uma solicitação HTTP POST para o ponto de extremidade de API especificada, 
    usando a função fetch. A URL para a solicitação POST é construída anexando 'departamento' à variável variaveis. 
    API_URL, que representa a URL base da API. A solicitação inclui os cabeçalhos necessários para aceitar e enviar dados JSON. 
    O corpo da solicitação é criado usando JSON.stringify() para converter um objeto que contém a propriedade nomeDepartamento 
    do estado do componente em uma cadeia de caracteres JSON. */
      .then(res => res.json())
      /*A resposta da API é manipulada usando a cadeia de método then() baseada em Promessa. No primeiro then(), 
      a resposta é convertida em JSON usando res.json().*/
      .then(result => {
        alert(result);
        this.atualizar();
      })
      /* O segundo then() manipula os dados JSON resultantes e executa ações de acordo. 
      Nesse caso, ele exibe um alerta com a mensagem de resultado e, em seguida, chama o método atualizar para atualizar os dados do componente. 
      Se ocorrer um erro durante a solicitação de busca ou qualquer cadeia de Promessa subsequente, 
      o bloco catch() exibirá um alerta com a mensagem 'Falha'.*/
      .catch(error => {
        alert('Falha');
      });
  }

  atualizarClick() {
    fetch(variaveis.API_URL + 'departamento', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        idDepartamento: this.state.idDepartamento,
        nomeDepartamento: this.state.nomeDepartamento
      })

  /*atualizarClick é um método definido dentro do componente Departamento. 
  Quando o método atualizarClick é chamado, ele executa uma solicitação HTTP PUT para o ponto de extremidade da API especificada,
  usando a função fetch. A URL para a solicitação PUT é construída anexando 'departamento' a variaveis. 
   API_URL, que representa a URL base da API. A solicitação inclui os cabeçalhos necessários para aceitar e enviar dados JSON. 
  O corpo da solicitação é criado usando JSON.stringify() para converter um objeto que contém as propriedades idDepartamento 
  e nomeDepartamento do estado do componente em uma cadeia de caracteres JSON.*/
        })
      .then(res => res.json())
      .then(result => {
        alert(result);
        this.atualizar();
      })
      .catch(error => {
        alert('Falha');
      });
  }

/* 
   A resposta da API é manipulada usando a cadeia de método then() baseada em Promessa. No primeiro then(), 
   a resposta é convertida em JSON usando res.json(). O segundo then() manipula os dados JSON resultantes e executa ações 
   de acordo. Nesse caso, ele exibe um alerta com a mensagem de resultado e, em seguida, chama o método atualizar 
   para atualizar os dados do componente.*/

  deleteClick(id) {
    fetch(variaveis.API_URL + 'departamento/' + id, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })

  /*Quando o método deleteClick é chamado, ele executa uma solicitação HTTP DELETE no endpoint de API especificado, 
  usando a função de fetch. A URL para a solicitação DELETE é construída anexando o parâmetro id a variaveis. 
  API_URL + 'departamento/'. Isso forma a URL completa para excluir um departamento específico com base em sua ID. 
  A solicitação inclui os cabeçalhos necessários para aceitar e enviar dados JSON. 
  A resposta da API é manipulada usando a cadeia de método then() baseada em Promisse. */

    .then(res => res.json())
    .then(result => {
      alert(result);
      this.atualizar();
    })
    .catch(error => {
      alert('Falha');
    });
  }
/* No primeiro then(), a resposta é convertida em JSON usando res.json(). O segundo then() manipula os dados JSON resultantes e 
  executa ações de acordo. Nesse caso, ele exibe um alerta com a mensagem de resultado e, em seguida, 
  chama o método atualizar para atualizar os dados do componente. Se ocorrer um erro durante a solicitação de busca 
  ou qualquer cadeia de Promisse , o bloco catch() exibirá um alerta com a mensagem 'Falha' */

  render() {
    const {
      departamentos,
      modal,
      idDepartamento,
      nomeDepartamento
    } = this.state;
  /* O método de renderização é um método necessário em um componente React que retorna a marcação JSX a ser renderizada na tela. 
  Dentro do método de renderização, o estado do componente é desestruturado para extrair as seguintes propriedades: 
  departamentos, modal, idDepartamento e nomeDepartamento. Usando a atribuição de desestruturação, 
  essas propriedades são atribuídas a variáveis locais com os mesmos nomes. 
  Isso permite um acesso mais fácil às propriedades de estado dentro do método de renderização, 
  simplificando o código e melhorando a legibilidade.*/
    return (
      <div>
        <button
          type="button"
          className="btn btn-primary m-2 float-end"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          onClick={this.addClick}
        >
          Adicionar
        </button>

        {/*A instrução return é usada para definir a marcação JSX que será renderizada pelo componente. 
        Nesse caso, a marcação JSX começa com um elemento. Dentro do, há um elemento que serve como um botão 
        "Adicionar" (Adicionar). O atributo type é definido como "button" para indicar que é um elemento button. 
        O atributo className especifica as classes CSS a serem aplicadas ao botão. 
        Neste caso, ele tem as classes "btn btn-primary m-2 float-end". Os atributos data-bs-toggle e data-bs-target 
        são usados para a funcionalidade modal do Bootstrap. Eles definem o modal de destino a ser alternado 
        quando o botão é clicado. O atributo onClick especifica a função do manipulador de eventos a ser executada 
        quando o botão é clicado. Nesse caso, ele chama o método addClick definido no componente. 
        Esse trecho de código representa a parte inicial da lógica de renderização do componente, 
        renderizando um botão com o rótulo "Adicionar"  que aciona o método addClick quando clicado. */}

        <table className="table table-striped">
          <thead>
            <tr>
              <th>id-Departamento</th>
              <th>nome-Departamento</th>
              <th>Opções</th>
            </tr>
          </thead>

          {/*O elemento representa uma tabela HTML. O atributo className especifica as classes CSS a serem aplicadas à tabela. 
          Neste caso, ele tem as classes "tabela listrada". Essas classes são usadas para fins de estilo fazem parte 
          de uma estrutura do Bootstrap. O elemento <thad> representa a seção de cabeçalho da tabela. Dentro do <thead> , 
          há um elemento que representa uma linha da tabela. Dentro do <tr>, há três elementos que representam as células 
          do cabeçalho da tabela. O conteúdo de texto dentro de cada elemento especifica os cabeçalhos de coluna: 
          "id-Departamento", "nome-Departamento" e "Opções". 
          Esses cabeçalhos definem os rótulos para cada coluna na tabela. */}

          <tbody>
            {departamentos.map(departamento => (
              <tr key={departamento.idDepartamento}>
                <td>{departamento.idDepartamento}</td>
                <td>{departamento.nomeDepartamento}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary m-2 float-end"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.editClick(departamento)}
                  >
                    Editar
                  </button>

  { /*O elemento representa a seção do corpo da tabela, contendo as linhas de dados reais da tabela. 
  Dentro do <tbody>, há uma expressão JavaScript {departamentos.map(...)} que mapeia sobre a matriz departamentos e gera 
  linhas de tabela dinamicamente com base nos dados. Para cada objeto departamento na matriz departamentos, 
  uma linha de tabela (<tr>) é criada com um atributo de chave exclusivo atribuído ao valor de departamento.idDepartamento. 
  Dentro de cada <tr>, há três células de dados da tabela (<td>): O primeiro <td>) contém o valor de departamento.idDepartamento,
  que representa a propriedade idDepartamento do objeto departamento atual. 
  O segundo contém o valor de departamento.nomeDepartamento, representando a propriedade nomeDepartamento do objeto 
  departamento atual. O terceiro contém um elemento button para editar a linha correspondente. 
  Quando clicado, ele dispara o método editClick com o objeto departamento atual como um argumento. */}

                  <button
                    type="button"
                    className="btn btn-primary m-2 float-end"
                    onClick={() => this.deleteClick(departamento.idDepartamento)}>
                    Remover
                  </button>
              {/*Dentro da linha da tabela (<tr>), há uma célula de dados da tabela (<td>) que contém o botão "Remover". 
              O botão é representado pelo elemento. O atributo type é definido como "button" para indicar que é um elemento button. 
              O atributo className especifica as classes CSS a serem aplicadas ao botão. 
              Neste caso, ele tem as classes "btn btn-primary m-2 float-end". 
              Essas classes fazem parte de uma estrutura CSS do Bootstrap e são usadas para fins de estilo. 
              O atributo onClick especifica a função do manipulador de eventos a ser executada quando o botão é clicado. 
              Nesse caso, ele dispara o método deleteClick com o valor departamento.idDepartamento como um argumento. 
              O departamento.idDepartamento representa a propriedade idDepartamento do objeto departamento atual. 
              Quando esse botão "Remover" é clicado, ele aciona o método deleteClick com o idDepartamento correspondente 
              como argumento, permitindo a exclusão da linha de dados associada da tabela. */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{modal}</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>

              {/*O componente modal representado por um elemento <div> com o atributo className definido como modal fade. 
        A classe fade faz parte de uma estrutura CSS do Bootstrap e fornece um efeito de animação fade-in para o modal.
        O atributo id é definido como "exampleModal", que é usado como identificador exclusivo para o componente modal. 
        Esse ID é referenciado em outras partes do código para controlar o comportamento do modal.
        O atributo tabIndex é definido como "-1", o que garante que o modal não seja acessível pela navegação do teclado.
        O atributo aria-hidden é definido como "true", indicando que o modal está oculto.
        Dentro do modal, há um elemento <div> com o atributo className definido como "modal-dialog modal-lg modal-dialog-centered". Isso define a parte da caixa de diálogo do modal e define seu tamanho como grande (modal-lg) e o centraliza horizontal e verticalmente (modal-dialog-centered).
        Dentro da caixa de diálogo modal, há um elemento <div> com o atributo className definido como "modal-content" */}
              
              <div className="modal-body">
                <div className="input-group mb-3">
                  <span className="input-group-text">Departamento</span>
                  {/*O elemento <div> com o atributo className definido como "modal-body" representa a seção do corpo do modal.
Dentro do corpo modal, há um elemento <div> com o atributo className definido como "input-group mb-3". 
Esse elemento é comumente usado no Bootstrap para agrupar um campo de entrada com um rótulo ou conteúdo adicional.
Dentro do grupo de entrada, há um elemento <span> com o atributo className definido como "input-group-text". 
Este elemento representa o rótulo ou texto associado ao campo de entrada. Neste caso, exibe o texto "Departamento".
Após o elemento <span>, há um elemento <input>. Isso representa o próprio campo de entrada. */}
                  <input
                    type="text"
                    className="form-control"
                    value={nomeDepartamento}
                    onChange={this.mudarNomeDepartamento}
                  />
                </div>
                {/*O atributo type é definido como "text", especificando que o campo de entrada deve aceitar entrada de texto.
                O atributo className é definido como "form-control", 
      que é uma classe Bootstrap usada para estilizar campos de entrada de formulário.
      O atributo value é definido como {nomeDepartamento}, que vincula o valor do campo de entrada à propriedade nomeDepartamento 
      no estado do componente. Isso permite vinculação de dados, onde alterações no campo de entrada 
      atualizam o estado do nomeDepartamento. O atributo onChange é definido como {this.mudarNomeDepartamento}, 
      que atribui o método mudarNomeDepartamento como manipulador de eventos para o evento onChange do campo de entrada. 
      Este método é responsável por atualizar o estado do nomeDepartamento quando o valor de entrada muda. */}
                {idDepartamento === 0 ? (
                  <button type="button" className="btn btn-primary float-start" onClick={() => this.criarClick()}>
                    Novo
                {/*O código usa um operador condicional (ternário) para renderizar condicionalmente diferentes botões com base 
                no valor de idDepartamento. Se idDepartamento for igual a 0, a condição {idDepartamento === 0} é avaliada 
                como verdadeira, e a primeira parte do operador ternário é executada. Ele renderiza um elemento <button> 
                com o atributo type definido como "button". O atributo className é definido como "btn btn-primary float-start", 
                que especifica as classes CSS para estilizar o botão. O atributo onClick é definido como uma função de seta () => 
                this.criarClick(), que atribui o método criarClick como o manipulador de eventos para o evento onClick do botão. 
                Clicar no botão aciona o método criarClick. O conteúdo do texto do botão é definido como "Novo". */}
                  </button>              
                ) : (
                  <button type="button" className="btn btn-primary float-start" onClick={() => this.atualizarClick()}>
                    Atualizar
                {/*Se idDepartamento não for igual a 0, a condição {idDepartamento === 0} é avaliada como falsa e a segunda parte 
                do operador ternário é executada. Ele renderiza um elemento <button> semelhante ao caso anterior, 
                mas com um atributo onClick diferente. O atributo onClick é definido como uma função de seta 
                () => this.atualizarClick(), que atribui o método atualizarClick como o manipulador de eventos para o evento 
                onClick do botão. Clicar no botão aciona o método atualizarClick. O conteúdo do texto do botão é definido 
                como "Atualizar". Este trecho de código renderiza condicionalmente o botão "Novo" ou o botão "Atualizar" 
                com base no valor de idDepartamento. Se idDepartamento for 0, o botão "Novo" é renderizado, e se não for 0, 
                o botão "Atualizar" é renderizado. */}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
