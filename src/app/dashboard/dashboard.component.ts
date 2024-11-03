import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { Item } from '../models/item.model';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  private authService = inject(AuthService);
  private router = inject(Router);
  profile: any;

  ngOnInit(): void {
    this.showData();
  }

  showData() {
    this.profile = this.authService.getProfile();
    console.log(this.profile);
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  newItem: Item = {
    id: 0,
    name: '',
    imageFile: null,
    price: 0,
    description: '',
    imagePreview: '',
    quantity: 1
  };

  items: Item[] = [];
  cartItems: Item[] = []; // Array para armazenar os itens do carrinho
  purchasedItems: Item[] = []; // Array para armazenar os itens comprados

  // Adicionar o item à lista
  addItem() {
    if (this.newItem.name && this.newItem.imageFile && this.newItem.price > 0 && this.newItem.description && this.newItem.quantity > 0) {
      this.newItem.id = this.items.length + 1;
      this.items.push({ ...this.newItem });
      this.clearForm();
    } else {
      alert('Preencha todos os campos corretamente!');
    }
  }

  // Editar o item
  editItem(item: Item) {
    this.newItem = { ...item };
    this.removeItem(item); // Remove o item da lista enquanto é editado
  }

  // Excluir o item da lista
  removeItem(item: Item) {
    this.items = this.items.filter(i => i.id !== item.id);
  }

  // Adicionar item ao carrinho
  addToCart(item: Item) {
    const existingItem = this.cartItems.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      existingItem.quantity += item.quantity; // Incrementa a quantidade se já estiver no carrinho
    } else {
      this.cartItems.push({ ...item });
    }
  }

  // Método para comprar item individualmente
  purchaseItems(cartItem: Item) {
    if (!cartItem) {
      alert('Selecione um item para comprar!');
      return;
    }

    // Lógica para processar o pagamento ou finalização da compra
    alert(`Compra do item ${cartItem.name} realizada com sucesso!`);

    // Mover o item do carrinho para os itens comprados
    this.purchasedItems.push({ ...cartItem });
    this.removeFromCart(cartItem);
  }

  // Excluir item do carrinho
  removeFromCart(cartItem: Item) {
    this.cartItems = this.cartItems.filter(item => item.id !== cartItem.id);
  }

  // Excluir item da lista de comprados
  removePurchasedItem(purchasedItem: Item) {
    this.purchasedItems = this.purchasedItems.filter(item => item.id !== purchasedItem.id);
  }

  // Processar o arquivo de imagem e gerar a previsualização
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.newItem.imageFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.newItem.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  // Limpar o formulário
  clearForm() {
    this.newItem = {
      id: 0,
      name: '',
      imageFile: null,
      price: 0,
      description: '',
      imagePreview: '',
      quantity: 1
    };
  }

}
