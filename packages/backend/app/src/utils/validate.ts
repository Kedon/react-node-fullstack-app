import * as Validator from 'validatorjs';

export async function validator(body: any, rules: any, customMessages: any, callback: any){
    console.log(body)
    console.log(rules)
    body.form_fields.forEach((element: any) => {
        const validation = new Validator(body, rules, customMessages);
        validation.passes(() => callback(null, true));
        validation.fails(() => callback(validation.errors, false));    
    });
};
