import { Component } from '@angular/core';

import { Camera } from '@ionic-native/camera';
import { File, FileEntry } from "@ionic-native/file";

import { IonicPage } from "ionic-angular";
import { NavController, NavParams } from "ionic-angular";


import { AlertService } from './../../utils/alert.service';
import { ToastService } from './../../utils/toast.service';
import { LoadingService } from './../../utils/loading.service';

import { LoginProvider } from './../../providers/login/login.provider';

import { AppMessages } from './../../app/app-messages';

import { SafeHttp } from '../../utils/safe-http';

import { UsuarioModel } from '../../model/usuario-model';
import { FormBase } from '../../shared/form-base';

@IonicPage()
@Component({
  selector: 'page-user-picture',
  templateUrl: 'user-picture.html',
})
export class UserPicturePage extends FormBase {

  public myPhoto: any;
  
  public myPhotoURL: any;
  
  public error: string;
  
  public usuario: UsuarioModel;

  constructor(
    private readonly safeHttp: SafeHttp,
    public navCtrl: NavController,
    public navParams: NavParams,
    private readonly camera: Camera,
    private readonly file: File,
    private readonly loadingService: LoadingService,
    private readonly toastService: ToastService,
    private readonly alertService: AlertService,
    private loginProvider: LoginProvider
  ) {

    super();

  }

  async inicializar() {
    
    this.usuario =  this.loginProvider.getUsuarioLogado();

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

    }).catch((error) => {
      
      this.toastService.vermelho('Desculpe... algo deu errado! Tente novamente...');

    });

  }

  selectPhoto(): void {

    this.camera.getPicture({

      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      
      destinationType: this.camera.DestinationType.FILE_URI,
      
      quality: 100,
      
      encodingType: this.camera.EncodingType.PNG,

    })
    .then(imageData => {
      
      this.myPhoto = imageData;
      
      this.uploadPhoto(imageData);

    })
    .catch(() => {

      this.toastService.vermelho('Desculpe...Algo deu errado! Tente novamente...');

    });
  }

  private uploadPhoto(imageFileUri: any): void {

    this.loadingService.show('enviando...');

    this.file.resolveLocalFilesystemUrl(imageFileUri)
      .then((entry) => {

        (<FileEntry>entry).file(file => this.readFile(file));

      })
      .catch((erro) => {
        
        this.toastService.vermelho(AppMessages.ERRO_UPLOAD);

      });
  }

  private readFile(file: any) {
    
    const reader = new FileReader();

    reader.onloadend = () => {
    
      const formData = new FormData();
    
      const imgBlob = new Blob([reader.result], { type: file.type });
    
      formData.append('fileToUpload', imgBlob, file.name);
    
      this.postData(formData);

    };

    reader.readAsArrayBuffer(file);

  }

  //TODO: substituir pela url da nossa API
  private postData(formData: FormData) {

    this.safeHttp.post("http://192.168.0.8/upload.php", formData)
      .toPromise()
      .then((ok) => {

        this.toastService.verde('Envio concluído!');        

      })
  }

  enviar() {
    
    this.alertService.simpleAlert('Tudo certo! Você já pode utilizar nossos serviços!');

    this.navCtrl.push('HometabPage')

  }

}
