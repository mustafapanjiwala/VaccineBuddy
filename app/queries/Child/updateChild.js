import * as firebase from "firebase";
import "firebase/firestore"
import { useQuery, useMutation } from "react-query"
import { COLLECTIONS } from "../../constants/collections"

const process = async (load) => {
    console.log("REACHED HERE")
    if (load.data) {
        console.log("UPDAING CHILD", load)
        const collectionref = firebase.firestore().collection(COLLECTIONS.CHILDREN);
        return collectionref.doc(load.id).update({ ...load.data })
    }
}

export const useUpdateChild = () => {
    return useMutation((load) => process(load))
}