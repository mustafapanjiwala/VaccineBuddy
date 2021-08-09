import * as firebase from "firebase"
import "firebase/firestore"
import { useQuery, useMutation } from "react-query"
import { COLLECTIONS } from "../../constants/collections"

const process = async (load) => {
    if (load.child && load.age && load.child_vacc_id && load.data) {
        const collectionref = firebase.firestore().collection(COLLECTIONS.CHILDREN);
        const docref = await collectionref.doc(load.child.id)
        return docref.collection(`${load.age}_weeks`).doc(load.vaccine.code_name).update({
            ...load.data
        })
    } else return new Error("empty fields")
}

export const useUpdateVaccine = () => {
    return useMutation((load) => process(load))
}