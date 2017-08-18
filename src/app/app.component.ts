import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//import { HomePage } from './../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  rootPage:string = "HomePage";

  @ViewChild(Nav) nav: Nav;

  menuSections: Array<{title: string, component: any}>

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      statusBar.backgroundColorByHexString('#ffffff');

      this.menuSections = [
        {title: 'Dados Cadastrais', component: 'IniciarPage'},
        {title: 'Meu Histórico', component: 'IniciarPage'},
        {title: 'Avalie-nos', component: 'IniciarPage'},
        {title: 'Sair', component: 'IniciarPage'},
      ]
    });
  }

  navToComponent(component: any){
    console.log('navToComponent')
    this.nav.setRoot(component); 
  }

}

