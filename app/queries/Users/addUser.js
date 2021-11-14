import * as firebase from "firebase";
import "firebase/firestore"
import { useQuery, useMutation } from "react-query"
import { COLLECTIONS } from "../../constants/collections"

const process = async (load) => {
    if (load.userData) {
        console.log("IN QUERY LOAD.UID ---> ", load)
        const collectionref = firebase.firestore().collection(COLLECTIONS.USERS);
        return collectionref.doc(load.uid).set({
            mothersName: load.userData.mothersName ?? '',
            fathersName: load.userData.fathersName ?? '',
            address: load.userData.address ?? '',
            city: load.userData.city ?? '',
            state: load.userData.state ?? ''
        })
    }
}

export const useAddUser = () => {
    return useMutation((load) => process(load))
}