import React, { Component } from 'react';
import { variaveis } from './Variaveis.js';

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
que serão usadas para armazenar dados e controlar o comportamento do componente. Neste caso, as propriedades são: departamentos:  
Um array vazio para armazenar os dados do departamento. empregados: Uma matriz vazia para armazenar dados de funcionários.
modal: Uma string vazia para representar o estado atual do modal. 
nomeEmpregado: Uma string vazia para armazenar o nome de um funcionário.
idEmpregado: O valor inicial do ID do funcionário, definido como 0.
departamento: Uma string vazia para armazenar o departamento de um funcionário.
dataDeContratacao: Uma string vazia para armazenar a data de contratação de um funcionário.
foto: Uma string que representa a foto padrão de um funcionário.
fotoPath: Uma string que representa o caminho para a foto padrão de um funcionário.
Com esse código, o componente Empregado é inicializado com um estado inicial contendo matrizes e strings vazias 
para várias propriedades que serão usadas para gerenciar dados de funcionários e controlar a interface do usuário. */

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
  Isso atualiza o estado, acionando uma nova renderização do componente. Se ocorrer um erro durante a solicitação HTTP 
  ou o tratamento da resposta, o bloco catch será executado. Ele registra o erro no console usando console.error('Erro:', err). 
  Depois de buscar os dados do funcionário, o método executa um processo semelhante para buscar os dados do departamento 
  no servidor. Ele faz uma requisição HTTP GET para a URL variaveis.API_URL + 'departamento', 
  analisa os dados da resposta como JSON, e atualiza a propriedade departamentos no estado do componente. */

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
/*O método addClick é definido como uma função de seta e atribuído à propriedade addClick do componente.
Quando esse método é chamado, ele define o estado do componente invocando this.setState.
Dentro de setState, um objeto é fornecido com pares chave-valor que representam as propriedades de estado a serem atualizadas.
Nesse caso, as propriedades de estado que estão sendo atualizadas são:
modal: O valor 'Adicionar empregado' é definido para indicar que o modal deve exibir o modo "Adicionar empregado".
idEmpregado: O valor 0 é definido como o ID do funcionário, indicando que um novo funcionário está sendo adicionado.
nomeEmpregado: Uma string vazia é definida para o nome do funcionário.
departamento: Uma string vazia é definida para o departamento.
dataDeContratacao: Uma string vazia é definida para a data de contratação.
foto: O valor 'funcionario.png' é definido para a foto do funcionário.
Ao chamar this.setState, o estado do componente é atualizado com os valores fornecidos. */
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
/*O método editClick é definido como uma função de seta e atribuído à propriedade editClick do componente.
Leva um parâmetro empregado, que representa o objeto empregado a ser editado.
Quando esse método é chamado, ele define o estado do componente invocando this.setState.
Dentro de setState, um objeto é fornecido com pares chave-valor que representam as propriedades de estado a serem atualizadas.
Nesse caso, as propriedades de estado que estão sendo atualizadas são:
modal: O valor 'Editar Empregado' é definido para indicar que o modal deve exibir o modo "Editar funcionário".
idEmpregado: O valor de empregado.idEmpregado é definido como o ID do funcionário para identificar o funcionário 
que está sendo editado. nomeEmpregado: O valor de empregado.nomeEmpregado é definido como o nome do funcionário.
departamento: O valor de empregado.departamento é definido como o departamento.
dataDeContratacao: O valor de empregado.dataDeContratacao é definido como a data de contratação.
foto: O valor de empregado.foto é definido como a foto do funcionário. */
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
      /*O método editClick é definido como uma arrow function e atribuído à propriedade editClick do componente.
      Leva um parâmetro empregado, que representa o objeto empregado a ser editado.
      Quando esse método é chamado, ele define o estado do componente invocando this.setState. Dentro de setState, 
      um objeto é fornecido com pares chave-valor que representam as propriedades de estado a serem atualizadas.
      Nesse caso, as propriedades de estado que estão sendo atualizadas são:
      modal: O valor 'Editar Empregado' é definido para indicar que o modal deve exibir o modo "Editar funcionário".
      idEmpregado: O valor de empregado.idEmpregado é definido como o ID do funcionário para identificar 
      o funcionário que está sendo editado.
      nomeEmpregado: O valor de empregado.nomeEmpregado é definido como o nome do funcionário.
      departamento: O valor de empregado.departamento é definido como o departamento.
      dataDeContratacao: O valor de empregado.dataDeContratacao é definido como a data de contratação.
      foto: O valor de empregado.foto é definido como a foto do funcionário. */
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
/*Este bloco de código continua a partir do bloco de código anterior, onde a função de busca é chamada para enviar 
uma solicitação POST para criar um novo funcionário.
A cadeia de código .then(res => res.json()) é usada para analisar os dados de resposta como JSON.
O primeiro bloco .then recebe os dados de resposta JSON analisados ​​e executa uma função de retorno de chamada. 
Dentro da função callback:
alert(resultado) é chamado para exibir um alerta com o valor do resultado, que 
contém uma mensagem relacionada à criação do novo funcionário.
this.atualizar() é chamado para atualizar os dados do funcionário no estado do componente invocando o método atualizado. 
Isso acionará uma nova renderização do componente e refletirá o funcionário recém-criado na IU.
Se ocorrer um erro durante o processamento da solicitação ou resposta, o bloco .catch será executado.
 Apresenta uma mensagem de alerta 'Falha' para indicar que houve uma falha no processo de criação. */

  deleteClick = id => {
    fetch(variaveis.API_URL + 'empregado/' + id, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(result => {
        alert(result);
        this.atualizar();
      })
      .catch(error => {
        alert('Falha');
      });
  };
/*O método deleteClick é chamado, ele envia uma solicitação HTTP DELETE ao servidor para excluir o funcionário com o ID especificado.
Utiliza a função fetch para fazer a requisição, especificando a URL como variaveis.API_URL + 'empregado/' + id. 
Essa URL representa o endpoint para excluir um funcionário com o ID fornecido.
O segundo argumento a ser buscado é um objeto que contém parâmetros adicionais para a solicitação, 
incluindo o método, cabeçalhos e corpo (que não é usado neste caso, pois é uma solicitação DELETE).
O método é definido como 'DELETE' para indicar que esta é uma solicitação DELETE.
O objeto headers contém informações sobre os cabeçalhos da solicitação, 
incluindo o tipo de conteúdo aceito e o tipo de conteúdo do corpo da solicitação (que não é usado neste caso).
Depois de enviar a solicitação, a cadeia de código .then(res => res.json()) é usada para analisar os dados da resposta como JSON.
O próximo bloco .then recebe os dados de resposta JSON analisados ​​e executa uma função de retorno de chamada que alerta 
o resultado e chama this.atualizar() para atualizar os dados do funcionário no estado do componente 
e acionar uma nova renderização.
Caso ocorra algum erro durante o tratamento da requisição ou resposta, o bloco .catch é executado, 
exibindo uma mensagem de alerta 'Falha'. */
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
/*As variáveis ​​recebem os valores correspondentes do objeto de estado, permitindo um acesso mais fácil 
a esses valores dentro do método render. As variáveis ​​que estão sendo atribuídas são:
departamentos: Representa o array de departamentos no estado do componente. empregados: 
Representa o array de empregados no estado do componente. modal: Representa o modal atual que está sendo exibido, 
indicando se é para adicionar ou editar um funcionário.
idEmpregado: Representa o ID do funcionário atualmente selecionado. nomeEmpregado: Representa o nome do funcionário 
atualmente selecionado. departamento: Representa o departamento do funcionário atualmente selecionado.
dataDeContratacao: Representa a data de contratação do funcionário atualmente selecionado. fotoPath: Representa o caminho do arquivo da foto do funcionário.
foto: Representa o nome do arquivo da foto do funcionário. 
O método render é responsável por retornar o JSX (JavaScript XML) que define a estrutura e a aparência da UI do componente */
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
        {/*O código JSX começa com um elemento <div> como contêiner raiz, que envolve todo o conteúdo do componente.
Dentro do <div>, existe um elemento <button>. O atributo type do botão é definido como "button" para indicar que é um botão normal,
não um botão de envio. O atributo className é definido como "btn btn-primary m-2 float-end" para atribuir classes CSS ao botão, 
estilizando-o como um botão principal com alguma margem e flutuando para a direita.
O atributo data-bs-toggle é definido como "modal" para permitir que o botão alterne um componente modal quando clicado.
O atributo data-bs-target é definido como "#exampleModal" para especificar o componente modal de destino 
que deve ser alternado quando o botão é clicado. O atributo onClick é definido como this.addClick para atribuir 
um manipulador de eventos de clique ao botão. Quando clicado, o método addClick do componente será invocado. 
O conteúdo do texto do botão é definido como "Adicionar". Este trecho de código representa um botão que, quando clicado, 
aciona o método addClick  e alterna um componente modal especificado pelo destino "#exampleModal". */}
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
          {/*O código JSX começa com um elemento <table>, que representa uma tabela HTML.
O atributo className é definido como "table table-striped". Isso atribui classes CSS à tabela, 
estilizando-a como uma tabela Bootstrap com linhas distribuídas.
Dentro da tabela, existe um elemento <thead>, que representa a seção do cabeçalho da tabela.
Dentro do <thead>, existe um elemento <tr>, que representa uma linha da tabela.
Dentro do <tr>, existem vários elementos <th>, que representam as células do cabeçalho da tabela.
Cada elemento <th> contém o conteúdo de texto que representa o cabeçalho da coluna. Os cabeçalhos das colunas neste caso são:
"id-Empregado" para o ID do funcionário.
"nome-Empregado" para o nome do funcionário.
"Departamento" para o departamento do empregado.
"Data de Admissão" para a data de contratação do empregado.
"Opções" para as opções/ações relacionadas ao funcionário. */}
          <tbody>
            {empregados.map(empregado => (
              <tr key={empregado.idEmpregado}>
                <td>{empregado.idEmpregado}</td>
                <td>{empregado.nomeEmpregado}</td>
                <td>{empregado.departamento}</td>
                <td>{empregado.dataDeContratacao}</td>
                <td>
                  {/*O código JSX começa com um elemento <tbody>, que representa a seção do corpo da tabela.
Dentro do <tbody> existe uma expressão JavaScript ({empregados.map(...)}) que mapeia sobre o array empregados
 gera elementos JSX para cada empregado. A função empregados.map(...) itera sobre cada elemento no array empregados 
 e executa uma função de callback para cada elemento. A função callback gera elementos JSX para cada funcionário 
 usando a sintaxe da função de seta (empregado => ...). Dentro da função callback, um elemento <tr> é criado para cada funcionário, representando uma linha da tabela.
O atributo chave é definido como empregado.idEmpregado para fornecer um identificador exclusivo para cada linha da tabela. 
Isso é importante para renderização e atualização eficientes do componente.
Dentro do <tr>, vários elementos <td> são criados para cada atributo do funcionário.
Os atributos do funcionário são acessados ​​usando a notação de ponto 
(empregado.idEmpregado, empregado.nomeEmpregado, empregado.departamento, empregado.dataDeContratacao) 
e renderizados como o conteúdo dos respectivos elementos <td>.
O último elemento <td> é deixado em branco, indicando que deve haver conteúdo ou ações adicionais relacionadas a cada funcionário.
Este trecho de código gera dinamicamente linhas e células da tabela (<tr> e <td>) 
para cada funcionário no array empregados. Os atributos do funcionário são renderizados como o conteúdo das células. */}
                  <button
                    type="button"
                    className="btn btn-primary m-2 float-end"
                    onClick={() => this.deleteClick(empregado.idEmpregado)}
                  >
                    Remover
                  </button>
                </td>
                {/*O código JSX representa um elemento <button>.
O atributo type é definido como "botão" para indicar que é um botão normal, não um botão de envio. 
O atributo className é definido como "btn btn-primary m-2 float-end" para atribuir classes CSS ao botão, 
estilizando-o como um botão principal com alguma margem e flutuando para a direita.
O atributo onClick é definido como uma função de seta () => this.deleteClick(empregado.idEmpregado). 
Isso define o manipulador de eventos de clique para o botão. Ao clicar no botão, a função seta é invocada, 
e chama o método deleteClick do componente, passando empregado.idEmpregado como argumento. 
Isso permite que o método deleteClick saiba qual funcionário deve ser excluído. 
O conteúdo do texto do botão é definido como "Remover". Este trecho de código representa um botão "Remover" 
que aciona o método deleteClick quando clicado. 
Passa o idEmpregado do funcionário correspondente para o método deleteClick, 
permitindo a exclusão daquele funcionário específico. */}
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
              {/*"fade modal"e define o contêiner modal. o id de "exampleModal" para identificar exclusivamente o componente modal.
O atributo tabIndex é definido como "-1" para excluir o modal da ordem de tabulação. O atributo aria-hidden é definido como "true" 
para indicar que o modal está oculto. há <div> com className definido como "modal-dialog modal-lg modal-dialog-centered". 
Ele representa o diálogo modal e define seu tamanho e alinhamento. O valor className "modal-dialog" especifica o estilo geral 
do diálogo modal. A classe "modal-lg" indica que o modal deve ser renderizado em tamanho grande.
A classe "centralizada no diálogo modal" centraliza o diálogo modal horizontalmente.
Dentro da caixa de diálogo modal, há outro elemento <div> com className definido como "modal-content". 
Representa a área de conteúdo do modal. Dentro do conteúdo modal, há um elemento <div> com className 
definido como "cabeçalho modal".  Ele representa a seção de cabeçalho do modal. Dentro do cabeçalho modal, 
há um elemento <h5> com className definido como "modal-title".  Exibe o título do modal, que é determinado dinamicamente pela variável {modal}.
Também dentro do cabeçalho modal, há um elemento <button> com tipo definido como "button" 
e className definido como "btn-close". Representa um botão fechar para o modal.
O atributo data-bs-dismiss com o valor "modal" é utilizado para descartar/fechar o modal quando o botão é clicado.
O atributo aria-label é definido como "Fechar" para fornecer um rótulo acessível para o botão Fechar.
Este trecho de código representa uma estrutura de componente modal com um título determinado pela variável {modal}. 
Inclui um botão fechar e permite que o modal seja encerrado quando o botão fechar é clicado. */}
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
                {/*Dentro do corpo modal, há um elemento <div> com className definido como "d-flex flex-row bd-highlight mb-3". 
                Ele usa o Flexbox para organizar os elementos em uma linha.
Dentro do contêiner flexível, há outro elemento <div> com className definido como "p-2 w-50 bd-highlight". 
Ele define a largura e o preenchimento do contêiner do grupo de entrada.
Dentro do contêiner do grupo de entrada, há um elemento <div> com className definido como "input-group mb-3". 
Ele representa um grupo de entrada com um rótulo e um campo de entrada que o acompanham.
Dentro do grupo de entrada, há um elemento <span> com className definido como "input-group-text". 
Ele representa o rótulo do campo de entrada e exibe o texto "Nome".
Dentro do grupo de entrada, existe um elemento <input>. Representa o campo de entrada para edição do nome do funcionário.
O atributo type é definido como "text" para indicar que é um campo de entrada de texto.
O atributo className é definido como "form-control" para estilizar o campo de entrada como um controle de formulário Bootstrap.
O atributo de valor é definido como {nomeEmpregado} para exibir o valor atual do nome do funcionário no campo de entrada.
O atributo onChange é definido como {this.mudarNomeEmpregado} para atribuir um manipulador de eventos de alteração 
ao campo de entrada. Quando o usuário digitar no campo, o método mudarNomeEmpregado do componente será invocado 
para atualizar o nome do funcionário no estado do componente.
Este trecho de código representa um campo de entrada para editar o nome do funcionário na seção do corpo do componente modal */}


                    <div className="input-group mb-3">
                      <span className="input-group-text">Departamento</span>
                      <select
                        className="form-select"
                        onChange={this.mudarDepartamento}
                        value={departamento}
                      >{/*O elemento <div> mais externo tem className definido como "input-group mb-3". Ele representa o contêiner do grupo de entrada.
                      Dentro do contêiner do grupo de entrada, há um elemento <span> com className definido como "input-group-text". 
                      Representa a etiqueta para a seleção do departamento e exibe o texto "Departamento".
                      Após o <span>, existe um elemento <selecionar>. 
                      Representa o menu suspenso de seleção para escolher o departamento do funcionário.
                      Nota: Parece que pode haver um erro de digitação no código. 
                      O elemento correto deve ser <select> ao invés de <selecionar>.
                      O atributo className é definido como "form-select" para estilizar o menu suspenso como um componente 
                      de seleção de formulário Bootstrap.
                      O atributo onChange é definido como {this.mudarDepartamento} para atribuir um manipulador 
                      de eventos de alteração ao menu suspenso. Quando o usuário selecionar um departamento diferente, 
                      o método mudarDepartamento do componente será invocado para atualizar o departamento selecionado no estado do componente.
                      O atributo de valor é definido como {departamento} para exibir o departamento atualmente selecionado no menu suspenso.
                      Este trecho de código representa um grupo de entrada com um rótulo e um menu suspenso de seleção para escolher 
                      o departamento do funcionário. */}
                       ```
                        {departamentos.map(departamento => (
                          <option key={departamento.idDepartamento}>
                            {departamento.nomeDepartamento}
                          </option>
                        ))}
                      </select>
                    </div>
                    {/*.
O codigo usa a função map para iterar no array departamentos e gerar um elemento <option> para cada departamento.
A função de seta (departamento => ...) é usada como função de retorno de chamada para a função de mapa, 
fornecendo o objeto de departamento atual como argumento.
Dentro da função callback, um elemento <option> é criado para cada departamento.
O atributo chave é definido como departamento.idDepartamento para fornecer um identificador exclusivo para cada opção. 
Isso é importante para renderização e atualização eficientes do componente.
O conteúdo de cada opção é definido como departamento.nomeDepartamento, que representa o nome do departamento.
A tag de fechamento </option> é colocada após o nome do departamento.
Após a função de mapa, há uma tag de fechamento </select> para fechar o elemento suspenso.
Por fim, há uma tag de fechamento </div> para fechar o contêiner do grupo de entrada.
Este trecho de código gera dinamicamente vários elementos <option> dentro do elemento <select> com base na matriz departamentos. 
Cada opção representa um departamento e seu nome é exibido como o conteúdo da opção. */}
                    <div className="input-group mb-3">
                      <span className="input-group-text">Data de Admissão</span>
                      <input
                        type="date"
                        className="form-control"
                        value={dataDeContratacao}
                        onChange={this.mudarDatadeContratacao}
                      />
                    </div>
                    {/*O elemento <div> mais externo tem className definido como "input-group mb-3". 
                    Ele representa o contêiner do grupo de entrada.
Dentro do contêiner do grupo de entrada, há um elemento <span> com className definido como "input-group-text". 
Representa a etiqueta para o campo de entrada da data de admissão e exibe o texto "Dados de Admissão".
Após o <span>, há um elemento <input>. Representa o campo de entrada para edição da data de admissão do funcionário.
O atributo type é definido como "date" para indicar que é um campo de entrada de data.
O atributo className é definido como "form-control" para estilizar o campo de entrada como um controle de formulário Bootstrap.
O atributo value é definido como {dataDeContratacao} para exibir o valor atual da data de contratação do funcionário 
no campo de entrada.
O atributo onChange é definido como {this.mudarDatadeContratacao} para atribuir um manipulador de eventos 
de alteração ao campo de entrada. Quando o usuário selecionar uma data diferente, será invocado o método mudarDatadeContratacao 
do componente para atualizar a data de admissão do funcionário no estado do componente.
Este trecho de código representa um campo de entrada para editar a data de contratação do funcionário na seção do corpo 
do componente modal. */}

                  </div>

                  <div className="p-2 w-50 bd-highlight">
                    <img width="250px" height="250px" src={'./Fotos/funcionario.png'} alt="Empregado" />
                  </div>
                </div>
                {/*O código JSX representa um contêiner <div> para o elemento de imagem.
O elemento <div> tem className definido como "p-2 w-50 bd-highlight", que aplica algum estilo de preenchimento 
e largura ao contêiner.
Dentro do container existe um elemento <img>. Representa a imagem a ser exibida.
Os atributos de largura e altura são definidos como "250px" para definir as dimensões da imagem.
O atributo src é definido como './Fotos/funcionario.png', que especifica o caminho para o arquivo de imagem.
Observação: o caminho real da imagem pode depender da configuração do aplicativo e da localização do arquivo de imagem.
O atributo alt é definido como "Empregado", que fornece um texto alternativo para a imagem caso ela não possa ser exibida.
Este trecho de código representa um elemento de imagem dentro do corpo modal. Ele exibe uma imagem com uma largura de 250 pixels,
 uma altura de 250 pixels e um caminho de origem de './Fotos/funcionario.png'. 
 A imagem é agrupada em um contêiner com algum preenchimento e estilo de largura. */}
                
              </div>
              {idEmpregado === 0 ? (
                  <button
                    type="button"
                    className="btn btn-primary float-start"
                    onClick={this.criarClick}
                  >
                    Novo
                    {/*O código está entre chaves {} porque é uma expressão JavaScript incorporada ao JSX.
Ele usa um operador condicional (ternário) para determinar qual código JSX renderizar com base na condição idEmpregado === 0.
Se a condição for verdadeira (ou seja, idEmpregado igual a 0), o código dentro do primeiro conjunto de parênteses é renderizado.
Dentro dos parênteses, há um elemento <button>.
O atributo type é definido como "botão" para indicar que é um botão normal, não um botão de envio.
O atributo className é definido como "btn btn-primary float-start" para atribuir classes CSS ao botão, 
estilizando-o como um botão principal com uma posição flutuante à esquerda.
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
                    {/*seu código representa um elemento de botão regular.
O atributo type é definido como "botão" para indicar que é um botão normal, não um botão de envio.
O atributo className é definido como "btn btn-primary float-start" para atribuir classes CSS ao botão, 
estilizando-o como um botão principal com uma posição flutuante à esquerda.
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


