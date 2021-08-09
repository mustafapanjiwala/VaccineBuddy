import * as firebase from "firebase"
import "firebase/firestore"
import { useQuery, useMutation } from "react-query"
import { COLLECTIONS } from "../../constants/collections"

// const process = async (load) => {
//     if (load.child && load.age && load.child) {
//         const collectionref = firebase.firestore().collection(COLLECTIONS.CHILDREN);
//         const docref = await collectionref.doc(load.child.id)
//         return docref.collection(`${load.age}_weeks`).doc(load.vaccine.name).delete()
//     } return new Error("empty fields")
// }

const process = async (load) => {
    if (load.child && load.child) {
        const collectionref = firebase.firestore().collection(COLLECTIONS.CHILDREN);
        const docref = await collectionref.doc(load.child.id)
        return docref.collection(COLLECTIONS.VACCINATED_VAC).doc(load.vaccine.s_no).delete()
    } return new Error("empty fields")
}

export const useRemoveVaccine = () => {
    return useMutation((load) => process(load))
}