import { firebase } from '../../firebase';

export const addCollectionsAndDocs = async (collectionKey, objectsToAdd) => {
  const collectionRef = firebase.firestore().collection(collectionKey);
  //  console.log(collectionRef);
  //create a firestore batch
  const batch = firebase.firestore().batch();
  //  console.log(" objectsToAdd =....", objectsToAdd);
  objectsToAdd.forEach((obj) => {
    //get document reference at specified path
    const newDocRef = collectionRef.doc();
    //batch the document reference value
    batch.set(newDocRef, obj);
    //    console.log(newDocRef);
  });
  //fire batch request
  await batch.commit();
};
