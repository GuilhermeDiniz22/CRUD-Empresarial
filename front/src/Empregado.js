import React, { Component } from 'react';
import { variaveis } from './Variaveis.js';
import empregado from './empregado.jpg'

export class Empregado extends Component {
  constructor(props) {
    super(props);
    this.state = {
      departamentos: [],
      empregados: [],
      modal: '',
      nomeEmpregado: '',
      idEmpregado: 0,
      departamento: '',
      dataDeContratacao: '',
      foto: 'funcionario.png',
      fotoPath: 'localhost:49146/Fotos/funcionario.png'
    };
  }

/*O método construtor é um método especial em um componente de classe que é chamado quando uma instância da classe é criada.
Ele define o estado inicial do componente atribuindo um objeto a this.state. O objeto de estado contém várias propriedades 
<<<<<<< Updated upstream
que serão usadas para armazenar dados e controlar o comportamento do componente. Neste caso, as propriedades são: departamentos:  
Um array vazio para armazenar os dados do departamento. empregados: Uma matriz vazia para armazenar dados de funcionários.
modal: */
=======
que serão usadas para armazenar dados e controlar o comportamento do componente.
*/
>>>>>>> Stashed changes

  atualizar = () => {
    fetch(variaveis.API_URL + 'empregado')
      .then(res => res.json())
      .then(data => {
        this.setState({ empregados: data });
      })
      .catch(error => {
        console.error('Error:', error);
      });

    fetch(variaveis.API_URL + 'departamento')
      .then(res => res.json())
      .then(data => {
        this.setState({ departamentos: data });
      })
      .catch(err => {
        console.error('Erro:', err);
      });
  };

  /*O método inicia chamando fetch para fazer uma requisição HTTP GET para a URL especificada variaveis.API_URL + 'empregado'. 
  Essa URL representa o endpoint para recuperar dados de funcionários do servidor. A resposta é processada usando o método then, 
  que usa uma função de callback de chamada que manipula os dados da resposta. Dentro do primeiro bloco, res.json() é chamado. 
  O próximo bloco "then" recebe os dados JSON analisados ​​e atualiza a propriedade empregados no estado do componente usando 
  this.setState({ empregados: data }). 
  Isso atualiza o estado */

