import * as firebase from "firebase";
import "firebase/firestore"
import { useMutation, useQuery } from "react-query";
import { COLLECTIONS } from "../../constants/collections"

const process = async (age) => {
    const collectionref = firebase.firestore().collection(COLLECTIONS.VACCINES);
    const vaccines = await collectionref.where('age', 'array-contains', `${age}`).get();
    return vaccines.docs.map(doc => {
        return { ...doc.data(), id: doc.id }
    });
}

export const useGetVaccines = (age) => {
    return useQuery(["getVaccines", age], () => process(age))
}