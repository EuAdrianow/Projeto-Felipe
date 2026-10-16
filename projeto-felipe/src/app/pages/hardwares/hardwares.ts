import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Cards, Produto } from '../../componentes/cards/cards';
import { CarrinhoService } from '../../services/carrinhoservice/carrinhoservice';

@Component({
  selector: 'app-hardwares',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, Cards],
  templateUrl: './hardwares.html',
  styleUrls: ['./hardwares.css']
})
export class Hardwares {
  private readonly carrinho = inject(CarrinhoService);
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
      { id: 11, nome: 'GeForce RTX 4060 8 GB', categoria: 'Placas de vídeo', descricao: 'Gráficos detalhados com tecnologias modernas.', preco: 2199, precoAnterior: 2499, imagem: 'https://bucket-s3-projeto-felipe.s3.us-east-2.amazonaws.com/assets/images/rtx-4060.png', selo: 'Oferta', especificacoes: ['8 GB GDDR6', 'PCIe 4.0'], avaliacao: 4.8, estoque: true },
      { id: 12, nome: 'Radeon RX 7600 8 GB', categoria: 'Placas de vídeo', descricao: 'Performance para jogos em Full HD.', preco: 1899, precoAnterior: 2099, imagem: 'https://bucket-s3-projeto-felipe.s3.us-east-2.amazonaws.com/assets/images/rx-7600.webp', selo: '', especificacoes: ['8 GB GDDR6', 'PCIe 4.0'], avaliacao: 4.6, estoque: true },
      { id: 13, nome: 'Ryzen 5 5600', categoria: 'Processadores', descricao: 'Ótimo equilíbrio entre preço e desempenho.', preco: 799, precoAnterior: 899, imagem: 'https://bucket-s3-projeto-felipe.s3.us-east-2.amazonaws.com/assets/images/ryzen-5-5600.png', selo: 'Mais vendido', especificacoes: ['6 núcleos', 'AM4'], avaliacao: 4.9, estoque: true },
      { id: 14, nome: 'Intel Core i5 12400F', categoria: 'Processadores', descricao: 'Velocidade para jogos e produtividade.', preco: 1199, precoAnterior: 1299, imagem: 'https://bucket-s3-projeto-felipe.s3.us-east-2.amazonaws.com/assets/images/i5-12400f.webp', selo: '', especificacoes: ['Multitarefas', 'Alto desempenho'], avaliacao: 4.6, estoque: true },
      { id: 15, nome: 'SSD NVMe M.2 1 TB', categoria: 'Armazenamento', descricao: 'Carregue jogos e aplicativos em menos tempo.', preco: 429, precoAnterior: 499, imagem: 'https://bucket-s3-projeto-felipe.s3.us-east-2.amazonaws.com/assets/images/ssd-nvme-1tb.png', selo: '', especificacoes: ['M.2 NVMe', '1 TB'], avaliacao: 4.7, estoque: true },
      { id: 16, nome: 'Memória DDR4 16 GB XPG', categoria: 'Memória RAM', descricao: 'Mais fluidez para jogos e multitarefa.', preco: 239, precoAnterior: 279, imagem: 'https://bucket-s3-projeto-felipe.s3.us-east-2.amazonaws.com/assets/images/ram-ddr4-16gb.png', selo: '', especificacoes: ['16 GB', 'DDR4'], avaliacao: 4.5, estoque: true }
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
