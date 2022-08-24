import { Component, Inject, Injector, Input, OnInit, SimpleChanges } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ComponentLoaderOptions, MfeBaseComponent, UserAuthService, UserDelegationServiceProxy } from '@libs/shared';
import { Store } from '@ngrx/store';
import { changePassword, getLanguages, getProfile, selectAllLanguages, selectDefaultLanguage, selectProfileInfo, setDefaultLanguageForUI } from '@libs/state-management';
import { deleteDelegations, getDelegations, getUsername, saveDelegations } from 'projects/libs/state-management/src/lib/state/authority-delegations/authority-delegations.action';
import { selectDelegationsInfo, selectUserFilter } from 'projects/libs/state-management/src/lib/state/authority-delegations/authority-delegations.selector';
import { selectAllLoginAttempts } from 'projects/libs/state-management/src/lib/state/login-attempts/login-attempts.selector';
import { DateTime } from 'luxon';
import { getLoginAttempts } from 'projects/libs/state-management/src/lib/state/login-attempts/login-attempts.actions';
import { deleteAccount, getMLATenancyData, getUserNotification, linkToUser, SetAllNotificationsAsRead } from 'projects/libs/state-management/src/lib/state/mla/mla.actions';
import { selectAllNotification, selectTenancyData } from 'projects/libs/state-management/src/lib/state/mla/mla.selector';
import { AlertService } from 'projects/libs/shared/src/lib/alert.service';
import { TranslateService } from '@ngx-translate/core';
import { ThemesService } from 'projects/libs/themes/src/public-api';
import { PrepareCollectedData } from 'projects/libs/state-management/src/lib/state/DownloadData/download-data.action';
import { DOCUMENT } from '@angular/common';
import { slideInAnimation } from '../animation';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    slideInAnimation   
  ],
})
export class SidenavComponent extends MfeBaseComponent implements OnInit {

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

  toggleSideNav: boolean = false;
  currentAlerts: any = [];
  selectedLanguage: any = { language: '', icon: '' };
  public rdsAlertMfeConfig: ComponentLoaderOptions = {
    name: 'RdsCompAlert',
    input: {
      currentAlerts: this.currentAlerts
    },
    output: {
      onAlertHide: (event: any) => {
        this.currentAlerts = event;
      }
    }
  }
  severity = [
    'info',
    'success',
    'warn',
    'error',
    'fatal'
  ]
  LoginAttempts: any = {
    TableHeader: [
      { displayName: 'IP Address', key: 'clientIpAddress', dataType: 'text', dataLength: 30, required: true },
      { displayName: 'Client', key: 'clientName', dataType: 'text', dataLength: 30, required: true },
      { displayName: 'Browser', key: 'browserInfo', dataType: 'text', dataLength: 30, required: true },
      { displayName: 'Date&Time', key: 'creationTime', dataType: 'text', dataLength: 30, required: true },
      { displayName: 'Result', key: 'result', dataType: 'text', dataLength: 30, required: true }],
    LoginDatatable: []
  }
  profileData: any;
  rdsDeligateTableData: any = [];
  usernameList: any = []
  sideMenuCollapsed: boolean = false;
  headerHeight: any = '110px';
  @Input() AccountLinkedTable: any = [];

