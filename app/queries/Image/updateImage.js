import * as firebase from "firebase"
import "firebase/storage"
import "firebase/firestore"
import { v4 as uuidv4 } from "uuid";

export const updateImage = async (uri, url) => {
    return new Promise((res, rej) => {
        deleteImage(url).then(() => {
            uploadImage(uri).then(uploadedURL => {
                console.log("URL ", uploadedURL)
                res(uploadedURL)
            }).catch(err => {
                console.error("updateImage updateImag.js : ", err)
                // rej("Failed to Update Image")
                res("")
            })
        }).catch(err => {
            console.error("updateImage updateImage.js: ", err)
            rej("Failed to Update Image")
        })
    })
}

const deleteImage = async uri => {
    const urlArr = uri.split("/")[7].split("?")[0].split("%2F");
    const ref = firebase.storage().ref().child(`${urlArr[0]}`)
    return await ref.delete()
}

export const uploadImage = async uri => {
    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            resolve(xhr.response);
        };
        xhr.onerror = function (e) {
            console.log(e);
            reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
    });

    const ref = firebase.storage().ref().child(uuidv4());
    const snapshot = await ref.put(blob);

    // We're done with the blob, close and release it
    blob.close();

    return await snapshot.ref.getDownloadURL();
}

export const UploadImage = async uri => {
    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            resolve(xhr.response);
        };
        xhr.onerror = function (e) {
            console.log(e);
            reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
    });

    const ref = firebase.storage().ref().child(uuidv4());
    const snapshot = await ref.put(blob);

    // We're done with the blob, close and release it
    blob.close();

    return await snapshot.ref.getDownloadURL();
}