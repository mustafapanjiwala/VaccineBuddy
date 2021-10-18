import * as firebase from "firebase"
import "firebase/firestore"
import { useQuery, useMutation, useQueryClient } from "react-query"
import { COLLECTIONS } from "../../constants/collections"
import moment from "moment"

const process = async load => {
    const collectionref = firebase.firestore().collection(COLLECTIONS.CHILDREN);
    const docref = await collectionref.doc(load.id)
    // console.log("HEREEEE ", load.child.lastVaccinated, load.data.givenOn, moment(load.child.lastVaccinated, "DD/MM/YYYY").format("DD/MM/YYYY") < load.data.givenOn)
    if (moment(load.child.lastVaccinated, "DD/MM/YYYY").format("DD/MM/YYYY") < load.data.givenOn) {
        const collectionref = firebase.firestore().collection(COLLECTIONS.CHILDREN);
        return collectionref.doc(load.child.id).update({ lastVaccinated: load.data.givenOn })
    }
    return await docref.collection(COLLECTIONS.VACCINATED_VAC)
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