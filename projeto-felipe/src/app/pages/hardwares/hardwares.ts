import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CardsComponent, Produto } from '../../componentes/cards/cards';

@Component({
  selector: 'app-hardwares',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, CardsComponent],
  templateUrl: './hardwares.html',
  styleUrls: ['./hardwares.css']
})
export class Hardwares {
  titulo = 'Hardwares';
  tituloHtml = 'O poder por trás do <span>seu desempenho.</span>';
  chamada = 'MONTE UMA MÁQUINA À SUA ALTURA';
  descricao = 'Encontre componentes para montar, atualizar ou otimizar seu PC. Compare opções e escolha o hardware que combina com seu estilo de jogo.';
  subtitulo = 'Componentes em destaque';
  categorias: string[] = ['Todas', 'Placas de vídeo', 'Processadores', 'Armazenamento', 'Memória RAM'];
  categoriaAtiva = this.categorias[0];
  busca = '';
  ordenacao = 'relevancia';
  mensagem = '';

  produtos: Produto[] = [
      { id: 11, nome: 'GeForce RTX 4060 8 GB', categoria: 'Placas de vídeo', descricao: 'Gráficos detalhados com tecnologias modernas.', preco: 2199, precoAnterior: 2499, imagem: 'https://placehold.co/600x420/21152d/cb9aff?text=RTX+4060', selo: 'Oferta', especificacoes: ['8 GB GDDR6', 'PCIe 4.0'], avaliacao: 4.8, estoque: true },
      { id: 12, nome: 'Radeon RX 7600 8 GB', categoria: 'Placas de vídeo', descricao: 'Performance para jogos em Full HD.', preco: 1899, precoAnterior: 2099, imagem: 'https://placehold.co/600x420/21152d/cb9aff?text=Radeon+RX+7600', selo: '', especificacoes: ['8 GB GDDR6', 'PCIe 4.0'], avaliacao: 4.6, estoque: true },
      { id: 13, nome: 'Ryzen 5 5600', categoria: 'Processadores', descricao: 'Ótimo equilíbrio entre preço e desempenho.', preco: 799, precoAnterior: 899, imagem: 'https://placehold.co/600x420/21152d/cb9aff?text=Ryzen+5+5600', selo: 'Mais vendido', especificacoes: ['6 núcleos', 'AM4'], avaliacao: 4.9, estoque: true },
      { id: 14, nome: 'Intel Core i5 série gamer', categoria: 'Processadores', descricao: 'Velocidade para jogos e produtividade.', preco: 1199, precoAnterior: 1299, imagem: 'https://placehold.co/600x420/21152d/cb9aff?text=Intel+Core+i5', selo: '', especificacoes: ['Multitarefas', 'Alto desempenho'], avaliacao: 4.6, estoque: true },
      { id: 15, nome: 'SSD NVMe 1 TB', categoria: 'Armazenamento', descricao: 'Carregue jogos e aplicativos em menos tempo.', preco: 429, precoAnterior: 499, imagem: 'https://placehold.co/600x420/21152d/cb9aff?text=SSD+NVMe', selo: '', especificacoes: ['M.2 NVMe', '1 TB'], avaliacao: 4.7, estoque: true },
      { id: 16, nome: 'Memória DDR4 16 GB', categoria: 'Memória RAM', descricao: 'Mais fluidez para jogos e multitarefa.', preco: 239, precoAnterior: 279, imagem: 'https://placehold.co/600x420/21152d/cb9aff?text=DDR4+16GB', selo: '', especificacoes: ['16 GB', 'DDR4'], avaliacao: 4.5, estoque: true }
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
