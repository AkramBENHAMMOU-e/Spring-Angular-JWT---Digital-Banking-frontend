export interface AccountDetails {
    accountId:            string;
    balance:              number;
    currentPage:          number;
    pageSize:             number;
    totalPages:           number;
    accountOperationDTOS: AccountOperation[];
}

export interface AccountOperation {
    id:            number;
    operationDate: Date;
    amount:        number;
    type:          string;
    description:   string;
}
