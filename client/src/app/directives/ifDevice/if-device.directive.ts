import { Directive, TemplateRef, ViewContainerRef, Input } from '@angular/core';
import { IsSpService } from '../../services/isSp/is-sp.service';

@Directive({
  selector: '[appIfDevice]',
})
export class IfDeviceDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private isSpService: IsSpService
  ) {}

  @Input() set appIfDevice(device: 'pc' | 'sp') {
    if (device === 'sp' && this.isSpService.isSp) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