  componentDidMount() {
    this.atualizar();
  }
/*O método componentDidMount é um método de ciclo de vida fornecido pelo React. 
Ele é chamado automaticamente depois que o componente é inserido no DOM. Nesse código, ele chama o método atualizar 
para buscar dados do servidor e atualizar o estado do componente. Isso garante que o componente busque os dados necessários 
quando for renderizado pela primeira vez. */
  mudarNomeEmpregado = e => {
    this.setState({ nomeEmpregado: e.target.value });
  };
/*Este código define uma função de seta chamada mudarNomeEmpregado que recebe um objeto de evento (e) como parâmetro.
A função é responsável por atualizar a propriedade nomeEmpregado no estado do componente.
Ele usa e.target.value para acessar o valor inserido no campo de entrada onde o evento é acionado.
O valor do campo de entrada é definido como o novo valor para nomeEmpregado usando this.setState. */
  mudarDepartamento = e => {
    this.setState({ departamento: e.target.value });
  };
/*O método componentDidMount é um método de ciclo de vida fornecido pelo React. 
Ele é chamado automaticamente depois que o componente é inserido no DOM. Nesse código, ele chama o método atualizar 
para buscar dados do servidor e atualizar o estado do componente. Isso garante que o componente busque os dados necessários 
quando for renderizado pela primeira vez. */
  mudarDatadeContratacao = e => {
    this.setState({ dataDeContratacao: e.target.value });
  };
/*A função é atribuída à propriedade mudarDatadeContratacao do componente.
 Quando um evento é acionado, como um evento de alteração em um campo de entrada, essa função é chamada.
 A função recebe como parâmetro o objeto evento, que contém informações sobre o evento.
 e.target.value é usado para acessar o valor inserido ou selecionado no campo de entrada onde ocorreu o evento.
 O valor do campo de entrada é então usado para atualizar a propriedade dataDeContratacao no estado do componente usando 
 this.setState. Ao chamar this.setState, o React mistura o valor da propriedade atualizada no estado do componente, 
 acionando uma nova renderização do componente com o valor atualizado. */
  addClick = () => {
    this.setState({
      modal: 'Adicionar empregado',
      idEmpregado: 0,
      nomeEmpregado: '',
      departamento: '',
      dataDeContratacao: '',
      foto: 'funcionario.png',
    });
  };
<<<<<<< Updated upstream
/*O método addClick é definido como uma função de seta e atribuído à propriedade addClick do componente.
Quando esse método é chamado, ele define o estado do componente invocando this.setState.
Dentro de setState, um objeto é fornecido com pares chave-valor que representam as propriedades de estado a serem atualizadas.*/
=======

>>>>>>> Stashed changes
  editClick = empregado => {
    this.setState({
      modal: 'Editar Empregado',
      idEmpregado: empregado.idEmpregado,
      nomeEmpregado: empregado.nomeEmpregado,
      departamento: empregado.departamento,
      dataDeContratacao: empregado.dataDeContratacao,
      foto: empregado.foto
    });
  };
<<<<<<< Updated upstream
/*O método editClick é definido como uma função de seta e atribuído à propriedade editClick do componente.
Leva um parâmetro empregado, que representa o objeto empregado a ser editado.
Quando esse método é chamado, ele define o estado do componente invocando this.setState.
Dentro de setState, um objeto é fornecido com pares chave-valor que representam as propriedades de estado a serem atualizadas.
*/
=======

>>>>>>> Stashed changes
  criarClick = () => {
    fetch(variaveis.API_URL + 'empregado', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nomeEmpregado: this.state.nomeEmpregado,
        departamento: this.state.departamento,
        dataDeContratacao: this.state.dataDeContratacao,
        foto: this.state.foto
      })
<<<<<<< Updated upstream
      /*O método editClick é definido como uma arrow function e atribuído à propriedade editClick do componente.
      Leva um parâmetro empregado, que representa o objeto empregado a ser editado.
      Quando esse método é chamado, ele define o estado do componente invocando this.setState. Dentro de setState, 
      um objeto é fornecido com pares chave-valor que representam as propriedades de estado a serem atualizadas.*/
=======
    
>>>>>>> Stashed changes
    })
      .then(res => res.json())
      .then(resultado => {
        alert(resultado);
        this.atualizar();
      })
      .catch(error => {
        alert('Falha');
      });
  };
<<<<<<< Updated upstream
/*Este bloco de código continua a partir do bloco de código anterior, onde a função de busca é chamada para enviar 
uma solicitação POST para criar um novo funcionário.
A cadeia de código .then(res => res.json()) é usada para analisar os dados de resposta como JSON.
O primeiro bloco .then recebe os dados de resposta JSON analisados ​​e executa uma função de retorno de chamada. 
Dentro da função callback:
alert(resultado) é chamado para exibir um alerta com o valor do resultado, que 
contém uma mensagem relacionada à criação do novo funcionário.
this.atualizar() é chamado para atualizar os dados do funcionário no estado do componente invocando o método atualizado. 
 */
=======

