import * as firebase from "firebase"
import "firebase/firestore"
import { useQuery, useMutation } from "react-query"
import { COLLECTIONS } from "../../constants/collections"

const process = async (load) => {
    if (load.vaccine && load.child) {
        const collectionref = firebase.firestore().collection(COLLECTIONS.CHILDREN);
        const docref = await collectionref.doc(load.child.id)
        if (docref.exists) return docref.collection(COLLECTIONS.VACCINATED_VAC)
            .doc(load.vaccine.s_no)
            .update({
                givenOn: load.givenOn ?? "",
                vaccine: load.vaccine.id,
                brand: load.brand
            })
        else return docref.collection(COLLECTIONS.VACCINATED_VAC)
            .doc(load.vaccine.s_no)
            .set({
                givenOn: load.givenOn ?? "",
                vaccine: load.vaccine.id,
                brand: load.brand
            })
    } else return new Error("empty fields")
}

export const useAddVaccine = () => {
    return useMutation((load) => process(load))
}