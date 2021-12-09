import * as firebase from "firebase"
import "firebase/firestore"
import { useQuery, useMutation } from "react-query"
import { COLLECTIONS } from "../../constants/collections"

const process = async (uid) => {
    const collectionref = firebase.firestore().collection(COLLECTIONS.USERS)
    let docref = await collectionref.doc(uid).get();
    return docref.data();
}

export const useGetUserMutate = (uid) => {
    return useMutation((uid) => {
        return process(uid)
    })
}