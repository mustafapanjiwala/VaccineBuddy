import * as firebase from "firebase"
import "firebase/firestore"
import { useQuery, useMutation } from "react-query"
import { COLLECTIONS } from "../../constants/collections"

const process = async (id) => {
    const collectionref = firebase.firestore().collection(COLLECTIONS.CHILDREN);
    const doc = await collectionref.doc(id).get();
    console.log("FETCHING CHILD ID --->>", id)
    return doc.data();
}

export const useGetChildMutate = () => {
    return useMutation((id) => process(id))
}