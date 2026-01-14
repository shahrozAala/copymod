export interface ApiResponse<T> {
  data: T
  meta?: {
    page?: number
    total?: number
    limit?: number
  }
}

export interface ApiError {
  code: string
  message: string
  details?: unknown[]
}

export type Nullable<T> = T | null
export type Optional<T> = T | undefined

export interface BaseProps {
  className?: string
  children?: React.ReactNode
}

export interface WithChildren {
  children: React.ReactNode
}
