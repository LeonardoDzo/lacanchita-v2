import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Http, HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { CanDeactivateGuard } from './shared/guard/can-deactivate-guard.service';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { SweetAlert2Module } from '@toverux/ngsweetalert2';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: Http) {
    // for development
    // return new TranslateHttpLoader(http, '/start-angular/SB-Admin-BS4-Angular-4/master/dist/assets/i18n/', '.json');
    return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}
/*export const firebaseConfig = {
  apiKey: 'AIzaSyBSxsSnTSgo_NkWdSxzWxASplCh3GhClHg',
  authDomain: 'lacanchita-55caa.firebaseapp.com',
  databaseURL: 'https://lacanchita-55caa.firebaseio.com',
  projectId: 'lacanchita-55caa',
  storageBucket: 'lacanchita-55caa.appspot.com',
  messagingSenderId: '187709839691'
};*/
 export const firebaseConfig = {
     apiKey: "AIzaSyDgR2n2SOpn0p9ONbMb6u4ypdbwAdVfVFE",
    authDomain: "futcenter-2a726.firebaseapp.com",
    databaseURL: "https://futcenter-2a726.firebaseio.com",
    projectId: "futcenter-2a726",
    storageBucket: "futcenter-2a726.appspot.com",
    messagingSenderId: "504494714009"
  };

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        AppRoutingModule,
        ToastModule.forRoot(),
        SweetAlert2Module,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [Http]
            }
        })
    ],
    providers: [AuthGuard],
    bootstrap: [AppComponent]
})
export class AppModule {
}
