import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'botao',
  template: `<button (click)="executaAcao()" type="{{tipo}}" class="btn btn-{{estilo}}">
  <ng-content></ng-content></button>`,
  styles: []
})
export class BotaoComponent {

  @Input() texto = 'ok'
  @Input() estilo = 'secondary'
  @Input() tipo = 'button'
  @Input() confirmacao = false

  @Output() acao = new EventEmitter()

  executaAcao() {
    if (!this.confirmacao || confirm('Vc tem ctz?')) {
      this.acao.emit()
    }
  }

}
