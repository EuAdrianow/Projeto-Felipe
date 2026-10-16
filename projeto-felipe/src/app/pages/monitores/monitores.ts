import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Cards, Produto } from '../../componentes/cards/cards';
import { CarrinhoService } from '../../services/carrinhoservice/carrinhoservice';

@Component({
  selector: 'app-monitores',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, Cards],
  templateUrl: './monitores.html',
  styleUrls: ['./monitores.css']
})
export class Monitores {
  private readonly carrinho = inject(CarrinhoService);
  titulo = 'Monitores';
  tituloHtml = 'Veja cada detalhe. <span>Domine a partida.</span>';
  chamada = 'UMA IMAGEM À ALTURA DO SEU JOGO';
  descricao = 'Monitores para jogos competitivos, experiências imersivas e setups de produtividade. Escolha resolução, tamanho e taxa de atualização.';
  subtitulo = 'Monitores em destaque';
  categorias: string[] = ['Todos', 'Full HD', 'QHD', 'Ultrawide'];
  categoriaAtiva = this.categorias[0];
  busca = '';
  ordenacao = 'relevancia';
  mensagem = '';

  produtos: Produto[] = [
      { id: 31, nome: 'Monitor AOC Gaming 27" 300hz', categoria: 'Full HD', descricao: 'Alta taxa de atualização para jogos competitivos.', preco: 899, precoAnterior: 999, imagem: 'assets/images/monitor-aoc-27-300.png', selo: 'Oferta', especificacoes: ['24 polegadas', '180 Hz'], avaliacao: 4.8, estoque: true },
      { id: 32, nome: 'Monitor OLED LG UltraGear 27" 240hz', categoria: 'QHD', descricao: 'Mais espaço e definição para jogar e trabalhar.', preco: 1599, precoAnterior: 1799, imagem: 'assets/images/monitor-lgultragear-27-240.png', selo: '', especificacoes: ['27 polegadas', '165 Hz'], avaliacao: 4.7, estoque: true },
      { id: 33, nome: 'Monitor Spectra 32" Curvo', categoria: 'QHD', descricao: 'Tela curva para uma experiência mais envolvente.', preco: 2199, precoAnterior: 2399, imagem: 'assets/images/monitor-32-curvo.png', selo: 'Imersão', especificacoes: ['32 polegadas', 'Curvo'], avaliacao: 4.6, estoque: true },
      { id: 34, nome: 'Monitor WideFlow 34"', categoria: 'Ultrawide', descricao: 'Campo de visão amplo para jogos e multitarefa.', preco: 2899, precoAnterior: 3199, imagem: 'assets/images/monitor-ultrawide.png', selo: '', especificacoes: ['Ultrawide', 'Alta resolução'], avaliacao: 4.8, estoque: true }
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
  this.carrinho.adicionar(produto);
  this.mensagem = `${produto.nome} foi adicionado ao carrinho.`;
  window.setTimeout(() => (this.mensagem = ''), 3000);
}
}
