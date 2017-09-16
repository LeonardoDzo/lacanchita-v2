import { Component, ViewContainerRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastsManager } from 'ng2-toastr';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    private viewContainerRef: ViewContainerRef;
    constructor(private translate: TranslateService) {
        translate.addLangs(['en', 'fr', 'ur', 'es']);
        translate.setDefaultLang('en');
        const browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/en|fr|ur|es/) ? browserLang : 'en');
    }
}
