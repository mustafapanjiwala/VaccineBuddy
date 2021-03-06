import * as firebase from "firebase";
import "firebase/firestore"
import { useMutation, useQuery } from "react-query";
import { COLLECTIONS } from "../../constants/collections"

const process = async (load) => {
    if (load.child) {
        return new Promise(async (resolve, reject) => {
            const collectionref = firebase.firestore().collection(COLLECTIONS.CHILDREN);
            const mainCollectionref = await collectionref.doc(load.child.id).collection(COLLECTIONS.VACCINATED_VAC).get()
            const sorted_data = mainCollectionref.docs.map(doc => ({ ...doc.data(), id: doc.id })).sort((a, b) => {
                if (parseInt(a.id) < parseInt(b.id)) return -1
                if (parseInt(a.id) > parseInt(b.id)) return 1
                return 0;
            })
            resolve(sorted_data)
        })
    } return new Error("empty fields")
}

// export const useGetVaccinatedVaccines = (load) => {
//     return useQuery(["useGetVaccinatedVaccines"], () => process(load))
// }

export const useGetVaccinatedVaccines = load => {
    return useMutation((load) => process(load))
}