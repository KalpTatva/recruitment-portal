import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  styleUrl: './pagination.component.scss',
  imports : [CommonModule],
  templateUrl: './pagination.component.html'
})

export class PaginationComponent {
  @Input() totalPages = 1;
  @Input() currentPage = 1;
  @Output() pageChange = new EventEmitter<number>();

  setPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.pageChange.emit(this.currentPage);
    }
  }
}