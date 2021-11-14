import * as firebase from "firebase";
import "firebase/firestore"
import { useMutation, useQuery } from "react-query";
import { COLLECTIONS } from "../../constants/collections"

const process = async () => {
    const collectionref = firebase.firestore().collection(COLLECTIONS.VACCINES);
    const vaccines = await collectionref.get();
    const sorted_data = vaccines.docs.map(doc => ({ ...doc.data(), id: doc.id })).filter(d => d.s_no).sort((a, b) => {
        if (parseInt(a.s_no) < parseInt(b.s_no)) return -1
        if (parseInt(a.s_no) > parseInt(b.s_no)) return 1
        return 0;
    })
    return sorted_data;
}

export const useGetAllvaccines = () => {
    return useQuery(["getAllVaccines"], () => process())
}