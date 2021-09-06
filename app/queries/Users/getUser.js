import * as firebase from "firebase"
import "firebase/firestore"
import { useQuery, useMutation } from "react-query"
import { COLLECTIONS } from "../../constants/collections"

const process = async (uid) => {
    const collectionref = firebase.firestore().collection(COLLECTIONS.USERS)
    return await collectionref.doc(uid).get();
}

export const useGetUser = (uid) => {
    return useQuery(["getUser", uid], () => process(uid))
}