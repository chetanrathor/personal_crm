
export type AddHumanResource = {
    name: string,
    email: string
}

export type GetAllHumanResouces = {
    limit: number,
    offset: number,
    search: string,
    order: 'ASC' | 'DESC'
}

export type AddNewEmail = {
    subject: string
    body: string
    humanResource: string
}

export type BaseData = {
    id: string
    createdAt: string
    updatedAt: string
    deletedAt: any,
    status: string
}

export type PersonalizedEmail = BaseData & {
    status: string
    subject: string
    body: string
}

export type HumanResource = BaseData & {
    name: string
    email: string,
    personalizeEmails: PersonalizedEmail[]

}



export type CrmSliceInitialState = {
    humanResources: HumanResource[]
}


export type ApiResponse<T> = {
    statusCode: number,
    message: string,
    response: T
}

export type ListResponse<T> = {
    rows: T,
    count: number
}

export type CreateNewHumanResourceResponse = HumanResource & {}
export type GetAllHumanResourcesResponse = ListResponse<HumanResource[]> & {}

export type ModalChildrenNewEmail = 'NewEmail'
export type ModalChildrenFollowUp = 'FollowUp' 