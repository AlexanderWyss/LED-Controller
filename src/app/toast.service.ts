import { Injectable } from "@angular/core";
import {ToastController} from "@ionic/angular";

@Injectable({
  providedIn: "root"
})
export class ToastService {

  constructor(private toastController: ToastController) { }

  public error(message: string): void {
    this.toastController.create({
      message,
      color: "danger",
      duration: 5000
    }).then(toast => toast.present());
  }

  public good(message: string) {
    this.toastController.create({
      message,
      color: "success",
      duration: 5000
    }).then(toast => toast.present());
  }
}
