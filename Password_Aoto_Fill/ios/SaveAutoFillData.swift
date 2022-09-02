//
//  SaveAutoFillData.swift
//  Password_Aoto_Fill
//
//  Created by Creole iMac 03 on 02/09/22.
//

import Foundation

@objc(Save)
class Save: RCTEventEmitter {
    var email: String!
    var password: String!
    var domain: String!
  

  
  @objc
  func construct(email: String, password:String, domain: String) {
    
        self.email = email
        self.password = password
        self.domain = domain
    
    print(email);
    }

}


//class Save: RCTEventEmitter{
//
//  private var count = 0;
//
//  @objc
//  func saveData(_ callback:RCTResponseSenderBlock){
//    count += 1;
////    print(count);
//    callback([count])
//    sendEvent(withName: "save", body: [count])
//  }
//
//  @objc
//  override static func requiresMainQueueSetup() ->Bool{
//    return true;
//  }
//
//  @objc
//  override func constantsToExport() -> [AnyHashable: Any]!{
//    return ["initialCount": 0];
//  }
//
//  override func supportedEvents() -> [String]! {
//    return ["save"];
//  }
//
//}
