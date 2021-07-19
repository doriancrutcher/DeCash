/*
 * This is an example of an AssemblyScript smart contract with two simple,
 * symmetric functions:
 *
 * 1. setGreeting: accepts a greeting, such as "howdy", and records it for the
 *    user (account_id) who sent the request
 * 2. getGreeting: accepts an account_id and returns the greeting saved for it,
 *    defaulting to "Hello"
 *
 * Learn more about writing NEAR smart contracts with AssemblyScript:
 * https://docs.near.org/docs/develop/contracts/as/intro
 *
 */

import { Context, logging, storage, PersistentMap,u128,ContractPromiseBatch } from 'near-sdk-as'

const DEFAULT_MESSAGE = 'Hello'


const Memos = new PersistentMap<string, string[]>('owner and receiver');
const RecipientLog=new PersistentMap<string,string>('list of recipients');


// Exported functions will be part of the public interface for your smart contract.
// Feel free to extract behavior to non-exported functions!
export function getGreeting(accountId: string): string | null {
  // This uses raw `storage.get`, a low-level way to interact with on-chain
  // storage for simple contracts.
  // If you have something more complex, check out persistent collections:
  // https://docs.near.org/docs/concepts/data-storage#assemblyscript-collection-types
  return storage.get<string>(accountId, DEFAULT_MESSAGE)
}

export function setGreeting(message: string): void {
  const account_id = Context.sender

  // Use logging.log to record logs permanently to the blockchain!
  logging.log(
    // String interpolation (`like ${this}`) is a work in progress:
    // https://github.com/AssemblyScript/assemblyscript/pull/1115
    'Saving greeting "' + message + '" for account "' + account_id + '"'
  )

  storage.set(account_id, message)
}


// Dorian's Cheat sheet 

// Memo Functions

export function addMemo(receiver:string,memo:string, price:string):void{
  logging.log('adding memo')
if(Memos.contains(Context.sender)){
let senderMemos= Memos.getSome(Context.sender);
senderMemos.push(memo + ` || to ${receiver} for ${price}`);
Memos.set(Context.sender,senderMemos);
}else{
  Memos.set(Context.sender,[memo +`to ${receiver} for ${price}`]);

}

if(Memos.contains(receiver)){
  let senderMemos= Memos.getSome(receiver);
  senderMemos.push(memo);
  Memos.set(receiver,senderMemos);
  }else{
    Memos.set(receiver,[memo]);
  
  }


}

export function getMemos(user:string):string[]{
  if(Memos.contains(user)){
   return Memos.getSome(user)
  }else{
    logging.log('no memos found for this user')
    return[]
  }
}


// Money Functions

export function transferNearTokens(account:string,amount:u128):void{
  ContractPromiseBatch.create(account).transfer(amount);
  logging.log('Success! Tokens Transferred to '+account);
  }


