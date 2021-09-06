import * as firebase from "firebase"
import "firebase/firestore"
import { useQuery, useMutation, useQueryClient } from "react-query"
import { COLLECTIONS } from "../../constants/collections"

const process = async load => {
    const collectionref = firebase.firestore().collection(COLLECTIONS.CHILDREN);
    const docref = await collectionref.doc(load.id)
    console.log("GOING TO ADD", load)
    return docref.collection(COLLECTIONS.VACCINATED_VAC)
        .doc(load.data.id.toString())
        .set({
            ...load.data
        })
}

export const useAddTableToDB = () => {
    const qc = useQueryClient();
    return useMutation(load => process(load), {
        onSuccess: () => {
            qc.invalidateQueries("useGetVaccinatedVaccines")
        }
    })
}