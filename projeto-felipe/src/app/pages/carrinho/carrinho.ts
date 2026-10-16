import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Header } from '../../componentes/header/header';
import { Menu } from '../../componentes/menu/menu';
import { Footer } from '../../componentes/footer/footer';
import { CarrinhoService } from '../../services/carrinhoservice/carrinhoservice';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterLink, Header, Menu, Footer],
  templateUrl: './carrinho.html',
  styleUrls: ['./carrinho.css']
})
export class Carrinho {
  readonly carrinho = inject(CarrinhoService);

  finalizarPedido(): void {
    if (this.carrinho.quantidadeTotal() === 0) return;
    alert(
      'Pedido registrado!\n\nTotal: R$ ' +
        this.carrinho.total().toFixed(2).replace('.', ',')
    );
    this.carrinho.limpar();
  }
}