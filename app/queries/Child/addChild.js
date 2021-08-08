import * as firebase from "firebase"
import "firebase/firestore"
import { useQuery, useMutation } from "react-query"
import { COLLECTIONS } from "../../constants/collections"

const process = async (load) => {
    if (load.user && load.child) {
        const collectionref = firebase.firestore().collection(COLLECTIONS.CHILDREN);
        const docref = await collectionref.add(load.child)
        if (docref.id) {
            return firebase.firestore().collection(COLLECTIONS.USERS).doc(load.user.id).update({
                children: firebase.firestore.FieldValue.arrayUnion(docref.id)
            })
        }
        return new Error("Failed to add child to database")
    }
}

export const useAddChild = () => {
    return useMutation((load) => process(load))
}