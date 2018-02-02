import {Component} from '@angular/core';
import {CameraService} from '../../../camera/services';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'],
})
export class HomeComponent {
  public imageSrc$: Promise<string>;

  constructor(private readonly _cameraService: CameraService) {
  }

  public takePhoto(): void {
    this.imageSrc$ = this._cameraService.getPicture();
  }
}
