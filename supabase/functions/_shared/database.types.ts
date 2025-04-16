
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      plans: {
        Row: {
          id: string
          name: string
          description: string
          price: number
          interval: 'MONTHLY' | 'YEARLY'
          features: string[]
          recommended: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          price: number
          interval: 'MONTHLY' | 'YEARLY'
          features: string[]
          recommended?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          price?: number
          interval?: 'MONTHLY' | 'YEARLY'
          features?: string[]
          recommended?: boolean
          updated_at?: string
        }
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          plan_id: string
          asaas_customer_id: string
          asaas_subscription_id: string
          status: string
          next_due_date: string
          value: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          plan_id: string
          asaas_customer_id: string
          asaas_subscription_id: string
          status: string
          next_due_date: string
          value: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          plan_id?: string
          asaas_customer_id?: string
          asaas_subscription_id?: string
          status?: string
          next_due_date?: string
          value?: number
          updated_at?: string
        }
      }
    }
  }
}
