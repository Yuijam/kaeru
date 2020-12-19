import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { IsSpService } from '../../services/isSp/is-sp.service';

@Directive({
  selector: '[appIsSp]',
})
export class IsSpDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private isSpService: IsSpService
  ) {
    if (this.isSpService.isSp) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
