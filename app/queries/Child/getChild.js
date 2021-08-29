import * as firebase from "firebase"
import "firebase/firestore"
import { useQuery, useMutation } from "react-query"
import { COLLECTIONS } from "../../constants/collections"

const process = async (id) => {
    const collectionref = firebase.firestore().collection(COLLECTIONS.CHILDREN);
    const doc = await collectionref.doc(id).get();
    console.log("IN QUERY", doc.data())
    return { ...doc.data(), id: doc.id, dob: doc.data()?.dob?.toDate(), last_vaccinated: doc.data()?.last_vaccinated?.toDate() }

}

export const useGetChild = (id) => {
    return useQuery(["getChild", id], () => process(id))
}