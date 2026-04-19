 import {ROUTES} from "../../components/route/routes.config"
 
export const getRoute = {
    home: () => ROUTES.HOME,
    current_table: (id: string) => ROUTES.TABLE_ID.replace(":id", id)
}