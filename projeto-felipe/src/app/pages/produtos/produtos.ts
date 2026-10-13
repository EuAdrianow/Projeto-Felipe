import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CardsComponent, Produto } from '../../componentes/cards/cards';
import { Header } from '../../componentes/header/header';
import { Menu } from '../../componentes/menu/menu';
import { Footer } from '../../componentes/footer/footer';

interface CategoriaAcesso {
  nome: string;
  descricao: string;
  icone: string;
  rota: string;
  estilo: string;
}

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    CardsComponent,
    Header,
    Menu,
    Footer
  ],
  templateUrl: './produtos.html',
  styleUrls: ['./produtos.css']
})
export class Produtos {
  titulo = 'Produtos';
  tituloHtml = 'Tudo para o seu <span>setup gamer.</span>';
  chamada = 'SEU PRÓXIMO UPGRADE COMEÇA AQUI';
  descricao =
    'Explore o catálogo TechPec: hardware de alto desempenho, computadores gamer e periféricos para deixar seu setup do seu jeito.';
  subtitulo = 'Todos os produtos';
  categorias: string[] = [
    'Todas',
    'Placas de vídeo',
    'Processadores',
    'Computadores gamer',
    'Monitores',
    'Periféricos'
  ];
  categoriaAtiva = this.categorias[0];
  busca = '';
  ordenacao = 'relevancia';
  mensagem = '';

  /** Acessos no estilo do site para as páginas de categoria */
  acessos: CategoriaAcesso[] = [
    {
      nome: 'Todos os produtos',
      descricao: 'Catálogo completo TechPec em um só lugar.',
      icone: '🎯',
      rota: '/produtos',
      estilo: 'cat-all'
    },
    {
      nome: 'Hardwares',
      descricao: 'Placas, processadores, SSD e memória para o seu PC.',
      icone: '⚡',
      rota: '/hardwares',
      estilo: 'cat-hardware'
    },
    {
      nome: 'Computadores gamer',
      descricao: 'PCs prontos do setup de entrada ao high-end.',
      icone: '🖥️',
      rota: '/computadores-gamer',
      estilo: 'cat-pc'
    },
    {
      nome: 'Monitores',
      descricao: 'Alta taxa de atualização e cores vibrantes.',
      icone: '🖵',
      rota: '/monitores',
      estilo: 'cat-monitor'
    },
    {
      nome: 'Periféricos',
      descricao: 'Teclados, mouses, headsets e mais para o setup.',
      icone: '⌨️',
      rota: '/perifericos',
      estilo: 'cat-perif'
    }
  ];

