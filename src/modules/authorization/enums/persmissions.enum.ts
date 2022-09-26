import { EPermissionsTasks } from "@modules/task/enums/permissions-tasks.enum"
import { EPermissionsUsers } from "@modules/user/enums/permissions-users.enum"
import { EPermissionsAuthorizations } from "@modules/authorization/enums/permissions-authorization.enum"
import { EPermissionsAnalytic } from "@modules/analytic/enums/permissions-analytic.enum"
import { EPermissionsEstablishment } from "@modules/establishment/enums/permissions-establishment.enum"
import { EPermissionsStudyPlan } from "@modules/study-plan/enums/permissions-study_plan.enum"

export type EPermissions= EPermissionsTasks | EPermissionsUsers | EPermissionsAuthorizations | EPermissionsAnalytic | EPermissionsEstablishment | EPermissionsStudyPlan;
