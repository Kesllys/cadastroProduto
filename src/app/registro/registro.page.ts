import { produto } from './../models/produto';
import { StorageService } from './../services/storage.service';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})

export class RegistroPage implements OnInit {
  Produto: produto = new produto();

  formCadastro: FormGroup;

  mensagens = {
    nome: [
      { tipo: 'required', mensagem: 'Este campo é obrigatório!' },
    ],

    descricao: [
      { tipo: 'required', mensagem: 'Este campo é obrigatório!' },
      { tipo: 'minLength', mensagem: 'A descrição deve conter no mínimo 10 caracteres.' },
    ],

    validade: [
      {
        tipo: 'required', mensagem: 'Este campo é obrigatório!'
      },
      {
        tipo: 'required', mensagem: 'Mínimo de 4 caracteres.'
      }
    ],

    preco: [
      {
        tipo: 'required', mensagem: 'Este campo é obrigatório!'
      }
    ]
  }



  constructor(private alertController: AlertController, private formBuilder: FormBuilder, private storageService: StorageService, private router: Router) {
    this.formCadastro = this.formBuilder.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
      validade: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      preco: ['', Validators.required],
    });
  }

  ngOnInit(){}

  async salvarcadastro() {
    if (this.formCadastro.valid) {
      this.Produto.nome = this.formCadastro.value.nome;
      this.Produto.descricao = this.formCadastro.value.descricao;
      this.Produto.validade = this.formCadastro.value.validade;
      this.Produto.preco = this.formCadastro.value.preco;

      this.storageService.set(this.Produto.nome, this.Produto);
      this.router.navigateByUrl('/home')

    } else {
      const alert = await this.alertController.create({
        header: 'Corrija as informações!',
        subHeader: 'Campos não preenchidos!',
        message: 'Preencha todos os campos!!',
        buttons: ['Corrigir'],
      });

      await alert.present();
  }
}
}

