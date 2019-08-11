export abstract class ComService {

  protected constructor(private protocol: string) {

  }

  public abstract read(name: string): Promise<any>;

  public abstract write(name: string, data: object): Promise<any>;

  public getProtocol(): string {
    return this.protocol;
  }

  public abstract close();

  public abstract open();
}
