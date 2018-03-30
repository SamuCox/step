import { Injectable } from '@angular/core';
import { AuthProvider } from '../../providers/auth/auth';
import { Health } from '@ionic-native/health';
import { AngularFireDatabase, AngularFireList, AngularFireAction, AngularFireObject, DatabaseSnapshot } from 'angularfire2/database';

/*
  Generated class for the DatabaseHelperProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseHelperProvider {

	messagePrefix: string;

  constructor(public authProvider: AuthProvider, public afDatabase: AngularFireDatabase, public health: Health) {
    this.messagePrefix = `/profile/${authProvider.currentUID()}/messages/`
    console.log("health... "+ health);
  }

	//this.itemRef.set({ name: newName });
  save(path: string, field: any) {
  	var ref = this.afDatabase.object(path);
  	ref.set(field);
  }

  update(path: string, field: any) {
  	var ref = this.afDatabase.object(path);
  	ref.update(field);
  }

  updateMessage(path: string, field: any) {
  	var ref = this.afDatabase.object(this.messagePrefix + path);
  	ref.update(field);
  }

  delete(path: string) {
  	var ref = this.afDatabase.object(path);
  	ref.remove();
  }

  append(path: string, value: any) {
  	var ref = this.afDatabase.list(path);
  }

}
