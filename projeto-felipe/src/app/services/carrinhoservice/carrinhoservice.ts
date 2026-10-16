import { Injectable, computed, signal, effect } from '@angular/core';

export interface ItemCarrinho {
  id: number;
  nome: string;
  preco: number;
  imagem: string;
  categoria?: string;
  quantidade: number;
}

export interface ProdutoCarrinho {
  id: number;
  nome?: string;
  name?: string;
  preco?: number;
  price?: number;
  imagem?: string;
  image?: string;
  categoria?: string;
  category?: string;
}

const STORAGE_KEY = 'techpec-carrinho';

@Injectable({ providedIn: 'root' })
export class CarrinhoService {
  private readonly itensSignal = signal<ItemCarrinho[]>(this.carregar());

  readonly itens = this.itensSignal.asReadonly();
  readonly quantidadeTotal = computed(() =>
    this.itensSignal().reduce((acc, item) => acc + item.quantidade, 0)
  );
  readonly total = computed(() =>
    this.itensSignal().reduce((acc, item) => acc + item.preco * item.quantidade, 0)
  );

  constructor() {
    effect(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.itensSignal()));
      } catch {}
    });
  }

  adicionar(produto: ProdutoCarrinho, quantidade = 1): void {
    const id = produto.id;
    const nome = produto.nome ?? produto.name ?? 'Produto';
    const preco = produto.preco ?? produto.price ?? 0;
    const imagem =
      produto.imagem ??
      produto.image ??
      'https://placehold.co/600x420/17151f/e9ddff?text=TechPec';
    const categoria = produto.categoria ?? produto.category;

    this.itensSignal.update((itens) => {
      const existe = itens.find((i) => i.id === id);
      if (existe) {
        return itens.map((i) =>
          i.id === id ? { ...i, quantidade: i.quantidade + quantidade } : i
        );
      }
      return [...itens, { id, nome, preco, imagem, categoria, quantidade }];
    });
  }

  remover(id: number): void {
    this.itensSignal.update((itens) => itens.filter((i) => i.id !== id));
  }

  incrementar(id: number): void {
    this.itensSignal.update((itens) =>
      itens.map((i) => (i.id === id ? { ...i, quantidade: i.quantidade + 1 } : i))
    );
  }

  decrementar(id: number): void {
    const item = this.itensSignal().find((i) => i.id === id);
    if (!item) return;
    if (item.quantidade <= 1) {
      this.remover(id);
      return;
    }
    this.itensSignal.update((itens) =>
      itens.map((i) => (i.id === id ? { ...i, quantidade: i.quantidade - 1 } : i))
    );
  }

  limpar(): void {
    this.itensSignal.set([]);
  }

  private carregar(): ItemCarrinho[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
}