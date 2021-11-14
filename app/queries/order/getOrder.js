import * as firebase from "firebase"
import "firebase/firestore"
import { useQuery, useMutation } from "react-query"
import { COLLECTIONS } from "../../constants/collections"

const process = async () => {
    const collectionref = firebase.firestore().collection(COLLECTIONS.TABLE)
    const doc = await collectionref.doc('order').get();
    return doc.data();
}

export const useGetOrder = () => {
    return useQuery(["getOrder"], () => process())
}