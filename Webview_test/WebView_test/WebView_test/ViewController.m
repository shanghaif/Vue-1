//
//  ViewController.m
//  WebView_test
//
//  Created by Cary on 2019/6/30.
//  Copyright © 2019 Cary. All rights reserved.
//

#import "ViewController.h"
#import <WebKit/WebKit.h>

// 判断是否为iPhone X 系列  这样写消除了在Xcode10上的警告。
#define IPHONE_X \
({BOOL isPhoneX = NO;\
if (@available(iOS 11.0, *)) {\
isPhoneX = [[UIApplication sharedApplication] delegate].window.safeAreaInsets.bottom > 0.0;\
}\
(isPhoneX);})

/*
 原理是根据手机底部安全区的高度 判断是否为 iPhone X、XR、XS、XS Max
 几款机型，用宏的方法使用方便，在使用的地方对 IPHONE_X 进行一下判断即可。
 */

/**
 *导航栏高度
 */
#define SafeAreaTopHeight (IPHONE_X ? 88 : 64)

/**
 *tabbar高度
 */
#define SafeAreaBottomHeight (IPHONE_X ? (49 + 34) : 49)

@interface ViewController ()
@property (strong, nonatomic) WKWebView *webview;

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    
    _webview = [[WKWebView alloc] initWithFrame:CGRectMake(0, 0, self.view.bounds.size.width, self.view.bounds.size.height)];
    // 是否允许手势左滑返回上一级, 类似导航控制的左滑返回
    _webview.allowsBackForwardNavigationGestures = YES;
    
    //解决状态栏空白问题
    if (@available(iOS 11.0, *)) {
        _webview.scrollView.contentInsetAdjustmentBehavior = UIScrollViewContentInsetAdjustmentNever;
        if (IPHONE_X) {
            
        }
    } else {
        self.edgesForExtendedLayout = UIRectEdgeNone;
    }
        
    [_webview loadRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:@"http://192.168.1.105:8000"]]];
    [self.view addSubview:_webview];
}


@end
