import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export interface SideNavItem {
  label: string,
  id?: string,
  icon: string,
  path: string,
  iconFill?: boolean,
  iconStroke?: boolean,
  children?: {
    label: string,
    id?: string,
    icon: string,
    iconFill?: boolean,
    iconStroke?: boolean,
    path: string
  }[]
}
@Component({
  selector: 'rds-side-nav',
  templateUrl: './rds-side-nav.component.html',
  styleUrls: ['./rds-side-nav.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: RdsSideNavComponent,
    multi: true
  }]
})
export class RdsSideNavComponent implements OnInit {


  title = 'rds-side-nav';


  ngOnInit(): void {

  }
  @Input() projectName: string = 'raaghu';
  @Input() logo: string = 'assets/raaghu_icon.png';
  @Input() sidenavItems: SideNavItem[] = [];
  @Input() isPageWrapper: boolean = false;
  @Input() collapseRequired: boolean = true;
  @Input() iconHeight: string = '20px';
  @Input() iconWidth: string = '20px';
  @Output() emitPath = new EventEmitter<any>();
  @Output() collapsedState = new EventEmitter<any>();
  @Input() activepage: any = 0;
  @Input() activesubmenu: any = 0;
  @Output() selectedMode = new EventEmitter<any>();
  activeMenuWithChildren: any = 0;
  isLightMode = true;
  collapsed = false;
  openedMenu = false;
  onClick(event: any, i: number, path: any): void {
    event.preventDefault();
    // this.router.navigateByUrl(path);
    this.emitPath.emit(path);
    this.activepage = i;
    this.activesubmenu = '';
    this.activeMenuWithChildren = '';
  }
  onMenuWithChildrenClick(i: number, path: any) {
    const x = document.getElementById('menuWithChildren' + i);
    if (x !== null)
      this.openedMenu = x.classList.contains('collapsed');
    if (!this.openedMenu) {
      this.activepage = i;
      this.activesubmenu = 0;
      this.emitPath.emit(path);
    }
  }
  onClickSubMenu(event: any, i: number, j: number, path: any): void {
    event.preventDefault();
    this.emitPath.emit(path);
    this.activesubmenu = j;
    this.activepage = i;
    this.activeMenuWithChildren = i;
  }
  onCollapse() {
    this.collapsed = !this.collapsed;
    this.collapsedState.emit(this.collapsed)
  }
  toggleLightAndDarkMode() {
    this.isLightMode = !this.isLightMode
    console.log(this.isLightMode)
    this.selectedMode.emit(this.isLightMode)
  }

}
