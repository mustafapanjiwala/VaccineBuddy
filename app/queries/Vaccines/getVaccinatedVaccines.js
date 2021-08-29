import * as firebase from "firebase";
import "firebase/firestore"
import { useMutation, useQuery } from "react-query";
import { COLLECTIONS } from "../../constants/collections"

// const process = async (load) => {
//     if (load.child && load.age) {
//         const collectionref = firebase.firestore().collection(COLLECTIONS.CHILDREN);
//         const mainCollectionref = await collectionref.doc(load.child.id).collection(`${load.age}_weeks`).get()
//         return mainCollectionref.docs.map(doc => ({ ...doc.data(), id: doc.id }))
//     } return new Error("empty fields")
// }

const process = async (load) => {
    console.log("LOAD", load)
    if (load.child) {
        const collectionref = firebase.firestore().collection(COLLECTIONS.CHILDREN);
        const mainCollectionref = await collectionref.doc(load.child.id).collection(COLLECTIONS.VACCINATED_VAC).get()
        const sorted_data = mainCollectionref.docs.map(doc => ({ ...doc.data(), due_on: doc.data().due_on.toDate(), given_on: doc.data().given_on.toDate(), id: doc.id })).sort((a, b) => {
            if (a < b) return -1
            if (a > b) return 1
            return 0;
        })
        return sorted_data
    } return new Error("empty fields")
}

export const useGetVaccinatedVaccines = (load) => {
    return useQuery(["useGetVaccinatedVaccines"], () => process(load))
}