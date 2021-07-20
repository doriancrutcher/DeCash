

import { Context, logging, storage, PersistentMap,u128,ContractPromiseBatch } from 'near-sdk-as'


const Memos= new PersistentMap<string,string[]>(' memos ');
const RecipientLog=new PersistentMap<string,string>("list of recipients ");

// Change Methods (incur a fee )(change state of blockchain)



export function addMemo(receiver:string,memo:string, price:string):void{
logging.log('adding memo');
if (Memos.contains(Context.sender)){
    let senderMemos=Memos.getSome(Context.sender);
    senderMemos.push(memo + ` to ${receiver} for ${price}`);
    Memos.set(Context.sender,senderMemos);

}else{
    Memos.set(Context.sender,[memo])
}


}

export function transferNearTokens(account:string,amount:u128):void{
    ContractPromiseBatch.create(account).transfer(amount);
    logging.log("success! Tokens Transfred to "+ account)
}


// View Methods 

export function getMemos(user:string):string[]{
    if(Memos.contains(user)){
        return Memos.getSome(user)
    }else{
        logging.log(' no memos were found for this user')
        return[]
    }
}
