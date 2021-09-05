import * as firebase from "firebase"
import "firebase/firestore"
import { useQuery, useMutation } from "react-query"
import { COLLECTIONS } from "../../constants/collections"

// const process = async (load) => {
//     if (load.vaccine && load.child && load.age) {
//         const collectionref = firebase.firestore().collection(COLLECTIONS.CHILDREN);
//         const docref = await collectionref.doc(load.child.id)
//         console.log("LOAD -->", load.vaccine.name);
//         return docref.collection(`${load.age}_weeks`)
//             .doc(load.vaccine.name)
//             .set({
//                 due_on: firebase.firestore.Timestamp.now(),
//                 given_on: firebase.firestore.Timestamp.now(),
//                 vaccine: load.vaccine.id,
//                 brand: load.brand
//             })
//     } else return new Error("empty fields")
// }

const process = async (load) => {
    if (load.vaccine && load.child) {
        const collectionref = firebase.firestore().collection(COLLECTIONS.CHILDREN);
        const docref = await collectionref.doc(load.child.id)
        // console.log("LOAD -->", load.vaccine.name);
        return docref.collection(COLLECTIONS.VACCINATED_VAC)
            .doc(load.vaccine.s_no)
            .set({
                due_on: firebase.firestore.Timestamp.now(),
                given_on: load.givenOn ? firebase.firestore.Timestamp.fromDate(new Date(load.givenOn)) : "",
                vaccine: load.vaccine.id,
                brand: load.brand
            })
    } else return new Error("empty fields")
}

export const useAddVaccine = () => {
    return useMutation((load) => process(load))
}