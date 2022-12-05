import { Injectable } from '@angular/core';
import { produto } from '../models/produto';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  set(nome: string, Produto: produto) {
    throw new Error('Method not implemented.');
  }

  constructor() { }
}
