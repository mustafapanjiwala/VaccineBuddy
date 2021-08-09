import "firebase/firestore"
import { useQuery, useMutation } from "react-query"
import { COLLECTIONS } from "../../constants/collections"

const process = async (load) => {
    if (load.users) {
        const collectionref = firebase.firestore().collection(COLLECTIONS.USERS);
        return collectionref.add(load.user)
    }
}

export const useAddChild = () => {
    return useMutation((load) => process(load))
}