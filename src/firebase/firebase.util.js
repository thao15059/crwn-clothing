import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBYWp_2L5WiXAbjwsZouS5uaT4FDWYwmlE",
  authDomain: "thao-crwn-clothing.firebaseapp.com",
  projectId: "thao-crwn-clothing",
  storageBucket: "thao-crwn-clothing.appspot.com",
  messagingSenderId: "877881596667",
  appId: "1:877881596667:web:27c23deae075586819ee5e",
  measurementId: "G-TVKJFKSZCB",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  // get ref obj from firebase
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  // check ref obj exist in firebase
  const userSnapShot = await userRef.get();

  // not exist
  if (!userSnapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      // create new user
      await userRef.set({ displayName, email, createdAt, ...additionalData });
    } catch (error) {
      console.log(error.message);
    }
  }

  return userRef;
};

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectsToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });

  // transformedCollection =
  //   [
  //     {
  //         "routeName": "jackets",
  //         "id": "4rNmjqJPXGJ8ekUoT5w4",
  //         "title": "Jackets",
  //         "items": [
  //             {
  //                 "imageUrl": "https://i.ibb.co/XzcwL5s/black-shearling.png",
  //                 "name": "Black Jean Shearling",
  //                 "price": 125,
  //                 "id": 18
  //             },
  //             {
  //                 "price": 90,
  //                 "id": 19,
  //                 "imageUrl": "https://i.ibb.co/mJS6vz0/blue-jean-jacket.png",
  //                 "name": "Blue Jean Jacket"
  //             },
  //             {
  //                 "id": 20,
  //                 "name": "Grey Jean Jacket",
  //                 "imageUrl": "https://i.ibb.co/N71k1ML/grey-jean-jacket.png",
  //                 "price": 90
  //             },
  //             {
  //                 "price": 165,
  //                 "id": 21,
  //                 "imageUrl": "https://i.ibb.co/s96FpdP/brown-shearling.png",
  //                 "name": "Brown Shearling"
  //             },
  //             {
  //                 "price": 185,
  //                 "imageUrl": "https://i.ibb.co/M6hHc3F/brown-trench.png",
  //                 "name": "Tan Trench",
  //                 "id": 22
  //             }
  //         ]
  //     },
  //     {
  //         "routeName": "womens",
  //         "id": "8dWEpkpIOMUvZjqc56k1",
  //         "title": "Womens",
  //         "items": [
  //             {
  //                 "imageUrl": "https://i.ibb.co/7CQVJNm/blue-tank.png",
  //                 "id": 23,
  //                 "price": 25,
  //                 "name": "Blue Tanktop"
  //             },
  //             {
  //                 "name": "Floral Blouse",
  //                 "price": 20,
  //                 "imageUrl": "https://i.ibb.co/4W2DGKm/floral-blouse.png",
  //                 "id": 24
  //             },
  //             {
  //                 "imageUrl": "https://i.ibb.co/KV18Ysr/floral-skirt.png",
  //                 "id": 25,
  //                 "price": 80,
  //                 "name": "Floral Dress"
  //             },
  //             {
  //                 "name": "Red Dots Dress",
  //                 "imageUrl": "https://i.ibb.co/N3BN1bh/red-polka-dot-dress.png",
  //                 "id": 26,
  //                 "price": 80
  //             },
  //             {
  //                 "imageUrl": "https://i.ibb.co/KmSkMbH/striped-sweater.png",
  //                 "id": 27,
  //                 "name": "Striped Sweater",
  //                 "price": 45
  //             },
  //             {
  //                 "name": "Yellow Track Suit",
  //                 "imageUrl": "https://i.ibb.co/v1cvwNf/yellow-track-suit.png",
  //                 "id": 28,
  //                 "price": 135
  //             },
  //             {
  //                 "name": "White Blouse",
  //                 "price": 20,
  //                 "id": 29,
  //                 "imageUrl": "https://i.ibb.co/qBcrsJg/white-vest.png"
  //             }
  //         ]
  //     },
  //     {
  //         "routeName": "sneakers",
  //         "id": "ZIhdcbWzINBtaRmh3vQj",
  //         "title": "Sneakers",
  //         "items": [
  //             {
  //                 "imageUrl": "https://i.ibb.co/0s3pdnc/adidas-nmd.png",
  //                 "id": 10,
  //                 "name": "Adidas NMD",
  //                 "price": 220
  //             },
  //             {
  //                 "price": 280,
  //                 "id": 11,
  //                 "name": "Adidas Yeezy",
  //                 "imageUrl": "https://i.ibb.co/dJbG1cT/yeezy.png"
  //             },
  //             {
  //                 "imageUrl": "https://i.ibb.co/bPmVXyP/black-converse.png",
  //                 "id": 12,
  //                 "name": "Black Converse",
  //                 "price": 110
  //             },
  //             {
  //                 "id": 13,
  //                 "imageUrl": "https://i.ibb.co/1RcFPk0/white-nike-high-tops.png",
  //                 "price": 160,
  //                 "name": "Nike White AirForce"
  //             },
  //             {
  //                 "price": 160,
  //                 "id": 14,
  //                 "imageUrl": "https://i.ibb.co/QcvzydB/nikes-red.png",
  //                 "name": "Nike Red High Tops"
  //             },
  //             {
  //                 "imageUrl": "https://i.ibb.co/fMTV342/nike-brown.png",
  //                 "id": 15,
  //                 "name": "Nike Brown High Tops",
  //                 "price": 160
  //             },
  //             {
  //                 "id": 16,
  //                 "imageUrl": "https://i.ibb.co/w4k6Ws9/nike-funky.png",
  //                 "name": "Air Jordan Limited",
  //                 "price": 190
  //             },
  //             {
  //                 "id": 17,
  //                 "name": "Timberlands",
  //                 "imageUrl": "https://i.ibb.co/Mhh6wBg/timberlands.png",
  //                 "price": 200
  //             }
  //         ]
  //     },
  //     {
  //         "routeName": "mens",
  //         "id": "g3VMryNDXkIH3OmTPZ7q",
  //         "title": "Mens",
  //         "items": [
  //             {
  //                 "id": 30,
  //                 "name": "Camo Down Vest",
  //                 "price": 325,
  //                 "imageUrl": "https://i.ibb.co/xJS0T3Y/camo-vest.png"
  //             },
  //             {
  //                 "imageUrl": "https://i.ibb.co/qMQ75QZ/floral-shirt.png",
  //                 "name": "Floral T-shirt",
  //                 "id": 31,
  //                 "price": 20
  //             },
  //             {
  //                 "price": 25,
  //                 "name": "Black & White Longsleeve",
  //                 "id": 32,
  //                 "imageUrl": "https://i.ibb.co/55z32tw/long-sleeve.png"
  //             },
  //             {
  //                 "imageUrl": "https://i.ibb.co/RvwnBL8/pink-shirt.png",
  //                 "price": 25,
  //                 "name": "Pink T-shirt",
  //                 "id": 33
  //             },
  //             {
  //                 "name": "Jean Long Sleeve",
  //                 "id": 34,
  //                 "price": 40,
  //                 "imageUrl": "https://i.ibb.co/VpW4x5t/roll-up-jean-shirt.png"
  //             },
  //             {
  //                 "imageUrl": "https://i.ibb.co/mh3VM1f/polka-dot-shirt.png",
  //                 "price": 25,
  //                 "name": "Burgundy T-shirt",
  //                 "id": 35
  //             }
  //         ]
  //     },
  //     {
  //         "routeName": "hats",
  //         "id": "n09n1z8mcJC2et144pqc",
  //         "title": "Hats",
  //         "items": [
  //             {
  //                 "price": 25,
  //                 "name": "Brown Brim",
  //                 "imageUrl": "https://i.ibb.co/ZYW3VTp/brown-brim.png",
  //                 "id": 1
  //             },
  //             {
  //                 "name": "Blue Beanie",
  //                 "id": 2,
  //                 "imageUrl": "https://i.ibb.co/ypkgK0X/blue-beanie.png",
  //                 "price": 18
  //             },
  //             {
  //                 "id": 3,
  //                 "imageUrl": "https://i.ibb.co/QdJwgmp/brown-cowboy.png",
  //                 "name": "Brown Cowboy",
  //                 "price": 35
  //             },
  //             {
  //                 "imageUrl": "https://i.ibb.co/RjBLWxB/grey-brim.png",
  //                 "name": "Grey Brim",
  //                 "id": 4,
  //                 "price": 25
  //             },
  //             {
  //                 "name": "Green Beanie",
  //                 "id": 5,
  //                 "imageUrl": "https://i.ibb.co/YTjW3vF/green-beanie.png",
  //                 "price": 18
  //             },
  //             {
  //                 "name": "Palm Tree Cap",
  //                 "imageUrl": "https://i.ibb.co/rKBDvJX/palm-tree-cap.png",
  //                 "id": 6,
  //                 "price": 14
  //             },
  //             {
  //                 "id": 7,
  //                 "imageUrl": "https://i.ibb.co/bLB646Z/red-beanie.png",
  //                 "name": "Red Beanie",
  //                 "price": 18
  //             },
  //             {
  //                 "name": "Wolf Cap",
  //                 "price": 14,
  //                 "id": 8,
  //                 "imageUrl": "https://i.ibb.co/1f2nWMM/wolf-cap.png"
  //             },
  //             {
  //                 "imageUrl": "https://i.ibb.co/X2VJP2W/blue-snapback.png",
  //                 "price": 16,
  //                 "name": "Blue Snapback",
  //                 "id": 9
  //             }
  //         ]
  //     }
  // ]

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
