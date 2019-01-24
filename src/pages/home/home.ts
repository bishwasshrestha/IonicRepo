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

  ngOnInit() {
    this.getAllFiles();
  }
  getAllFiles() {
    this.mediaProvider.getAllMedia().subscribe((result: Media[]) => {

      this.picArray = result.map((pic: Media) => {

        const nameArray = pic.filename.split('.')[0];
        pic.thumbnails = {
          160: nameArray + '-tn160.png'
        };
        console.log('pic.thumbnails', pic.thumbnails);
        return pic;
      });
    }, (err) => { console.log(err); });
  }
}
