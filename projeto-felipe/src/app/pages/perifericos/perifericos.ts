import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CardsComponent, Produto } from '../../componentes/cards/cards';
import { Header } from '../../componentes/header/header';
import { Menu } from '../../componentes/menu/menu';
import { Footer } from '../../componentes/footer/footer';

@Component({
  selector: 'app-perifericos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, CardsComponent, Header, Menu, Footer],
  templateUrl: './perifericos.html',
  styleUrls: ['./perifericos.css']
})
export class Perifericos {
  titulo = 'Periféricos';
  tituloHtml = 'Cada comando importa. <span>Jogue no seu ritmo.</span>';
  chamada = 'SINTA A DIFERENÇA EM CADA CLIQUE';
  descricao = 'Teclados, mouses, headsets e acessórios que completam o setup com conforto, precisão e personalidade.';
  subtitulo = 'Periféricos em destaque';
  categorias: string[] = ['Todos', 'Teclados', 'Mouses', 'Headsets', 'Acessórios'];
  categoriaAtiva = this.categorias[0];
  busca = '';
  ordenacao = 'relevancia';
  mensagem = '';

  produtos: Produto[] = [
      { id: 41, nome: 'Teclado mecânico RGB', categoria: 'Teclados', descricao: 'Resposta tátil e iluminação para o seu setup.', preco: 249, precoAnterior: 299, imagem: 'https://placehold.co/600x420/21152d/cb9aff?text=Teclado+RGB', selo: 'Mais vendido', especificacoes: ['Mecânico', 'RGB'], avaliacao: 4.6, estoque: true },
      { id: 42, nome: 'Mouse gamer Spectrum', categoria: 'Mouses', descricao: 'Sensor preciso e formato confortável.', preco: 159, precoAnterior: 189, imagem: 'https://placehold.co/600x420/21152d/cb9aff?text=Mouse+Spectrum', selo: 'Oferta', especificacoes: ['12.000 DPI', '6 botões'], avaliacao: 4.5, estoque: true },
      { id: 43, nome: 'Headset Surround X', categoria: 'Headsets', descricao: 'Ouça os detalhes e comunique-se com clareza.', preco: 299, precoAnterior: 349, imagem: 'https://placehold.co/600x420/21152d/cb9aff?text=Headset+Surround', selo: '', especificacoes: ['Som surround', 'Microfone'], avaliacao: 4.4, estoque: true },
      { id: 44, nome: 'Mousepad Control XL', categoria: 'Acessórios', descricao: 'Superfície ampla para movimentos consistentes.', preco: 89, precoAnterior: 109, imagem: 'https://placehold.co/600x420/21152d/cb9aff?text=Mousepad+XL', selo: '', especificacoes: ['Tamanho XL', 'Base antiderrapante'], avaliacao: 4.7, estoque: true },
      { id: 45, nome: 'Controle sem fio Nova', categoria: 'Acessórios', descricao: 'Conforto e liberdade para jogar no PC.', preco: 279, precoAnterior: 319, imagem: 'https://placehold.co/600x420/21152d/cb9aff?text=Controle+Nova', selo: '', especificacoes: ['Sem fio', 'USB-C'], avaliacao: 4.5, estoque: true },
      { id: 46, nome: 'Microfone Stream Mini', categoria: 'Acessórios', descricao: 'Voz clara para chamadas, partidas e streams.', preco: 219, precoAnterior: 249, imagem: 'https://placehold.co/600x420/21152d/cb9aff?text=Microfone+Mini', selo: '', especificacoes: ['USB', 'Plug and play'], avaliacao: 4.6, estoque: true }
  ];

  get produtosFiltrados(): Produto[] {
    const termo = this.busca.trim().toLocaleLowerCase('pt-BR');
    let resultado = this.produtos.filter(p => {
      const combinaBusca = !termo || [p.nome, p.categoria, p.descricao, ...(p.especificacoes || [])]
        .some(valor => valor.toLocaleLowerCase('pt-BR').includes(termo));
      const combinaCategoria = this.categoriaAtiva === this.categorias[0] ||
        p.categoria.toLocaleLowerCase('pt-BR') === this.categoriaAtiva.toLocaleLowerCase('pt-BR');
      return combinaBusca && combinaCategoria;
    });

    resultado = [...resultado];
    if (this.ordenacao === 'menor-preco') resultado.sort((a, b) => a.preco - b.preco);
    if (this.ordenacao === 'maior-preco') resultado.sort((a, b) => b.preco - a.preco);
    if (this.ordenacao === 'nome') resultado.sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
    return resultado;
  }

  adicionarAoCarrinho(produto: Produto): void {
    this.mensagem = `${produto.nome} foi adicionado ao carrinho (demonstração).`;
    window.setTimeout(() => this.mensagem = '', 3000);
  }
}
