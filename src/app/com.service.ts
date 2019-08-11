export abstract class ComService {

  protected constructor(private protocol: string) {

  }

  public abstract read(name: string): Promise<void>;

  public abstract write(name: string, data: object): Promise<object>;

  public getProtocol(): string {
    return this.protocol;
  }
}
