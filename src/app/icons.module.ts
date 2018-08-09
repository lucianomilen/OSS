import { NgModule } from '@angular/core';
import {IconCamera, IconHeart, IconGithub, IconPhone, IconMapPin, IconMail} from 'angular-feather';

const icons = [
  IconCamera,
  IconHeart,
  IconGithub,
  IconPhone,
  IconMapPin,
  IconMail
];

@NgModule({
  exports: icons
})
export class IconsModule { }
