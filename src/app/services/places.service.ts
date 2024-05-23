import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import Place from '../interfaces/place.interfaces';
import { collection, addDoc } from 'firebase/firestore';
@Injectable({
  providedIn: 'root'
})
export class PlacesService {
// cosas que necesitadmos
  constructor(private firestore: Firestore) { }

  // acciones

  addPlace(place: Place) {
    const placeRef = collection(this.firestore, 'place');
    return addDoc(placeRef, place);
  }

  

}
