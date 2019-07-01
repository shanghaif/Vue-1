/**
清除WKWebView的WKBackForwardList
 
 1.使用自定义 WKWebView 子类覆盖 backForwardList > WKBackForwardList
 2.使用自定义 WKBackForwardList 子类，覆盖 backItem & forwardItem 使它们返回nil，而不是让它们查看各自的列表（这很可能是默认实现）
 3.或者可以覆盖 backList & forwardList ，与上面的方式相同。我这样做是为了添加一个setter，它允许我从列表中删除项目
 */


#import "BaseWebView.h"

@interface WebViewHistory : WKBackForwardList

@property(nonatomic,strong) NSMutableArray<WKBackForwardListItem *> *myBackList;

@end

@implementation WebViewHistory

- (instancetype)init
{
    self = [super init];
    if (self) {
        _myBackList = [NSMutableArray new];
    }
    return self;
}

/* 解决方案1：返回nil，丢弃 backList & forwardList 的内容*/
-(WKBackForwardListItem *)backItem{
    return nil;
}

-(WKBackForwardListItem *)forwardItem{
    return nil;
}

/*解决方案2：覆盖backList和forwardList以添加setter */
-(NSArray<WKBackForwardListItem *> *)backList{
    return _myBackList;
}

-(void)clearBackList{
    [_myBackList removeAllObjects];
}

@end

@implementation BaseWebView

- (instancetype)initWithFrame:(CGRect)frame history:(WebViewHistory *)history
{
    self = [super initWithFrame:frame];
    if (self) {
        self.history = history;
    }
    return self;
}

-(WKBackForwardList *)backForwardList{
    return _history;
}

@end