  produtos: Produto[] = [
    {
      id: 1,
      nome: 'GeForce RTX 4060 8 GB',
      categoria: 'Placas de vídeo',
      descricao: 'Ray tracing e DLSS para jogar com fluidez.',
      preco: 2199,
      precoAnterior: 2499,
      imagem: 'https://placehold.co/600x420/21152d/cb9aff?text=RTX+4060',
      selo: 'Oferta',
      especificacoes: ['8 GB GDDR6', 'PCIe 4.0'],
      avaliacao: 4.8,
      estoque: true
    },
    {
      id: 2,
      nome: 'Processador Ryzen 5 5600',
      categoria: 'Processadores',
      descricao: 'Desempenho equilibrado para jogos e multitarefa.',
      preco: 799,
      precoAnterior: 899,
      imagem: 'https://placehold.co/600x420/21152d/cb9aff?text=Ryzen+5+5600',
      selo: 'Mais vendido',
      especificacoes: ['6 núcleos', 'Socket AM4'],
      avaliacao: 4.9,
      estoque: true
    },
    {
      id: 3,
      nome: 'TechPec Arena Starter',
      categoria: 'Computadores gamer',
      descricao: 'PC gamer para começar sua próxima jornada.',
      preco: 3299,
      precoAnterior: 3599,
      imagem: 'https://placehold.co/600x420/21152d/cb9aff?text=Arena+Starter',
      selo: 'Setup recomendado',
      especificacoes: ['16 GB RAM', 'SSD 1 TB'],
      avaliacao: 4.7,
      estoque: true
    },
    {
      id: 4,
      nome: "Monitor Pulse 24'' 180 Hz",
      categoria: 'Monitores',
      descricao: 'Movimentos suaves e resposta rápida.',
      preco: 899,
      precoAnterior: 999,
      imagem: 'https://placehold.co/600x420/21152d/cb9aff?text=Monitor+180Hz',
      selo: 'Oferta',
      especificacoes: ['Full HD', '180 Hz'],
      avaliacao: 4.8,
      estoque: true
    },
    {
      id: 5,
      nome: 'Teclado mecânico RGB',
      categoria: 'Periféricos',
      descricao: 'Precisão, iluminação e conforto para longas sessões.',
      preco: 249,
      precoAnterior: 299,
      imagem: 'https://placehold.co/600x420/21152d/cb9aff?text=Teclado+RGB',
      selo: '',
      especificacoes: ['Switch mecânico', 'RGB'],
      avaliacao: 4.6,
      estoque: true
    },
    {
      id: 6,
      nome: 'Mouse gamer Spectrum',
      categoria: 'Periféricos',
      descricao: 'Sensor preciso e formato ergonômico.',
      preco: 159,
      precoAnterior: 189,
      imagem: 'https://placehold.co/600x420/21152d/cb9aff?text=Mouse+Gamer',
      selo: '',
      especificacoes: ['Até 12.000 DPI', '6 botões'],
      avaliacao: 4.5,
      estoque: true
    },
    {
      id: 7,
      nome: 'SSD NVMe 1 TB',
      categoria: 'Armazenamento',
      descricao: 'Inicialização rápida e mais espaço para jogos.',
      preco: 429,
      precoAnterior: 499,
      imagem: 'https://placehold.co/600x420/21152d/cb9aff?text=SSD+NVMe',
      selo: '',
      especificacoes: ['M.2 NVMe', '1 TB'],
      avaliacao: 4.7,
      estoque: true
    },
    {
      id: 8,
      nome: 'Headset Surround X',
      categoria: 'Periféricos',
      descricao: 'Áudio imersivo e microfone ajustável.',
      preco: 299,
      precoAnterior: 349,
      imagem: 'https://placehold.co/600x420/21152d/cb9aff?text=Headset+Surround',
      selo: '',
      especificacoes: ['Som surround', 'Microfone'],
      avaliacao: 4.4,
      estoque: true
    }
  ];

  get produtosFiltrados(): Produto[] {
    const termo = this.busca.trim().toLocaleLowerCase('pt-BR');
    let resultado = this.produtos.filter((p) => {
      const combinaBusca =
        !termo ||
        [p.nome, p.categoria, p.descricao, ...(p.especificacoes || [])].some(
          (valor) => valor.toLocaleLowerCase('pt-BR').includes(termo)
        );
      const combinaCategoria =
        this.categoriaAtiva === this.categorias[0] ||
        p.categoria.toLocaleLowerCase('pt-BR') ===
          this.categoriaAtiva.toLocaleLowerCase('pt-BR');
      return combinaBusca && combinaCategoria;
    });

    resultado = [...resultado];
    if (this.ordenacao === 'menor-preco')
      resultado.sort((a, b) => a.preco - b.preco);
    if (this.ordenacao === 'maior-preco')
      resultado.sort((a, b) => b.preco - a.preco);
    if (this.ordenacao === 'nome')
      resultado.sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
    return resultado;
  }

  adicionarAoCarrinho(produto: Produto): void {
    this.mensagem = `${produto.nome} foi adicionado ao carrinho (demonstração).`;
    window.setTimeout(() => (this.mensagem = ''), 3000);
  }
}