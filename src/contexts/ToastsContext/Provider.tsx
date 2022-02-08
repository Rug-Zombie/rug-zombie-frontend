import React, { createContext, ReactNode, useCallback, useState } from 'react'
import { kebabCase } from 'lodash'
import { ToastContextApi } from './types'
import { Toast } from '../../components/Toast'
import {types} from '../../components/Toast/types'

export const ToastsContext = createContext<ToastContextApi>(undefined)


export const ToastsProvider: React.FC = ({ children }) => {
  const [toasts, setToasts] = useState<ToastContextApi['toasts']>([])

  const toast = useCallback(
    ({ title, description, type }: Omit<Toast, 'id'>) => {
      setToasts((prevToasts) => {
        const id = kebabCase(title)

        // Remove any existing toasts with the same id
        const currentToasts = prevToasts.filter((prevToast) => prevToast.id !== id)

        return [
          {
            id,
            title,
            description,
            type,
          },
          ...currentToasts,
        ]
      })
    },
    [setToasts],
  )

  const toastError = (title: string, description?: ReactNode) => {
    return toast({ title, description, type: types.DANGER })
  }
  const toastInfo = (title: string, description?: ReactNode) => {
    return toast({ title, description, type: types.INFO })
  }
  const toastGraves = (title: string, description?: ReactNode) => {
    return toast({ title, description, type: types.GRAVES })
  }
  const toastTombs = (title: string, description?: ReactNode) => {
    return toast({ title, description, type: types.TOMBS })
  }
  const toastDefault = (title: string, description?: ReactNode) => {
    return toast({ title, description, type: types.DEFAULT })
  }
  const toastWarning = (title: string, description?: ReactNode) => {
    return toast({ title, description, type: types.WARNING })
  }
  const clear = () => setToasts([])
  const remove = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((prevToast) => prevToast.id !== id))
  }

  return (
    <ToastsContext.Provider value={{ toasts, clear, remove, toastError, toastInfo, toastDefault, toastGraves, toastTombs, toastWarning }}>
      {children}
    </ToastsContext.Provider>
  )
}
