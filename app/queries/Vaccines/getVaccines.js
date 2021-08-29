import * as firebase from "firebase";
import "firebase/firestore"
import { useMutation, useQuery } from "react-query";
import { COLLECTIONS } from "../../constants/collections"

const process = async () => {
    const collectionref = firebase.firestore().collection(COLLECTIONS.VACCINES);
    const vaccines = await collectionref.get();
    return vaccines.docs.map(doc => {
        return { ...doc.data(), id: doc.id }
    });
}

export const useGetAllvaccines = () => {
    return useQuery(["getAllVaccines"], () => process())
}