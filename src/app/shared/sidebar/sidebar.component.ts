import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';
import { DbzService } from '../../../../../01-bases/src/app/dbz/services/dbz.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent  {

  constructor( private gifsService: GifsService) { }

  get history(): string[]{
    return this.gifsService.hystory;
  }

  search( query: string){
    this.gifsService.searchGifs( query );
  }
  

}
