//
//  ViewController.m
//  WebView_test
//
//  Created by Cary on 2019/6/30.
//  Copyright © 2019 Cary. All rights reserved.
//

#import "ViewController.h"
#import <WebKit/WebKit.h>

// 判断是否为iPhone X 系列
#define IPHONE_X \
({BOOL isPhoneX = NO;\
if (@available(iOS 11.0, *)) {\
isPhoneX = [[UIApplication sharedApplication] delegate].window.safeAreaInsets.bottom > 0.0;\
}\
(isPhoneX);})

// 判断是否为iPhone Plus 系列
#define IPHONE_Plus [[UIApplication sharedApplication] delegate].window.bounds.size.height == 736

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

@interface ViewController ()<WKUIDelegate,WKNavigationDelegate>
@property (strong, nonatomic) WKWebView *webview;
@property (strong, nonatomic) UIImageView *launchImageView;
/**
 webView当前URL
 */
@property (copy, nonatomic) NSString *currentURL;
/**
 用于遮挡滑动回退的手势遮罩
 */
@property (strong, nonatomic) UIView *panGestureMask;

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    
    WKUserContentController *userContentController = [[WKUserContentController alloc] init];
    WKWebViewConfiguration *configuration = [[WKWebViewConfiguration alloc] init];
    configuration.userContentController = userContentController;
    WKPreferences *preferences = [[WKPreferences alloc] init];
    preferences.javaScriptCanOpenWindowsAutomatically = YES; // 不通过用户交互，是否可以打开窗口
    preferences.javaScriptEnabled = YES; //是否支持JavaScript
    preferences.minimumFontSize = 15.0; // 最小字体大小
    configuration.preferences = preferences; // 偏好设置
    
    _webview = [[WKWebView alloc] initWithFrame:CGRectMake(0, 0, self.view.bounds.size.width, self.view.bounds.size.height) configuration:configuration];
    // 是否允许手势左滑返回上一级, 类似导航控制的左滑返回
    _webview.allowsBackForwardNavigationGestures = YES;
    
    _webview.UIDelegate = self;
    _webview.navigationDelegate = self;
    
    //vue路由跳转页面回调函数不能监听，使用KVO手动设置监听
    [_webview addObserver:self forKeyPath:@"URL" options:NSKeyValueObservingOptionNew|NSKeyValueObservingOptionOld context:nil];
    
    //解决状态栏空白问题
    if (@available(iOS 11.0, *)) {
        _webview.scrollView.contentInsetAdjustmentBehavior = UIScrollViewContentInsetAdjustmentNever;
    } else {
        self.edgesForExtendedLayout = UIRectEdgeNone;
    }
    
    // http://192.168.1.105/elm
    // http://192.168.1.105:8080
    [_webview loadRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:@"http://192.168.1.105:8080"]]];
//    NSString * bundlePath = [[NSBundle mainBundle] resourcePath];
//    NSString *filePath = [NSString stringWithFormat:@"%@/elm/index.html", bundlePath];
//    NSURL *url = [NSURL fileURLWithPath:filePath];
//    [_webview loadRequest:[NSURLRequest requestWithURL:url]];
    [self.view addSubview:_webview];
    
    //手势遮罩
    UIPanGestureRecognizer *panGesture = [[UIPanGestureRecognizer alloc] init];
    _panGestureMask = [[UIView alloc] initWithFrame:CGRectMake(0, IPHONE_X ? 80 : 64, IPHONE_Plus?30:25, self.view.bounds.size.height)];
//    _panGestureMask.backgroundColor = [UIColor redColor];
    [_panGestureMask addGestureRecognizer:panGesture];
    [self.view addSubview:_panGestureMask];

    //启动页--隐藏webview加载的延时问题
    _launchImageView = [[UIImageView alloc] initWithFrame:self.view.bounds];
    UIImage *image = [self getLaunchImage];
    _launchImageView.image = image;
    [self.view addSubview:_launchImageView];
}

//获取启动图片
-(UIImage *)getLaunchImage{

    CGSize viewSize = [UIScreen  mainScreen].bounds.size;

    NSString *viewOrientation = @"Portrait";
    NSString *launchImageName = nil;

    NSArray* imagesDict = [[[NSBundle mainBundle] infoDictionary] valueForKey:@"UILaunchImages"];

    for (NSDictionary* dict in imagesDict){
        
        CGSize imageSize = CGSizeFromString(dict[@"UILaunchImageSize"]);
        if (CGSizeEqualToSize(imageSize, viewSize) && [viewOrientation isEqualToString:dict[@"UILaunchImageOrientation"]]){
            launchImageName = dict[@"UILaunchImageName"];
        }
    }

    UIImage *launchImage = [UIImage imageNamed:launchImageName];

    return launchImage;
}

