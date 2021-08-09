import * as firebase from "firebase"
import "firebase/firestore"
import { useQuery, useMutation } from "react-query"
import { COLLECTIONS } from "../../constants/collections"

const process = async (uid) => {
    const collectionref = firebase.firestore().collection(COLLECTIONS.USERS)
    const doc = await collectionref.doc(uid).get();
    return ({ ...doc.data(), id: doc.id })
}

export const useGetUser = (uid) => {
    return useQuery(["getUser", uid], () => process(uid))
}