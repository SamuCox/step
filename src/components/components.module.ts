import { NgModule } from '@angular/core';
import { IonicModule } from "ionic-angular";
import { MessageDetailComponent } from './message-detail/message-detail';
import { MessageGraphComponent } from './message-graph/message-graph';

@NgModule({
	declarations: [MessageDetailComponent,
    MessageGraphComponent],
	imports: [IonicModule],
	exports: [MessageDetailComponent,
    MessageGraphComponent]
})
export class ComponentsModule {}
