import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';

/**
 * Generated class for the UploadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html',
})
export class UploadPage {
   filedata = '';
   file: File;
   title = '';
   description = '';

   constructor(public navCtrl: NavController, public navParams: NavParams, private mediaProvider: MediaProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadPage');
  }

  handleChange($event) {
    this.file = $event.target.files[0];
    this.showPreview();
  }

  showPreview() {
    const reader = new FileReader();
    reader.onloadend = (evt) => {
      this.filedata = reader.result;
    };
    reader.readAsDataURL(this.file);
  }

  upload() {
     const desc = `<description>${this.description}</description>`;
     const filters = `<filter>filterAsText</filter>`;
    const fd = new FormData();
    fd.append('title', this.title);
    fd.append('description', desc);
    fd.append('file', this.file);
    this.mediaProvider.upload(fd).subscribe((resp) => {
      console.log(resp);
    this.navCtrl.pop().catch();
    });
  }
}
