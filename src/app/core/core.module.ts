import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MessagesComponent } from './components/messages/messages.component';
import { RouterModule } from '@angular/router';

const COMPONENTS = [
  MessagesComponent,
  ToolbarComponent
]

@NgModule({
  declarations: [COMPONENTS],
  imports: [
    MaterialModule,
    CommonModule,
    RouterModule
  ],
  exports: [
    MaterialModule,
    COMPONENTS
  ]
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule?: CoreModule) {
      throw new Error('CoreModule has already been loaded. Import this module in the AppModule.')
    }
}