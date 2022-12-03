import { StorageService } from './../services/storage.service';
import { Storage } from '@ionic/storage-angular';
import { produto } from './../models/produto';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  listaProdutos: produto[] = [];

  constructor(private storageService: StorageService) { }

 async buscarProdutos() {
   this.listaProdutos = await this.storageService.getAll();
 }

  ionViewDidEnter() {
    this.buscarProdutos();
  }
}
