##  问题一：历史浏览网页的定向跳转

>在实际的开发过程中，涉及到交互的问题，原生和H5的网页相互嵌套，直接造成跳转的混乱，混乱就应该指定的历史记录中，就需要网页的一些相关的一些属性问题，
需要在webview里面的代理方法中执行相对应的操作跳转过程：

```
NSURL *list =[webView.backForwardList itemAtIndex:0].initialURL;

//webView.goBack;

NSLog(@"%@",list);

NSURL  *current =[webView.backForwardList currentItem].URL;//当前的URL

NSURL *foreward = [webView.backForwardList forwardItem].URL;

NSURL *back = [webView.backForwardList backItem].URL;//后退的URL

NSLog(@"current=%@,foreward=%@,back=%@",current,foreward,back);

NSArray *history = [webView.backForwardList backList];//历史记录的列表



//循环遍历里面历史记录，根据标题返回到指定的历史记录中

for (WKBackForwardListItem *item in history) {

    NSLog(@"000%@---111%@----222%@",item.URL,item.title,item.initialURL);

    //标记  标题是我的资讯的时候，返回到指定的页面，下面是数组中的第一个元素，也就是说最先加载的一个地址
    if ([item.title isEqualToString:@"我的资讯"]) {
        [webView goToBackForwardListItem:[webView.backForwardList.backList firstObject]];
    }

}

//根据标题的页面执行对应的跳转页面
for (int i =0; i<history.count; i++) {

    WKBackForwardListItem *item = history[i];

    if ([item.title isEqualToString:@"个人中心"]||[item.title isEqualToString:@"发现"]) {

        self.tag = i;

    }

    if ([item.title isEqualToString:@"我的资讯"]||[item.title isEqualToString:@"活动详情"]||[item.title isEqualToString:@"发现"]) {

        [webView goToBackForwardListItem:history[self.tag]];//跳转想对应网页的操作

    }

}

```

##  问题二：开启手势前进后退导航的问题使用自定义手势做遮挡，而如果只是在开启不同页面时开启和关闭手势，会造成页面回退时下面的页面是空白

##  问题三：打包的html相关文件要使用相对路径，需要在vued项目里配置

##  问题四：vue页面路由webview的回调方法不会执行，需要添加对URL的KVO以监听r路由事件

##  问题五：手势前进后退跳转页面后vue的页面跳转动画还会执行，需要在vue里通过监听touchmove事件来处理手势前进后退，当是手势操作时不执行动画
