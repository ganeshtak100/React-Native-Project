//
//  Counter.swift
//  Password_Aoto_Fill
//
//  Created by Creole iMac 03 on 01/09/22.
//

import Foundation

@objc(Counter)
class Counter: RCTEventEmitter{
  var email: String!
  var password: String!
  var domain: String!
  private var count = 0;
  
  
  @objc
  func save(email: String, password:String, domain: String ,callback:RCTResponseSenderBlock) {
    
        self.email = email
        self.password = password
        self.domain = domain
    
    print("email address-----",email);
    
    callback([email])
    sendEvent(withName: "saveData", body: [count])
   
    }
  
  @objc
  func increment(_ callback:RCTResponseSenderBlock){
    count += 1;
    print(count);
    callback([count])
    sendEvent(withName: "onIncrement", body: [count])
  }
  
  @objc
  override static func requiresMainQueueSetup() ->Bool{
    return true;
  }
  
  @objc
  override func constantsToExport() -> [AnyHashable: Any]!{
    return ["initialCount": 0];
  }
  
  override func supportedEvents() -> [String]! {
    return ["onIncrement","onDecrement","saveData"];
  }
  
  @objc
  func decrement(_ resolve:RCTPromiseResolveBlock,
                 reject:RCTPromiseRejectBlock)
  {
    if(count == 0)
    {
      let error = NSError(domain: "", code: 200, userInfo: nil);
      reject("ERROR_COUNT","count cannot be negative",error);
    }
    else{
      count -= 1;
      resolve("count is \(count)");
      sendEvent(withName: "onDecrement", body: [count])
    }
  }
  

  

}
