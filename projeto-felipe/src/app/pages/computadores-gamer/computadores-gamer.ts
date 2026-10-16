import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Cards, Produto } from '../../componentes/cards/cards';
import { CarrinhoService } from '../../services/carrinhoservice/carrinhoservice';

@Component({
  selector: 'app-computadores-gamer',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, Cards],
  templateUrl: './computadores-gamer.html',
  styleUrls: ['./computadores-gamer.css']
})
export class ComputadoresGamer {
  private readonly carrinho = inject(CarrinhoService);
  titulo = 'Computadores gamer';
  tituloHtml = 'Seu próximo PC. <span>Seu próximo nível.</span>';
  chamada = 'PRONTO PARA ENTRAR NO JOGO?';
  descricao = 'Computadores gamer pensados para diferentes perfis: do primeiro setup às configurações para quem busca mais desempenho.';
  subtitulo = 'PCs gamer';
  categorias: string[] = ['Todos', 'Entrada', 'Intermediário', 'Alta performance'];
  categoriaAtiva = this.categorias[0];
  busca = '';
  ordenacao = 'relevancia';
  mensagem = '';

  produtos: Produto[] = [
      { id: 21, nome: 'Arena Starter', categoria: 'Entrada', descricao: 'Uma base versátil para jogar e evoluir o setup.', preco: 3299, precoAnterior: 3599, imagem: 'assets/images/pc-entrada-1.png', selo: 'Entrada', especificacoes: ['Ryzen 5', '16 GB RAM', 'SSD 1 TB'], avaliacao: 4.7, estoque: true },
      { id: 22, nome: 'Arena Pulse', categoria: 'Intermediário', descricao: 'Equilíbrio para jogos competitivos e uso diário.', preco: 4699, precoAnterior: 4999, imagem: 'assets/images/pc-intermediario-1.png', selo: 'Mais vendido', especificacoes: ['Ryzen 5', 'RTX 4060', '16 GB RAM'], avaliacao: 4.8, estoque: true },
      { id: 23, nome: 'Arena Phantom', categoria: 'Alta performance', descricao: 'Mais potência gráfica para elevar a qualidade visual.', preco: 6899, precoAnterior: 7299, imagem: 'assets/images/pc-highend-1.png', selo: 'Performance', especificacoes: ['Ryzen 7', 'RTX série 40', '32 GB RAM'], avaliacao: 4.9, estoque: true },
      { id: 24, nome: 'Arena Creator', categoria: 'Alta performance', descricao: 'Setup robusto para jogar, criar e transmitir.', preco: 7999, precoAnterior: 8499, imagem: 'assets/images/pc-highend-2.png', selo: '', especificacoes: ['CPU multicore', '32 GB RAM', 'SSD 2 TB'], avaliacao: 4.7, estoque: true }
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