>>>>>>> Stashed changes

  deleteClick = id => {
    fetch(variaveis.API_URL + 'empregado/' + id, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(resultado => {
        alert(resultado);
        this.atualizar();
      })
      .catch(error => {
        alert('Falha');
      });
  };
<<<<<<< Updated upstream
/*O método deleteClick é chamado, ele envia uma solicitação HTTP DELETE ao servidor para excluir o funcionário com o ID especificado.
Utiliza a função fetch para fazer a requisição, especificando a URL como variaveis.API_URL + 'empregado/' + id. 
Essa URL representa o endpoint para excluir um funcionário com o ID fornecido.
O segundo argumento a ser buscado é um objeto que contém parâmetros adicionais para a solicitação, 
incluindo o método, cabeçalhos e corpo (que não é usado neste caso, pois é uma solicitação DELETE).
O método é definido como 'DELETE' para indicar que esta é uma solicitação DELETE. */
=======

>>>>>>> Stashed changes
  render() {
    const {
      departamentos,
      empregados,
      modal,
      idEmpregado,
      nomeEmpregado,
      departamento,
      dataDeContratacao,
      fotoPath,
      foto
    } = this.state;
<<<<<<< Updated upstream
/*As variáveis ​​recebem os valores correspondentes do objeto de estado, permitindo um acesso mais fácil 
a esses valores dentro do método render.*/
=======

>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
    
=======

>>>>>>> Stashed changes
        <table className="table table-striped">
          <thead>
            <tr>
              <th>id-Empregado</th>
              <th>nome-Empregado</th>
              <th>Departamento</th>
              <th>Data de Admissão</th>
              <th>Opções</th>
            </tr>
          </thead>
<<<<<<< Updated upstream

=======
  
>>>>>>> Stashed changes
          <tbody>
            {empregados.map(empregado => (
              <tr key={empregado.idEmpregado}>
                <td>{empregado.idEmpregado}</td>
                <td>{empregado.nomeEmpregado}</td>
                <td>{empregado.departamento}</td>
                <td>{empregado.dataDeContratacao}</td>
                <td>
<<<<<<< Updated upstream
                  {/*O código JSX começa com um elemento <tbody>, que representa a seção do corpo da tabela.
Dentro do <tbody> existe uma expressão JavaScript ({empregados.map(...)}) que mapeia sobre o array empregados
 gera elementos JSX para cada empregado. A função empregados.map(...) itera sobre cada elemento no array empregados 
 e executa uma função de callback para cada elemento. A função callback gera elementos JSX para cada funcionário 
 usando a sintaxe da função de seta (empregado => ...). Dentro da função callback, um elemento <tr> é criado para cada funcionário, representando uma linha da tabela.
O atributo chave é definido como empregado.idEmpregado para fornecer um identificador exclusivo para cada linha da tabela. */}
=======
              
>>>>>>> Stashed changes
                  <button
                    type="button"
                    className="btn btn-primary m-2 float-end"
                    onClick={() => this.deleteClick(empregado.idEmpregado)}
                  >
                    Remover
                  </button>
                </td>
<<<<<<< Updated upstream
                {/*O código JSX representa um elemento <button>.
O atributo type é definido como "botão" para indicar que é um botão normal, não um botão de envio. 
O atributo className é definido como "btn btn-primary m-2 float-end" para atribuir classes CSS ao botão, 
estilizando-o como um botão principal com alguma margem e flutuando para a direita.
O atributo onClick é definido como uma função de seta () => this.deleteClick(empregado.idEmpregado). 
Isso define o manipulador de eventos de clique para o botão. Ao clicar no botão, a função seta é invocada, 
e chama o método deleteClick do componente, passando empregado.idEmpregado como argumento. */}
=======
        
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
              {/* O valor className "modal-dialog" especifica o estilo geral 
do diálogo modal. A classe "modal-lg" indica que o modal deve ser renderizado em tamanho grande.
A classe "centralizada no diálogo modal" centraliza o diálogo modal horizontalmente.
Dentro da caixa de diálogo modal, há outro elemento <div> com className definido como "modal-content". 
Representa a área de conteúdo do modal. Dentro do conteúdo modal, há um elemento <div> com className 
definido como "cabeçalho modal".*/}
=======
      
>>>>>>> Stashed changes
              <div className="modal-body">
                <div className="d-flex flex-row bd-highlight mb-3">
                  <div className="p-2 w-50 bd-highlight">
                  <div className="input-group mb-3">
                  <span className="input-group-text">Nome</span>
                  <input
                    type="text"
                    className="form-control"
                    value={nomeEmpregado}
                    onChange={this.mudarNomeEmpregado}
                  />
                </div>
<<<<<<< Updated upstream
                {/*.
Dentro do grupo de entrada, existe um elemento <input>. Representa o campo de entrada para edição do nome do funcionário.
O atributo type é definido como "text" para indicar que é um campo de entrada de texto.
O atributo className é definido como "form-control" para estilizar o campo de entrada como um controle de formulário Bootstrap.
O atributo de valor é definido como {nomeEmpregado} para exibir o valor atual do nome do funcionário no campo de entrada.
O atributo onChange é definido como {this.mudarNomeEmpregado} para atribuir um manipulador de eventos de alteração 
ao campo de entrada. Quando o usuário digitar no campo, o método mudarNomeEmpregado do componente será invocado 
para atualizar o nome do funcionário no estado do componente. */}


=======
>>>>>>> Stashed changes
                    <div className="input-group mb-3">
                      <span className="input-group-text">Departamento</span>
                      <select
                        className="form-select"
                        onChange={this.mudarDepartamento}
                        value={departamento}
<<<<<<< Updated upstream
                      >{/*
                      O atributo onChange é definido como {this.mudarDepartamento} para atribuir um manipulador 
                      de eventos de alteração ao menu suspenso. Quando o usuário selecionar um departamento diferente, 
                      o método mudarDepartamento do componente será invocado para atualizar o departamento selecionado no estado do componente.
                      O atributo de valor é definido como {departamento} para exibir o departamento atualmente selecionado no menu suspenso.
                      Este trecho de código representa um grupo de entrada com um rótulo e um menu suspenso de seleção para escolher 
                      o departamento do funcionário. */}
                       ```
=======
                      >
>>>>>>> Stashed changes
                        {departamentos.map(departamento => (
                          <option key={departamento.idDepartamento}>
                            {departamento.nomeDepartamento}
                          </option>
                        ))}
                      </select>
                    </div>
<<<<<<< Updated upstream
                    {/*.
O codigo usa a função map para iterar no array departamentos e gerar um elemento <option> para cada departamento.
A função de seta (departamento => ...) é usada como função de retorno de chamada para a função de mapa, 
fornecendo o objeto de departamento atual como argumento.
Dentro da função callback, um elemento <option> é criado para cada departamento.
O atributo chave é definido como departamento.idDepartamento para fornecer um identificador exclusivo para cada opção. 
Isso é importante para renderização e atualização eficientes do componente.
O conteúdo de cada opção é definido como departamento.nomeDepartamento, que representa o nome do departamento.
A tag de fechamento </option> é colocada após o nome do departamento. */}
=======
>>>>>>> Stashed changes
                    <div className="input-group mb-3">
                      <span className="input-group-text">Data de Admissão</span>
                      <input
                        type="date"
                        className="form-control"
                        value={dataDeContratacao}
                        onChange={this.mudarDatadeContratacao}
                      />
                    </div>
<<<<<<< Updated upstream
                    {/*
O atributo value é definido como {dataDeContratacao} para exibir o valor atual da data de contratação do funcionário 
no campo de entrada.
O atributo onChange é definido como {this.mudarDatadeContratacao} para atribuir um manipulador de eventos 
de alteração ao campo de entrada. Quando o usuário selecionar uma data diferente, será invocado o método mudarDatadeContratacao 
do componente para atualizar a data de admissão do funcionário no estado do componente.
Este trecho de código representa um campo de entrada para editar a data de contratação do funcionário na seção do corpo 
do componente modal. */}
=======
>>>>>>> Stashed changes

                  </div>

                  <div className="p-2 w-50 bd-highlight">
                    <img width="250px" height="250px" src={empregado} alt="Empregado" />
                  </div>
                </div>
              
            
              </div>
              {idEmpregado === 0 ? (
                  <button
                    type="button"
                    className="btn btn-primary float-start"
                    onClick={this.criarClick}
                  >
                    Novo
                    {/*
O atributo onClick é definido como {this.criarClick} para atribuir um manipulador de eventos de clique ao botão. 
Quando o botão for clicado, o método criarClick do componente será invocado.
O conteúdo de texto do botão é definido como "Novo". Se a condição for falsa (ou seja, idEmpregado diferente de 0), 
o código dentro do segundo conjunto de parênteses é renderizado. */}
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-primary float-start"
                    onClick={this.atualizarClick}
                  >
                    Atualizar
                    {/*
O atributo onClick é definido como {this.atualizarClick} para atribuir um manipulador de eventos de clique ao botão. 
Ao clicar no botão, o método atualizarClick do componente será invocado.
O conteúdo de texto do botão é definido como "Atualizar". 
Este trecho de código representa um botão com o texto "Atualizar" que aciona o método atualizarClick quando clicado. */}
                  </button>
                )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}


