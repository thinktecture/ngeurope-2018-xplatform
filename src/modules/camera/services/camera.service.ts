export abstract class CameraService {
  public abstract getPicture(): Promise<string>;
}
