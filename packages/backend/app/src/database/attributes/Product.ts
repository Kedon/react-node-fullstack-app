export interface Product {
    product_id?: number
    account_id?: number
    product_uuid?: string
    product_url_thumbnail?: string
    product_name: string
    product_description?: string
    product_price?: GLfloat | null,
    is_active: boolean
    deleted: boolean
    createdAt?: Date
    updatedAt?: Date
  }