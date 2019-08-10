import {HttpClient, HttpParams} from '@angular/common/http';
import * as uuidGen from 'uuid/v5';

export abstract class ComService {
    protected uuid = 'de7daa74-9126-494c-b277-9ca4c0944c7e';
    protected id: string;

    public abstract read(name: string): Promise<void>;
    public abstract write(name: string, data: object): Promise<object>;
}
