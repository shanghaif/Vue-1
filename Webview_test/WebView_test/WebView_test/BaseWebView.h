//
//  BaseWebView.h
//  WebView_test
//
//  Created by mac on 2019/7/1.
//  Copyright © 2019 Cary. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <WebKit/WebKit.h>

NS_ASSUME_NONNULL_BEGIN
@class WebViewHistory;

@interface BaseWebView : WKWebView

@property(nonatomic,strong) WebViewHistory *history;

@end

NS_ASSUME_NONNULL_END
