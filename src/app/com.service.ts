import {HttpClient, HttpParams} from '@angular/common/http';
import * as uuidGen from 'uuid/v5';

export abstract class ComService {
    public abstract read(name: string): Promise<void>;
    public abstract write(name: string, data: object): Promise<object>;
}
