import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import { map } from 'rxjs/operators';
/*
Generated class for the FirebaseServiceProvider provider.
See https://angular.io/guide/dependency-injection for more info on providers
and Angular DI.
*/
@Injectable()
export class FirebaseServiceProvider {
   
  constructor(public db: AngularFireDatabase) {
    
  }
  save(course: any) {
    this.db.list('courses')
      .push(course)
      .then(r => console.log(r));
  }
  getAll() {
    return this.db.list('courses').snapshotChanges().pipe(map (data =>{
      return data.map(d => ({ key: d.key, ...d.payload.val() }));
    }));
  }
  update(course) {
    return this.db.list('courses').update(course.key, course);
    }
    remove(course) {
      return this.db.list('courses') .remove(course.key);
      }
  
}
