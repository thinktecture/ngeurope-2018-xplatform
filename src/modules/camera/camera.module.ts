import {NgModule} from '@angular/core';
import {ModuleWithProviders} from '@angular/compiler/src/core';
import {CameraService} from './services';
import {MobileCameraService} from './services/mobile-camera.service';
import {DesktopCameraService} from './services/desktop-camera.service';
import {environment} from '../../environments/environment';

export function cameraServiceFactory(): CameraService {
  return environment.mobile ? new MobileCameraService() : new DesktopCameraService();
}

@NgModule()
export class CameraModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: CameraModule,
      providers: [{
        provide: CameraService,
        useFactory: cameraServiceFactory
      }]
    };
  }
}
