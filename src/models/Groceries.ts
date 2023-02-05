import { FontawesomeObject } from "@fortawesome/fontawesome-svg-core"

export type Category = {
    name: string
}

export type Product = {
    id: number,
    name: string,
    category: string,
    quantity: number
}
