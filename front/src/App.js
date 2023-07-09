import React from 'react';
import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom';
/*importa vários componentes do pacote react-router-dom: BrowserRouter, Route, Routes e NavLink. 
Esses componentes fazem parte do React Router, que é usado para roteamento do lado do cliente em aplicativos React.*/
import { Home } from './Home';
import { Empregado } from './Empregado';
import { Departamento } from './Departamento';
import './App.css'


function App() {
  return (
    <BrowserRouter> 
      <div className="App container">
        <h3 className="d-flex justify-content-center m-3">
          CRUD Empresarial
        </h3>

        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="btn btn-success" to="/Home">
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="btn btn-warning" to="/empregado">
                Empregado
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="btn btn-info" to="/departamento">
                Departamento
              </NavLink>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/empregado" element={<Empregado />} />
          <Route path="/departamento" element={<Departamento />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
/*O componente BrowserRouter encapsula todo o aplicativo e fornece a funcionalidade de roteamento.
O código JSX dentro da instrução return representa o layout do aplicativo. 
Ele inclui um div de contêiner, um cabeçalho e uma barra de navegação. 
A barra de navegação contém uma lista não ordenada (ul) com três itens de lista (li). 
Cada item de lista contém um componente NavLink. O componente NavLink é usado para navegação e exibido como um botão. 
O prop "to" especifica a URL de destino quando o botão é clicado. 
O componente Rotas é usado para definir a configuração de roteamento para o aplicativo. 
Dentro do componente Rotas, há três componentes Rota. 
Cada componente Route define um caminho e um componente associado para renderizar quando o caminho é correspondido. 
O elemento prop de cada componente Route é usado para especificar o componente que deve ser renderizado, 
quando o caminho é correspondido. Os componentes Home, Empregado e Departamento são renderizados usando a sintaxe JSX. 
Finalmente, o componente Aplicativo é exportado como a exportação padrão, 
tornando-o disponível para outras partes do aplicativo usarem.*/
export default App;


