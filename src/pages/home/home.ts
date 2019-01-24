import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Media } from '../../interfaces/pic';
import { MediaProvider } from '../../providers/media/media';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  picArray: Media[] = [];

  constructor(private mediaProvider: MediaProvider, public navCtrl: NavController) { }


  ionViewDidLoad() {
      this.getAllFiles();
  }


  getAllFiles() {
    this.mediaProvider.getAllMedia().subscribe((result: Media[]) => {
      result.forEach((pic: Media) => {
        this.mediaProvider.getSingleMedia(pic.file_id).subscribe((image: Media) => {
          this.picArray.push(image);
        });
      });
    }, (err) => { console.log(err); });
  }
}
