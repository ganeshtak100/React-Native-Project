//
//  Counter.m
//  Password_Aoto_Fill
//
//  Created by Creole iMac 03 on 01/09/22.
//

#import <Foundation/Foundation.h>

#import "React/RCTBridgeModule.h"
#import "React/RCTEventEmitter.h"

@interface RCT_EXTERN_MODULE(Counter,RCTEventEmitter)

RCT_EXTERN_METHOD(save:(NSString*)email password:(NSString*)password domain:(NSString*)domain (RCTResponseSenderBlock)callback)
RCT_EXTERN_METHOD(increment:(RCTResponseSenderBlock)callback)
RCT_EXTERN_METHOD(decrement:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)

@end
