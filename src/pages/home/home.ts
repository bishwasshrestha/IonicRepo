import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Media } from '../../interfaces/pic';
import { MediaProvider } from '../../providers/media/media';
import { Observable } from "rxjs";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'

})
export class HomePage {
  picArray: Observable<Media[]>;
  //time_added = new Date(2019,1,28);

  constructor(private mediaProvider: MediaProvider, public navCtrl: NavController) { }

  ngOnInit() {
    this.getAllFiles();
  }
  getAllFiles() {
    this.picArray = this.mediaProvider.getAllMedia();
  }
}
