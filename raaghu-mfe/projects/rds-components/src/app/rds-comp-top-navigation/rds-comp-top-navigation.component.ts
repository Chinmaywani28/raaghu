import { Component, DoCheck, EventEmitter, Injector, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentLoaderOptions, MfeBaseComponent, ThemeSettingsDto } from '@libs/shared';
import { TranslateService } from '@ngx-translate/core';
import { TableHeader } from '../../models/table-header.model';
declare var bootstrap: any;
@Component({
  selector: 'app-rds-top-navigation',
  templateUrl: './rds-comp-top-navigation.component.html',
  styleUrls: ['./rds-comp-top-navigation.component.scss']
})
export class RdsTopNavigationComponent extends MfeBaseComponent implements OnInit, DoCheck, OnChanges {
  // rdsProfileMfeConfig: ComponentLoaderOptions;

  public rdsNotoficationMfeConfig: ComponentLoaderOptions;
  showOffcanvas: boolean = false;
  @Input()
  LoginAttempts: any = {};
  @Input() LinkAccounts: []
  @Input() logo: string = '';
  @Input() projectName: string = '';
  @Input() sideMenuCollapsed: boolean = false;
  @Input() isPageWrapper: boolean = false;
  @Input() selectedMenu: string = 'Dashboard';
  @Input() backgroundColor: string = 'rgb(245, 245, 250)';
  @Input() selectedMenuDescription: string = 'Statics and reports';
  @Input() userList: any = [];
  @Input() languageItems = [];
  @Input() defaultLanguage: string = '';
  selectedLanguage: any = { language: '', icon: '' };
  @Input() notificationData = [];
  @Input() UserRole: string = 'Julie Mendoza';
  @Input() offCanvasId: string = ''
  @Input() profileLink: string = '';
  @Input() UserName: string = 'Wai Technologies';
  @Input() profilePic: string = 'https://cdn.dribbble.com/users/5534/screenshots/14230133/media/e2f853f8232acad78bf143c32f2f3a04.jpg';
  @Input() notificationLink: string = '';
  @Input() profileData: any;
  @Input() rdsDeligateTableData: any = [];
  @Input() unreadCount: number;
  @Output() deleteLinkaccount = new EventEmitter<any>();
  @Output() deleteDeligateuser = new EventEmitter<any>();
  @Output() linkUser = new EventEmitter<any>();
  @Output() redirection = new EventEmitter<any>();
  @Output() saveDeligate = new EventEmitter<any>();
  @Output() toggleEvent = new EventEmitter<boolean>();
  @Output() setAllRead = new EventEmitter<boolean>();
  @Output() onLoginAttemptsRefresh = new EventEmitter<any>();
  @Output() onLanguageSelection = new EventEmitter<any>();
  @Output() onDownloadLink = new EventEmitter<any>();
  navtabItems: any = [
    { label: 'Manage Linked Accounts', translationKey: 'Manage Linked Accounts', tablink: '#nav-LinkAccount', ariacontrols: 'nav-LinkAccount', Image: 'bi bi-pencil-fill', icon: 'manage_linked_accounts', subText: 'Manage accounts linked to your account', subtextTranslationKey: 'Manage accounts linked to your account' },
    { label: 'Manage Authority Delegation', translationKey: 'Manage Authority Delegation', tablink: '#nav-Deligation', ariacontrols: 'nav-Deligation', icon: 'manage_authority_delegations', subText: 'Manage authority accounts', subtextTranslationKey: 'Manage authority accounts' },
    { label: 'Login Attempts', translationKey: 'Login Attempts', tablink: '#nav-Attempts', ariacontrols: 'nav-Attempts', icon: 'login_attempts', subText: 'See recent login attempts for your account', subtextTranslationKey: 'See recent login attempts for your account' },
    { label: 'My Settings', translationKey: 'My Settings', tablink: '#nav-Settings', ariacontrols: 'nav-Settings', icon: 'my_settings', subText: 'Change your account settings', subtextTranslationKey: 'Change your account settings', },
    { label: 'Download Collected Data', translationKey: 'Download Collected Data', tablink: '#nav-DownLoad', ariacontrols: 'nav-DownLoad', icon: 'download_collected_data', subText: 'Download data belongs to your account', subtextTranslationKey: 'Download data belongs to your account' },
  ]
  userdata: any = {
    ProfileName: "Test",
    EmailAddress: "",
    UserName: this.UserName,
    CurrentPassword: "",
    NewPassword: "",
    ConFNewPassword: "",
  }

