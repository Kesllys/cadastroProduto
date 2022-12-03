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
      { tipo: 'required', mensagem: 'O campo nome é Obrigatorio.' },
    ],

    descricao: [
      { tipo: 'required', mensagem: 'O campo descrição é obrigatorio.' },
      { tipo: 'minLength', mensagem: 'O campo descrição deve conter no minimo mais de 25 caracteres.' },
    ],

    validade: [
      {
        tipo: 'required', mensagem: 'O campo validade é Obrigatorio.'
      },
      {
        tipo: 'required', mensagem: 'O campo validade deve conter no minimo mais de 6 caracteres.'
      }
    ],

    preco: [
      {
        tipo: 'required', mensagem: 'O campo preço é Obrigatorio.'
      }
    ]
  }



  constructor(private alertController: AlertController, private formBuilder: FormBuilder, private storageService: StorageService, private router: Router) {
    this.formCadastro = this.formBuilder.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.compose([Validators.required, Validators.minLength(25)])],
      validade: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
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
        header: 'Formulário Inválido!',
        subHeader: 'Campos não preenchidos!',
        message: 'Preencha todos os campos!!',
        buttons: ['OK'],
      });

      await alert.present();
  }
}
}

