import { Component, OnInit } from '@angular/core';
import { FotoService } from "../servicos/foto.service";
import { FotoComponent } from '../foto/foto.component';

@Component({
  selector: 'listagem',
  templateUrl: "./listagem.component.html",
  styles: []
})
export class ListagemComponent implements OnInit {

  titulo = "Smiles"
  fotos: FotoComponent[] = []
  mensagem

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
      () => this.fotos = this.fotos.filter(foto => !(foto._id === id))
    )
    this.mensagem = `${id} apagado com sucesso!`

    setTimeout( () => this.mensagem='' , 2000)
  }

}
