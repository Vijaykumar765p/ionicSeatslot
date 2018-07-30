import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TrackbusPage } from './trackbus';

@NgModule({
  declarations: [
    TrackbusPage,
  ],
  imports: [
    IonicPageModule.forChild(TrackbusPage),
  ],
})
export class TrackbusPageModule {}
