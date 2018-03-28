import { NgModule } from '@angular/core';
import { IonicModule } from "ionic-angular";
import { MessageDetailComponent } from './message-detail/message-detail';
import { MessageGraphComponent } from './message-graph/message-graph';
import { MessageChallengeComponent } from './message-challenge/message-challenge';
import { MessageStreakComparisonComponent } from './message-streak-comparison/message-streak-comparison';
import { MessageStatasComparisonComponent } from './message-statas-comparison/message-statas-comparison';
import { MessageSurveyComponent } from './message-survey/message-survey';

@NgModule({
	declarations: [MessageDetailComponent,
    MessageGraphComponent,
    MessageChallengeComponent,
    MessageStreakComparisonComponent,
    MessageStatasComparisonComponent,
    MessageSurveyComponent],
	imports: [IonicModule],
	exports: [MessageDetailComponent,
    MessageGraphComponent,
    MessageChallengeComponent,
    MessageStreakComparisonComponent,
    MessageStatasComparisonComponent,
    MessageSurveyComponent]
})
export class ComponentsModule {}
