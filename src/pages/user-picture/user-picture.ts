import {Component} from '@angular/core';
import { IonicPage, LoadingController, Loading, ToastController } from "ionic-angular";
import { NavController, NavParams, AlertController } from "ionic-angular";

import { Observable } from 'rxjs/Observable';

import {Camera} from '@ionic-native/camera';
import {File, FileEntry} from "@ionic-native/file";

import { SafeHttp } from './../../utils/safe-http';
import { LoginProvider } from './../../providers/login/login.provider';

import { UsuarioModel } from './../../model/usuario-model';

@IonicPage()
@Component({
  selector: 'page-user-picture',
  templateUrl: 'user-picture.html',
})
export class UserPicturePage {

  public myPhoto: any;
  public myPhotoURL: any;
  public error: string;
  private loading: Loading;  
  public usuario: UsuarioModel;

  constructor(
    private readonly safeHttp: SafeHttp,
    public navCtrl: NavController,
    public navParams: NavParams,
    private readonly loadingCtrl: LoadingController,
    private readonly toastCtrl: ToastController,
    private readonly camera: Camera,
    private readonly file: File,
    private alert: AlertController,
    private loginProvider: LoginProvider 
  ) {
    this.initialize();
  }

  initialize(){
    this.usuario = new UsuarioModel();
    this.usuario = this.navParams.get('usuario');
  }

  takePhoto() {
    this.camera.getPicture({
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.PNG,
      saveToPhotoAlbum: true
    }).then(imageData => {
      this.myPhoto = imageData;
      this.uploadPhoto(imageData);
      //this.uploadFake();
    }, error => {
      this.error = JSON.stringify(error);
    });
  }

  selectPhoto(): void {
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI,
      quality: 100,
      encodingType: this.camera.EncodingType.PNG,
    }).then(imageData => {
      this.myPhoto = imageData;
      this.uploadPhoto(imageData);
      //this.uploadFake();
    }, error => {
      this.error = JSON.stringify(error);
    });
  }

  private uploadPhoto(imageFileUri: any): void {
    this.error = null;
    this.loading = this.loadingCtrl.create({
      content: 'Uploading...'
    });

    this.loading.present();

    this.file.resolveLocalFilesystemUrl(imageFileUri)
      .then(entry => (<FileEntry>entry).file(file => this.readFile(file)))
      .catch(err => console.log(err));
  }

  private readFile(file: any) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const formData = new FormData();
      const imgBlob = new Blob([reader.result], {type: file.type});
      formData.append('fileToUpload', imgBlob, file.name); 
      this.postData(formData);
    };
    reader.readAsArrayBuffer(file);
  }

  //substituir pela url da nossa API
  private postData(formData: FormData) {
    this.safeHttp.post("http://192.168.0.8/upload.php", formData, this.loginProvider.getAccessToken())
      .toPromise()
      .catch((e) => this.handleError(e))
      .then((ok) => {
        this.loading.dismiss()
        this.showToast(ok)
      })
  }

  private showToast(ok: boolean) {
    if (ok) {
      const toast = this.toastCtrl.create({
        message: 'Upload successful',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
    else {
      const toast = this.toastCtrl.create({
        message: 'Upload failed',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body: any = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    this.error = errMsg;
    return Observable.throw(errMsg);
  }  

  presentAlert(title: string, msg: string) {
    let alert = this.alert.create({
      title: title,
      subTitle: msg,
      buttons: ['Ok']
    });
    alert.present();
  }    

  enviar(){
    this.presentAlert('Obrigado', 'Seu cadastro foi concluído com sucesso! Vamos começar!');
    this.navCtrl.push('HometabPage',{'usuarioLogado': this.usuario})
  }

}