// 观察URL的变化
- (void)observeValueForKeyPath:(NSString *)keyPath ofObject:(id)object change:(NSDictionary<NSKeyValueChangeKey,id> *)change context:(void *)context{
    _currentURL = [change[@"new"] absoluteString];
    NSLog(@"URL changed, from %@ -> to %@",change[@"old"],change[@"new"]);
    
    NSString *regex = @".*\#\/(msite|search|order|profile).*";
    NSPredicate *pred = [NSPredicate predicateWithFormat:@"SELF MATCHES %@", regex];
    BOOL isRootPage = [pred evaluateWithObject:_currentURL];
    _panGestureMask.hidden = !isRootPage;
}

#pragma mark - WKNavigationDelegate
// 页面开始加载时调用
- (void)webView:(WKWebView *)webView didStartProvisionalNavigation:(WKNavigation *)navigation{
    
}

// 当内容开始返回时调用
- (void)webView:(WKWebView *)webView didCommitNavigation:(WKNavigation *)navigation{
    
}

// 页面加载完成之后调用
- (void)webView:(WKWebView *)webView didFinishNavigation:(WKNavigation *)navigation{
    [_launchImageView removeFromSuperview];
}

// 页面加载失败时调用
- (void)webView:(WKWebView *)webView didFailProvisionalNavigation:(WKNavigation *)navigation{
    [_launchImageView removeFromSuperview];
}

// 接收到服务器跳转请求之后调用
- (void)webView:(WKWebView *)webView didReceiveServerRedirectForProvisionalNavigation:(WKNavigation *)navigation{
    
}

// 在收到响应后，决定是否跳转
- (void)webView:(WKWebView *)webView decidePolicyForNavigationResponse:(WKNavigationResponse *)navigationResponse decisionHandler:(void (^)(WKNavigationResponsePolicy))decisionHandler{
    
    NSLog(@"%@",navigationResponse.response.URL.absoluteString);
    //允许跳转
    decisionHandler(WKNavigationResponsePolicyAllow);
    //不允许跳转
    //decisionHandler(WKNavigationResponsePolicyCancel);
}

// 在发送请求之前，决定是否跳转
- (void)webView:(WKWebView *)webView decidePolicyForNavigationAction:(WKNavigationAction *)navigationAction decisionHandler:(void (^)(WKNavigationActionPolicy))decisionHandler{
    
    NSLog(@"%@",navigationAction.request.URL.absoluteString);
    
    //判断是返回类型
    if (navigationAction.navigationType==WKNavigationTypeBackForward) {
        //得到栈里面的list
        if (webView.backForwardList.backList.count>0) {
            //得到现在加载的list
            WKBackForwardListItem *item = webView.backForwardList.currentItem;
            //循环遍历，得到你想退出到
            for (WKBackForwardListItem *backItem in webView.backForwardList.backList) {
                //添加判断条件
                [webView goToBackForwardListItem:[webView.backForwardList.backList firstObject]];
            }
        }
    }
    
    //允许跳转
    decisionHandler(WKNavigationActionPolicyAllow);
    //不允许跳转
    //decisionHandler(WKNavigationActionPolicyCancel);
}

#pragma mark - WKUIDelegate
// 创建一个新的WebView
- (WKWebView *)webView:(WKWebView *)webView createWebViewWithConfiguration:(WKWebViewConfiguration *)configuration forNavigationAction:(WKNavigationAction *)navigationAction windowFeatures:(WKWindowFeatures *)windowFeatures{
    return [[WKWebView alloc]init];
}

// 确认框
- (void)webView:(WKWebView *)webView runJavaScriptAlertPanelWithMessage:(nonnull NSString *)message initiatedByFrame:(nonnull WKFrameInfo *)frame completionHandler:(nonnull void (^)(void))completionHandler{
    completionHandler();
    
    NSLog(@"%@",message);
}

- (void)dealloc{
    [_webview removeObserver:self forKeyPath:@"URL"];
}

@end
