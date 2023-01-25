import { useQuery, useMutation, useQueryClient } from 'react-query'
import axios from 'lib-client/axios'
import { Routes } from 'lib-client/constants'
import { UserRegistration } from 'types'

// Creation
const createUser = async (user: UserRegistration) => {
    const { data } = await axios.post(Routes.API.USER_REGISTRATION, user)
}

export const useUserRegistration = () => {
    const mutation = useMutation((user: UserRegistration) => createUser(user))
    return mutation
}