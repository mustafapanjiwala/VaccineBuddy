import * as firebase from "firebase"
import "firebase/firestore"
import { useQuery, useMutation } from "react-query"
import { COLLECTIONS } from "../../constants/collections"
import { arrayUnion } from "firebase/firestore"

const process = async (load) => {
    const arrayUnion = firebase.firestore.FieldValue.arrayUnion;

    if (load.user && load.child) {
        const collectionref = firebase.firestore().collection(COLLECTIONS.CHILDREN);
        const docref = await collectionref.add({ ...load.child, images: [], lastVaccinated: "" })
        if (docref.id) {
            return firebase.firestore().collection(COLLECTIONS.USERS).doc(load.user.id).get().then(res => {
                const data = res.data();
                console.log("DATA IN ADD CHILD", data)
                if (data.children) return firebase.firestore().collection(COLLECTIONS.USERS).doc(load.user.id).set({
                    ...data,
                    children: [...data.children, docref.id]
                })
                else return firebase.firestore().collection(COLLECTIONS.USERS).doc(load.user.id).set({
                    ...data,
                    children: [docref.id]
                })
            })
        }
        return new Error("Failed to add child to database")
    }
}

export const useAddChild = () => {
    return useMutation((load) => process(load))
}