  sidenavItemsOriginal: any = [
    { label: 'Home', labelTranslationKey: 'Home', id: '', permissionName: 'Pages.Administration.Host.Dashboard', icon: 'dashboard', path: '/pages/dashboard', descriptionTranslationKey: 'Home / Patient Records', description: 'Home / Patient Records' },
    { label: 'Dashboard', labelTranslationKey: 'Dashboard', id: '', permissionName: 'Pages.Tenant.Dashboard', icon: 'dashboard', path: '/pages/dashboard', description: 'Statistics and reports', descriptionTranslationKey: 'Statistics and reports' },
    { label: 'Patients ', labelTranslationKey: 'Patients', id: '', permissionName: 'Pages.Tenants', icon: 'tenant', path: '/pages/dashboard', description: 'Home / Patient Records', descriptionTranslationKey: 'Home / Patient Records' },
    { label: 'Surgeries', labelTranslationKey: 'Surgeries', id: '', permissionName: 'Pages.Editions', icon: 'edition', path: '/pages/edition', description: 'Home / Patient Records', descriptionTranslationKey: 'Home / Patient Records' },
    { label: 'Orders', labelTranslationKey: 'Orders', id: '', permissionName: 'Pages.Editions', icon: 'edition', path: '/pages/edition', description: 'Home / Patient Records', descriptionTranslationKey: 'Home / Patient Records' },
    // { label: 'Api Scopes', id: 'ApiScope', permissionName: '', icon: 'settings', path: '/pages/apiScope', description: 'Home > Identity Server > Api Scope' },

    {
      label: 'Administration', labelTranslationKey: 'Administration', id: 'admin', permissionName: '', icon: 'administration', path: '',
      children: [
        { label: 'Surgery Template', labelTranslationKey: 'Surgery Template', id: '', permissionName: 'Pages.Administration.OrganizationUnits', icon: 'organization_units', path: '/pages/organization-unit', description: 'Home / Patient Records', descriptionTranslationKey: 'Home / Patient Records' },
        { label: 'CPT Template', labelTranslationKey: 'CPT Template', id: '', permissionName: 'Pages.Administration.Roles', icon: 'roles', path: '/pages/role', description: 'Home / Patient Records', descriptionTranslationKey: 'Home / Patient Records' },
      ],
    },
    // { label: 'Demo UI Components', labelTranslationKey: 'Demo UI Components', id: '', permissionName: '', icon: 'demo_ui_components', path: '/pages/profile-settings', description: '', descriptionTranslationKey: '' },
    // { label: 'Cart', labelTranslationKey: 'Cart', id: 'cart', permissionName: '' ,icon: 'tenant', path: '/pages/cart', description: 'Manage your cart', descriptionTranslationKey: 'Manage your cart' },
  ];

  logo: string = 'https://www.carlogos.org/logo/Volkswagen-logo-2019-640x500.jpg';
  logoWithName: string = 'https://www.sydneydieselcentre.com.au/wp-content/uploads/2015/10/volkswagen-cars-logo-300x275.jpg';
  color: string = '#8d9ba9';
  backgroundColor: string = '#F5F5FA';
  collapsedHeaderHeight: any = '40px';
  profilePic: string = 'https://cdn.dribbble.com/users/5534/screenshots/14230133/media/e2f853f8232acad78bf143c32f2f3a04.jpg';
  offCanvasId: string = 'profileOffCanvas'
  collapseRequired: any = true;
  @Input() UserRole: string = 'Admin';
  @Input() UserName: string = 'Wai Technologies';
  selectedMenu: string = '';
  selectedMenuDescription: string = '';
  sub: Subscription
  rdsTopNavigationMfeConfig: ComponentLoaderOptions;
  accountPage = true;
  activePage: any;
  activesubmenu: any;
  languageItems: any = [];
  linkedAccount: any = {
    TableHeader: [{ displayName: 'User Name', key: 'username', dataType: 'text', dataLength: 30, required: true }],
    tableData: []
  }
  notifications: any[];
  unreadCount: number = 0;
  selectedMode: any;
  counter: number = 0;
  constructor(private router: Router,
    private store: Store,
    private alertService: AlertService,
    public translate: TranslateService,
    private injector: Injector,
    private userAuthService: UserAuthService,
    private theme: ThemesService,
    @Inject(DOCUMENT) private document: Document
  ) {
    super(injector);
  }

  ngAfterViewInit() {
  }
  getdata() {
    this.store.select(selectTenancyData).subscribe(res => console.log(res));
  }
  tenancyTableData = [];
  sidenavItems = [];

