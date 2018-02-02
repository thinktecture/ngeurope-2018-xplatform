import {Injectable} from '@angular/core';
import {CameraService} from './camera.service';

@Injectable()
export class DesktopCameraService extends CameraService {

  private getMediaDevices(): any {
    return ((window.navigator['mozGetUserMedia'] || window.navigator['webkitGetUserMedia']) ? {
      getUserMedia: function (options) {
        return new Promise((resolve, reject) => {
          (window.navigator['mozGetUserMedia'] ||
            window.navigator['webkitGetUserMedia']).call(window.navigator, options, resolve, reject);
        });
      }
    } : null) || window.navigator.mediaDevices;
  }

  public getPicture(): Promise<string> {
    return this.getMediaDevices().getUserMedia({ video: true, audio: false })
      .then((stream: any) => {
        return new Promise((resolve, reject) => {
          try {
            let vendorURL = window.URL || window['webkitURL'];
            const doc = document;
            let videoElement = doc.createElement('video');
            videoElement.src = vendorURL.createObjectURL(stream);
            videoElement.play();

            videoElement.addEventListener('canplay', () => {
              let canvasElement = doc.createElement('canvas');
              canvasElement.setAttribute('width', videoElement.videoWidth.toString());
              canvasElement.setAttribute('height', videoElement.videoHeight.toString());

              // Wait a bit before taking a screenshot so the camera has time to adjust lights
              setTimeout(() => {
                let context = canvasElement.getContext('2d');
                context.drawImage(videoElement, 0, 0, videoElement.videoWidth, videoElement.videoHeight);

                const url = canvasElement.toDataURL('image/png');

                videoElement.pause();

                if (stream.stop) {
                  stream.stop();
                }

                if (stream.getAudioTracks) {
                  stream.getAudioTracks().forEach((track: any) => {
                    track.stop();
                  });
                }

                if (stream.getVideoTracks) {
                  stream.getVideoTracks().forEach((track: any) => {
                    track.stop();
                  });
                }

                resolve(url);
              }, 500);
            });
          }
          catch (e) {
            reject(e);
          }
        });
      });
  }

}
