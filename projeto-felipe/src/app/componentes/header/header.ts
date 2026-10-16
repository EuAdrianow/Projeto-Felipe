import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarrinhoService } from '../../services/carrinhoservice/carrinhoservice';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header {
  readonly carrinho = inject(CarrinhoService);
}