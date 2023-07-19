import React, { Component } from 'react';
import banner from './banner.jpg'

export class Home extends Component {
  render() {
    return (
      <div className="w-100 p-5 bg-info text-center">
        <h3 className='p-2 bg-primary text-white'>Tela Inicial</h3>
        <img src={banner} className="img-fluid" alt="imagem"></img>
        
      </div>
    );
  }
}
