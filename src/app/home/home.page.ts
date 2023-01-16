
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController, IonRouterOutlet, LoadingController, ModalController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { AvatarService } from '../services/avatar.service';
import { ChatService } from '../services/chat.service';
import { FirestoreService } from '../services/firestore.service';
import { InteractionService } from '../services/interaction.service';

import { Geolocation } from '@capacitor/geolocation';
import { Observable } from 'rxjs';
import { NewContactPage } from '../new-contact/new-contact.page';
import { DataService } from '../services/data.service';
import { Contact } from './models/contact';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public contacts: Observable<Contact[]>;


  constructor(
    private dataService: DataService,
    private routerOutlet: IonRouterOutlet,
    private chatService: ChatService,
    private avatarService: AvatarService,
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private firestore: FirestoreService,
    private interaction: InteractionService,
    private modalController: ModalController
  ) {
    this.contacts = this.dataService.getContacts();
  }

  async openNewContactModal() {
    const modal = await this.modalController.create({
      component: NewContactPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl
    });

    return await modal.present();
  }


  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }


  signOut() {
    this.authService.logout().then(() => {
      this.router.navigateByUrl('/', { replaceUrl: true });
    });
  }

  async changeImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos, // Camera, Photos or Prompt!
    });

    if (image) {
      const loading = await this.loadingController.create();
      await loading.present();

      const result = await this.avatarService.uploadImage(image);
      loading.dismiss();

      if (!result) {
        const alert = await this.alertController.create({
          header: 'Upload failed',
          message: 'There was a problem uploading your avatar.',
          buttons: ['OK'],
        });
        await alert.present();
      }
    }
  }

  

 


  // async locate(){
  //   const coordinates = await Geolocation.getCurrentPosition();
  //   this.latitud=coordinates.coords.latitude;
  //   this.longitud=coordinates.coords.longitude;
  // }

}