  rdsDeligateTableHeader: TableHeader[] = [
    { displayName: 'User name', dataLength: 30, dataType: 'text', key: 'username' },
    { displayName: 'Start time', dataType: 'date', sortable: false, key: 'startTime' },
    { displayName: 'End time', dataType: 'date', sortable: false, key: 'endTime' }];
  // rdsDeligateTableData: any = [];
  recordsPerpage: number = 5;

  pagination: boolean = true;
  tableWidth: string = '100%';
  tableStyle: string = 'light';

  @Input() linkedAccount: any = {
    TableHeader: [],
    tableData: []
  }
  listusename: any[] = [
    { value: 'Admin1', some: 'Admin', status: 'All', isSelected: false },
    { value: 'jack', some: 'jack1', status: 'jack1', isSelected: false },
    { value: 'John', some: 'John', status: 'John', isSelected: false },
    { value: 'Niel', some: 'Niel', status: 'Niel', isSelected: false },
  ]
  dounloadata: any[] = [
    { DateofData: '08/07/2022', NummberofDates: '5days ago', downloadUrl: 'assets/Group.jpg' },
    { DateofData: '08/07/2022', NummberofDates: '5days ago', downloadUrl: 'assets/DeleteIcon.jpg' },
    { DateofData: '08/07/2022', NummberofDates: '5days ago', downloadUrl: 'assets/Photp.jpeg' }
  ]
  openNotification: boolean;
  notifications: any = [
    {
      status: 'info',
      title: 'Your data is preparing now. Your data is preparing now.',
      time: '2 days ago',
      setAsRead: false,
    },
    {
      status: 'error',
      title: 'Your data is not prepared, try again.',
      time: '3 days ago',
      setAsRead: false,
    },
    {
      status: 'success',
      title: 'Your data is prepared, click here to ',
      url: 'https://www.google.co.in/',
      urlTitle: 'download.',
      time: '3 days ago',
      setAsRead: false,
    },
    {
      status: 'warn',
      title: 'Data downloading error, try again.',
      time: '3 days ago',
      setAsRead: false,
    },
    {
      status: 'info',
      title: 'Your data is preparing now.',
      time: '2 days ago',
      setAsRead: false,
    },
    {
      status: 'error',
      title: 'Your data is not prepared, try again.',
      time: '3 days ago',
      setAsRead: false,
    },
    {
      status: 'success',
      title: 'Your data is prepared, click here to ',
      url: 'https://www.google.co.in/',
      urlTitle: 'download.',
      time: '3 days ago',
      setAsRead: false,
    },
    {
      status: 'error',
      title: 'Your data is not prepared, try again.',
      time: '3 days ago',
      setAsRead: false,
    },
  ];
  notificationCount: any = 0;
  @Output() onProfileSave = new EventEmitter<any>();

  constructor(private router: Router, private injector: Injector,
    public translate: TranslateService
  ) {
    super(injector);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.defaultLanguage) {
      this.selectedLanguage = this.defaultLanguage;
    }
  }

  ngOnInit(): void {
    if (this.defaultLanguage) {
      this.selectedLanguage = this.defaultLanguage;
    }
    this.rdsNotoficationMfeConfig = {
      name: 'RdsNotification',
      input: {
        notification: this.notificationData,
        unreadCount: this.unreadCount
      },
      output: {
        setAllReadOutput: () => {
          console.log('we got the notificaiton set all');
          this.setAllRead.emit();
        }
      }
    };

    this.on('logout').subscribe(r => {
      this.emitEvent('logout-returns', {});
    })

    this.on('tenancyDataAgain').subscribe(res => {
      console.log(res);
      this.emitEvent('tenancyDataReturns', res);
    })
  }

  getCount(): any {
    if (this.notificationData) {
      return this.notificationData.filter((x => !x.setAsRead)).length
    } else {
      return 0;
    }
  }

  ngDoCheck(): void {
  }

  redirect(type: any) {
    this.redirection.emit(type);
  }

  openNotificationComp() {
    this.openNotification = !this.openNotification;
  }

  redirectToSettings() {
    this.router.navigateByUrl('/pages/settings');
  }
  deleteLink(event: any) {
    this.deleteLinkaccount.emit(event);
  }
  saveLinkUsers(event: any) {
    this.linkUser.emit(event);
  }
  viewOffcanvas(): void {
    this.showOffcanvas = true;
    var offcanvas = document.getElementById(this.offCanvasId);
    var bsOffcanvas = new bootstrap.Offcanvas(offcanvas);
    bsOffcanvas.show()
  }
  onLanguageSelect(lan: any): void {
    if (lan && lan.item) {
      this.selectedLanguage.language = lan.item.some;
      this.selectedLanguage.icon = lan.item.icon;
      this.onLanguageSelection.emit(lan.item.name)
    }
  }
  onToggleButton(): void {
    this.toggleEvent.emit();
  }

}