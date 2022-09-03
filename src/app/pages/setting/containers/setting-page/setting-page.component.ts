import { Component } from '@angular/core';
@Component({
  selector: 'app-setting',
  templateUrl: './setting-page.component.html',
  styleUrls: ['./setting-page.component.scss'],
})
export class SettingComponent {
  homeIcon: string = '../../../assets/icons/home-icon.svg';
  slashIcon: string = '../../../assets/icons/slash-icon.svg';

  constructor() {}
}