  ngOnInit(): void {

    this.store.dispatch(getLanguages());
    this.store.select(selectDefaultLanguage).subscribe((res: any) => {
      if (res) {
        this.translate.use(res);
        let htmlTag = this.document.getElementsByTagName('html')[0] as HTMLHtmlElement;
        if (htmlTag) {
          htmlTag.dir = res === 'ar' ? 'rtl' : 'ltr';
        }
        this.sidenavItems = this.translateMenu(this.sidenavItems);
      }
    })

    this.userAuthService.getPermissions().subscribe(res => {
      if(res){
        this.filterNavItems(this.sidenavItemsOriginal, res, this.sidenavItems);
      }
      else{
        let permissions = localStorage.getItem('storedPermission');
        if(permissions){
          permissions = JSON.parse(permissions);
          this.filterNavItems(this.sidenavItemsOriginal, permissions, this.sidenavItems);
        }
      }
    });
    this.subscribeToAlerts();
    this.rdsTopNavigationMfeConfig = {
      name: 'RdsTopNavigation',
      input: {
        backgroundColor: this.backgroundColor,
        selectedMenu: this.selectedMenu,
        selectedMenuDescription: this.selectedMenuDescription,
        LoginAttempts: this.LoginAttempts,
        isPageWrapper: true,
        profilePic: this.profilePic,
        profileData: this.profileData,
        rdsDeligateTableData: this.rdsDeligateTableData,
        offCanvasId: this.offCanvasId,
        logo: '',
        projectName: '',
        linkedAccounts: this.linkedAccount,
        userList: this.usernameList,
        notificationData: this.notifications,
        unreadCount: this.unreadCount
      },
      output: {
        toggleEvent: () => {
          var element = document.getElementById("sidebar");
          element.style.display = (element.style.display === 'none') ? 'block' : 'none'
        },
        onLanguageSelection: (lan) => {
          this.translate.use(lan);
          this.store.dispatch(setDefaultLanguageForUI(lan))

        },
        deleteDeligateuser: (data: any) => {
          if (data) {
            this.store.dispatch(deleteDelegations(data.id))
          }
        },
        saveDeligate: (data: any) => {
          if (data) {
            this.store.dispatch(saveDelegations(data))
          }
        },
        onProfileSave: (passwordInfo: any) => {
          if (passwordInfo) {
            this.store.dispatch(changePassword(passwordInfo));
          }
        },
        deleteLinkaccount: (data: any) => {
          this.store.dispatch(deleteAccount(data))

        },
        onDownloadLink: (data: any) => {
          this.store.dispatch(PrepareCollectedData());
        },
        onLoginAttemptsRefresh: (data: any) => {
          this.store.dispatch(getLoginAttempts(data));
          this.store.select(selectAllLoginAttempts).subscribe((res: any) => {
            if (res && res.items) {
              res.items.forEach((element: any) => {
                const item: any = {
                  browserInfo: element.browserInfo,
                  clientIpAddress: element.clientIpAddress,
                  clientName: element.clientName,
                  creationTime: element.creationTime,
                  result: element.result,
                  tenancyName: element.tenancyName,
                  userNameOrEmail: element.userNameOrEmail,
                }
                this.LoginAttempts.LoginDatatable.push(item);
              });
              const mfeConfig = this.rdsTopNavigationMfeConfig
              mfeConfig.input.LoginAttempts = { ... this.LoginAttempts };
              this.rdsTopNavigationMfeConfig = mfeConfig;
            }
          });
        },
        linkUser: (data: any) => {
          console.log(data);
          this.store.dispatch(linkToUser(data))

        },
        setAllRead: () => {
          this.store.dispatch(SetAllNotificationsAsRead());
        }
      }
    }

    this.store.dispatch(getUserNotification());

    this.store.select(selectAllNotification).subscribe((res: any) => {
      if (res && res.items && res.items.length) {
        this.unreadCount = res.unreadCount;
        this.notifications = [];
        res.items.forEach((element: any) => {
          this.notifications.push(this.format(element));
        });
        const mfeConfig = this.rdsTopNavigationMfeConfig;
        mfeConfig.input.notificationData = [...this.notifications];
        mfeConfig.input.unreadCount = this.unreadCount;
        this.rdsTopNavigationMfeConfig = mfeConfig;
      }
    });


    this.store.select(selectAllLanguages).subscribe((res: any) => {
      if (res && res.languages &&  res.languages.items && res.languages.items.length > 0 && res.status == "success") {
        this.languageItems = [];
        const languages: any = [];
        res.languages.items.forEach((item: any) => {
          let icon: string = item.icon.split(' ')[1];
          icon = icon.replace('-', '_')
          this.languageItems.push({ value: item.displayName, name: item.name, some: item.displayName, id: item.id, icon: icon, iconWidth: '21px', iconHeight: '14px' });
          if (res.defaultLanguageName === item.name) {
            this.selectedLanguage.language = item.displayName;
            this.selectedLanguage.icon = item.icon.split(' ')[1];
          }
          languages.push(item.name);
        });
        if (res.languages.defaultLanguageName) {
          this.store.dispatch(setDefaultLanguageForUI(res.defaultLanguageName))
          this.translate.use(res.defaultLanguageName);
        }

        // this.translate.addLangs(languages);
        const mfe = this.rdsTopNavigationMfeConfig;
        mfe.input.languageItems = [...this.languageItems];
        mfe.input.defaultLanguage = this.selectedLanguage;
        this.rdsTopNavigationMfeConfig = mfe;
      }
    })
    this.on('tenancyDataAgain').subscribe(res => {
    })
    if (this.router.url) {
      let matchRoute: any;
      const index = this.getMatchedRoute(this.sidenavItems);
      if (index !== -1) {
        this.activePage = index;
        this.selectedMenu = this.sidenavItems[index].label;
        this.selectedMenuDescription = this.sidenavItems[index].description;
      } else {
        this.sidenavItems.forEach((menu: any, i: number) => {
          if (menu.children && menu.children.length > 0) {
            const index = this.getMatchedRoute(menu.children);
            if (index !== -1) {
              this.activePage = i;
              this.activesubmenu = index;
              this.selectedMenu = menu.children[index].label;
              this.selectedMenuDescription = menu.children[index].description;
            }
          }
        })
      }
      this.rdsTopNavigationMfeConfig.input.selectedMenu = this.selectedMenu;
      this.rdsTopNavigationMfeConfig.input.selectedMenuDescription = this.selectedMenuDescription;
    }

    this.store.dispatch(getMLATenancyData());

    this.store.select(selectTenancyData).subscribe(res => {
      this.linkedAccount.tableData = [];
      if (res && res.items) {
        this.linkedAccount.tableData = res.items;
        const mfe = this.rdsTopNavigationMfeConfig;
        mfe.input.linkedAccount = { ...this.linkedAccount };
        this.rdsTopNavigationMfeConfig = mfe;

      }

    });
    this.sub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.accountPage = ["/login", "/forgot-password"].includes(event.url)
      }
    })
    if (this.sidenavItems && this.sidenavItems.length > 0) {
      if (this.sidenavItems[0].children && this.sidenavItems[0].children.length > 0) {
        this.selectedMenu = this.sidenavItems[0].children[0].label;
        this.selectedMenuDescription = this.sidenavItems[0].children[0].description;
      } else {
        this.selectedMenu = this.sidenavItems[0].label;
        this.selectedMenuDescription = this.sidenavItems[0].description;
      }
    }


    this.store.dispatch(getProfile());
    this.store.select(selectProfileInfo).subscribe((res: any) => {
      if (res) {
        this.profileData = res;
        const mfe = this.rdsTopNavigationMfeConfig;
        mfe.input.profileData = { ...this.profileData };
        this.rdsTopNavigationMfeConfig = mfe;
      }
    })
    this.store.dispatch(getDelegations());
    this.store.select(selectDelegationsInfo).subscribe((res: any) => {
      if (res && res.items && res.items.length) {
        res.items.forEach((element: any) => {
          const item: any = {
            username: element.username,
            startTime: element.startTime,
            endTime: element.endTime,
            id: element.id,
          };
          this.rdsDeligateTableData.push(item);
        });
        const mfeConfig = this.rdsTopNavigationMfeConfig;
        mfeConfig.input.rdsDeligateTableData = [...this.rdsDeligateTableData];
        this.rdsTopNavigationMfeConfig = mfeConfig;
      }

    });
    const UsernameFilter: any = {
      excludeCurrentUser: true,
      filter: '',
      maxResultCount: 10,
      skipCount: 0
    }
    this.store.dispatch(getUsername(UsernameFilter));
    this.store.select(selectUserFilter).subscribe((res: any) => {
      if (res && res.items && res.items.length) {
        res.items.forEach((element: any) => {
          const item: any = {
            value: element.value,
            displayText: element.name,
          };
          this.usernameList.push(item);
        });
        const mfeConfig = this.rdsTopNavigationMfeConfig;
        mfeConfig.input.userList = [...this.usernameList];
        this.rdsTopNavigationMfeConfig = mfeConfig;
      }
    })
    this.sub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.accountPage = ["/login", "/forgot-password"].includes(event.url)
      }
    })


    this.on('logout-returns').subscribe(r => {
      if (this.counter < 1) {
        this.userAuthService.unauthenticateUser();
        this.counter++;
      }

    })

  }
  ngOnChanges(changes: SimpleChanges): void {
    this.rdsTopNavigationMfeConfig.input.backgroundColor = this.backgroundColor;

  }
  redirectPath(event): void {
    this.rdsTopNavigationMfeConfig.input.selectedMenu = event.label=== 'Patients'?'Patients Records':event.label;
    this.rdsTopNavigationMfeConfig.input.selectedMenuDescription = event.description;
    this.router.navigate([event.path]);
  }
  redirect(event): void {
  }

  onCollapse(event): void {
    this.sideMenuCollapsed = event;
  }

  subscribeToAlerts() {
    this.alertService.alertEvents.subscribe((alert) => {
      this.currentAlerts = [];
      const currentAlert: any = {
        type: alert.type,
        title: alert.title,
        message: alert.message,
      };
      this.currentAlerts.push(currentAlert);
      const rdsAlertMfeConfig = this.rdsAlertMfeConfig;
      rdsAlertMfeConfig.input.currentAlerts = [...this.currentAlerts];
      this.rdsAlertMfeConfig = rdsAlertMfeConfig;
    });

  }
  getMatchedRoute(menus): number {
    return menus.findIndex((x: any) => x.path === this.router.url)
  }
  format(userNotification) {
    let formatted = {
      userNotificationId: userNotification.id,
      title: userNotification.notification.data.properties.Message,
      time: this.formatDate(userNotification.notification.creationTime, 'yyyy-LL-dd HH:mm:ss'),
      creationTime: userNotification.notification.creationTime as any,
      data: userNotification.notification.data,
      status: this.severity[userNotification.notification.severity],
      url: this.getUrl(userNotification),
      setAsRead: userNotification.state ? true : false
    };
    return formatted;
  }
  formatDate(date: DateTime | Date, format: string): string {
    if (date instanceof Date) {
      return this.formatDate(this.fromJSDate(date), format);
    }

    return date.toFormat(format);
  }
  fromJSDate(date: Date): DateTime {
    return DateTime.fromJSDate(date);
  }

  getUrl(userNotification): string {
    switch (userNotification.notification.notificationName) {
      case 'App.NewUserRegistered':
        return '/app/admin/users?filterText=' + userNotification.notification.data.properties.emailAddress;
      case 'App.NewTenantRegistered':
        return '/app/admin/tenants?filterText=' + userNotification.notification.data.properties.tenancyName;
      case 'App.GdprDataPrepared':
        return (

          '/File/DownloadBinaryFile?id=' +
          userNotification.notification.data.properties.binaryObjectId +
          '&contentType=application/zip&fileName=collectedData.zip'
        );
      case 'App.DownloadInvalidImportUsers':
        return (
          '/File/DownloadTempFile?fileToken=' +
          userNotification.notification.data.properties.fileToken +
          '&fileType=' +
          userNotification.notification.data.properties.fileType +
          '&fileName=' +
          userNotification.notification.data.properties.fileName
        );
      //Add your custom notification names to navigate to a URL when user clicks to a notification.
    }

    //No url for this notification
    return '';
  }

  public currentTheme(): string {
    return this.theme.current;
  }
  public selectTheme(value: string): void {
    this.theme.current = value;
  }
  set dark(enabled: boolean) {
    this.theme.theme = enabled ? 'dark' : null;
  }

  toggleBetweenMode(event: any) {
    let checked = event;
    if (!checked) {
      this.theme.theme = 'dark'
    }
    else {
      this.theme.theme = ''
    }
  }

  private filterNavItems(sidenavItemsOriginal, grantedPermissions: any, sidenavItems: any[]) {
    sidenavItemsOriginal.forEach(node => {
      if (grantedPermissions[node.permissionName] === "true" || node.permissionName == '') {
        let childrenValue = node.children ? [] : undefined;
        var item: any = {
          children: childrenValue,
          label: node.label,
          id: node.id,
          permissionName: node.permissionName,
          icon: node.icon,
          path: node.path,
          description: node.description,
          labelTranslationKey: node.labelTranslationKey
        }

        if (node.children != undefined) {
          this.filterNavItems(node.children, grantedPermissions, item.children);
        }
        sidenavItems.push(item);

      }
    });
  }

  public getSideNavItems(): any {
    this.sidenavItems = this.translateMenu(this.sidenavItems);
    return this.sidenavItems;
  }

  private translateMenu(sidenavItems): any {
    sidenavItems.forEach((menu: any) => {
      menu.label = this.translate.instant(menu.labelTranslationKey);
      if (menu.children && menu.children.length > 0) {
        this.translateMenu(menu.children);
      }
    })
    return sidenavItems
  }
}









