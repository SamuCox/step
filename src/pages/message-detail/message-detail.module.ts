import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MessageDetailPage } from './message-detail';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
	declarations: [
	MessageDetailPage,
	],
	imports: [
	ComponentsModule,
	IonicPageModule.forChild(MessageDetailPage),
	],
})
export class MessageDetailPageModule {}
