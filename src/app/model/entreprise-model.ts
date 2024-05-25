interface Enterprise{
    enterpriseId:number,
    enterpriseName:string,
    enterpriseEmail:string,
    enterpriseRuc:string,
    enterpriseStatus:boolean,
    enterpriseMessage:string,
    enterpriseDirection:string,
    enterprisePhone:string
}

type EnterpriseResponse=Pick<Enterprise, "enterpriseId"|"enterpriseName"|"enterpriseRuc"|"enterpriseStatus"|"enterpriseEmail"|"enterpriseMessage"|"enterpriseDirection"|"enterprisePhone">

export {  EnterpriseResponse}