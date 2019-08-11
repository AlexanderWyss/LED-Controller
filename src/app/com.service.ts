export abstract class ComService {
  public abstract read(name: string): Promise<void>;

  public abstract write(name: string, data: object): Promise<object>;
}
