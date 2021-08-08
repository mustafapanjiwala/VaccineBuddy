import * as firebase from "firebase"
import "firebase/firestore"
import { useQuery, useMutation } from "react-query"
import { COLLECTIONS } from "../../constants/collections"

const process = async (uid) => {
    const collectionref = firebase.firestore().collection(COLLECTIONS.USERS)
    const doc = await collectionref.doc(uid).get();
    return doc.data();
}

export const useGetUserMutate = (uid) => {
    return useMutation((uid) => {
        return process(uid)
    })
}