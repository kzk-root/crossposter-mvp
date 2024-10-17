import { createTypedHooks } from 'easy-peasy'
import { StoreModel } from './model'

const typedHooks = createTypedHooks<StoreModel>()

export const useTypedStoreActions = typedHooks.useStoreActions
export const useTypedStoreDispatch = typedHooks.useStoreDispatch
export const useTypedStoreState = typedHooks.useStoreState
