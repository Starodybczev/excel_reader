 import {ROUTES} from "../../components/route/routes.config"
 
export const getRoute = {
    home: () => ROUTES.HOME,
    create: () => ROUTES.CREATE_TABLE,
    select: () => ROUTES.SELECT,
    current_created_table: (id: string) => ROUTES.CREATE_FILE.replace(":id", id),
    current_table: (id: string) => ROUTES.SELECT_FILE.replace(":id", id)
}