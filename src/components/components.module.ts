import { NgModule } from '@angular/core';
import { IonicModule } from "ionic-angular";
import { MessageDetailComponent } from './message-detail/message-detail';
import { MessageGraphComponent } from './message-graph/message-graph';
import { MessageChallengeComponent } from './message-challenge/message-challenge';

@NgModule({
	declarations: [MessageDetailComponent,
    MessageGraphComponent,
    MessageChallengeComponent],
	imports: [IonicModule],
	exports: [MessageDetailComponent,
    MessageGraphComponent,
    MessageChallengeComponent]
})
export class ComponentsModule {}
