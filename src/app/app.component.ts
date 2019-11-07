import { Component } from '@angular/core';
import { VgAPI } from 'videogular2/compiled/core';


export interface IMedia {
  title: string;
  src: string;
  type: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  playlist: Array<IMedia> = [
    {
        title: 'Countdowm',
        src: 'http://static.videogular.com/assets/videos/elephants-dream.mp4',
        type: 'video/mp4'
    },
    {
        title: 'Banamex',
        src: '../assets/banamex.mp4',
        type: 'video/mp4'
    },
    {
      title: 'Pampas papa',
      src: '../assets/pampas.mp4',
      type: 'video/mp4'
    },
    {
      title: 'Starbucks',
      src: '../assets/starbucks.mp4',
      type: 'video/mp4'
    },
    {
      title: 'Milenio Vive',
      src: '../assets/milenio.mp4',
      type: 'video/mp4'
    },
    {
        title: 'Elephants Dream',
        src: '../assets/video.mp4',
        type: 'video/mp4'
    }
  ];
  title = 'tstmedia-player';
  preload = 'auto';
  currentIndex = 0;
  currentItem: IMedia = this.playlist[ this.currentIndex ];
  api: VgAPI; // we call the vgAPI

  videosSrc = [
                '../assets/video.mp4',
                'http://static.videogular.com/assets/videos/videogular.mp4'
              ];
  numberVideo = 0;


  constructor() {}

  onPlayerReady(api: VgAPI) {
    this.api = api; // we get api as an event from the html tag

    // we suscribe to an event when de metadata of the current video is loaded so lets call
    // the playvideo function that makes the video play at the start.
    this.api.getDefaultMedia().subscriptions.loadedMetadata.subscribe(this.playVideo.bind(this));
    // We also get suscribe to the event when the current video ends so se call the netx video function
    this.api.getDefaultMedia().subscriptions.ended.subscribe(this.nextVideo.bind(this));
  }

  nextVideo() {
    // here we just grow our index to match the item in our array
      this.currentIndex++;

      if (this.currentIndex === this.playlist.length) {
          this.currentIndex = 0;
      }

      this.currentItem = this.playlist[ this.currentIndex ];
  }

  playVideo() {
      this.api.play();
  }

  onClickPlaylistItem(item: IMedia, index: number) {
      this.currentIndex = index;
      this.currentItem = item;
  }

  pauseAll() {
    this.api.pause();
  }

}
