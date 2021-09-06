import * as firebase from "firebase";
import "firebase/firestore"
import { useQuery, useMutation } from "react-query"
import { COLLECTIONS } from "../../constants/collections"

const process = async (load) => {
    if (load.userData) {
        const collectionref = firebase.firestore().collection(COLLECTIONS.USERS);
        return collectionref.doc(load.uid).update({ ...load.userData })
    }
}

export const useUpdateUser = () => {
    return useMutation((load) => process(load))
}