import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/service/auth-service';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {
  @Input() totalItems: any
  @Input() currentPage:any
  @Input() itemsPerPage: any
  @Output() onClick: EventEmitter<number> = new EventEmitter()
  totalpages = 0;
  pages: number[] = []

  constructor(private authService: AuthService){
  
  }
  ngOnInit(): void {
    this.authService.getPaginatorData().subscribe({
      next: (data) => {
        this.totalItems = data.totalItem
        if(this.totalItems){
          this.totalpages = Math.ceil(this.totalItems / this.itemsPerPage)
          this.pages = Array.from({length: this.totalpages}, (_, i) => i + 1)
          
        } 
      }
    })


  }

  pageClicked(page: number){
    if(page <=0){
      page = 1 
    }
    if(page > this.totalpages) return;
    this.onClick.emit(page);
}
}
