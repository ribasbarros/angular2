import { Component, OnInit } from '@angular/core';
import { FotoService } from "../servicos/foto.service";
import { FotoComponent } from '../foto/foto.component';
import { MensagemComponent } from '../mensagem/mensagem.component';

@Component({
  selector: 'listagem',
  templateUrl: "./listagem.component.html",
  styles: []
})
export class ListagemComponent implements OnInit {

  titulo = "Smiles"
  fotos: FotoComponent[] = []
  mensagem = new MensagemComponent()
  pesquisar

  constructor(private servico: FotoService){
    servico.listar().subscribe(
      response => this.fotos = response
      ,fault => console.log(fault)
    )
  }

  ngOnInit() {
  }

  apagar(id: String){
    this.servico.deletar(id).subscribe(
      (mensagemServico) => {
        this.fotos = this.fotos.filter(foto => !(foto._id === id))
        this.mensagem.texto = mensagemServico.texto
        this.mensagem.tipo = mensagemServico.tipo
        setTimeout(() => this.mensagem = new MensagemComponent(), 3000)
    })
  }
}
