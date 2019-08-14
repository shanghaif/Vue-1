<template>
	<div class="disease-encyclopedia-section clearfix" v-if="loadComplete">
        <div class="panel-wrap">
            <div class="panel">
                <div class="panel-title">
                    <span class="icon-con">
                        <!-- <i class="icon-ver-pro-1 vertical-top" /> -->
                        <img src="../img/ver-pro-1.png">
                    </span>

                    <a class="open-detail" href="javascript:" @click="sliderOpen(data.Disease_Name, data.Briefintro_Content)">
                        <i class="icon-arrow-open" />
                    </a>

                    <span v-html="data.Disease_Name"></span>
                </div>

                <div class="panel-body">
                    <div class="detail-module" v-html="data.Briefintro_Content"></div>
                </div>
            </div>

            <div class="panel">
                <div class="panel-title">
                    <span class="icon-con">
                        <!-- <i class="icon-ver-pro-2 vertical-top" /> -->
                        <img src="../img/ver-pro-2.png">
                    </span>

                    <a class="open-detail" href="javascript:" @click="sliderOpen('相关症状', data.Common_Symptom_Desc)">
                        <i class="icon-arrow-open" />
                    </a>

                    <span>相关症状</span>
                </div>

                <div class="panel-body">
                    <div class="detail-module" v-html="data.Common_Symptom_Desc"></div>
                </div>
            </div>

            <div class="panel">
                <div class="panel-title">
                    <span class="icon-con">
                        <!-- <i class="icon-ver-pro-3 vertical-top" /> -->
                        <img src="../img/ver-pro-3.png">
                    </span>

                    <span>并发症</span>
                </div>

                <div class="panel-body">
                    <p v-html="data.Concurrent_Disease_Nlist"></p>
                </div>
            </div>

            <div class="panel">
                <div class="panel-title">
                    <span class="icon-con">
                        <!-- <i class="icon-ver-pro-4 vertical-top" /> -->
                        <img src="../img/ver-pro-4.png">
                    </span>

                    <span>易感人群</span>
                </div>

                <div class="panel-body">
                    <p v-html="data.Susceptible_Population"></p>
                </div>
            </div>

            <div class="panel">
                <div class="panel-title">
                    <span class="icon-con">
                        <!-- <i class="icon-ver-pro-5 vertical-top" /> -->
                        <img src="../img/ver-pro-5.png">
                    </span>

                    <span>治愈率</span>
                </div>

                <div class="panel-body">
                    <p v-html="data.Cure_Rate"></p>
                </div>
            </div>

            <div class="panel">
                <div class="panel-title">
                    <span class="icon-con">
                        <!-- <i class="icon-ver-pro-6 vertical-top" /> -->
                        <img src="../img/ver-pro-6.png">
                    </span>

                    <span>常用药品</span>
                </div>

                <div class="panel-body">
                    <ul class="tag-list clearfix">
                        <li v-for="item in data.Drugslst">
                            <div class="tag-item" v-html="item.Name"></div>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="panel">
                <div class="panel-title">
                    <span class="icon-con">
                        <!-- <i class="icon-ver-pro-7 vertical-top" /> -->
                        <img src="../img/ver-pro-7.png">
                    </span>

                    <span>相关疗法</span>
                </div>

                <div class="panel-body">
                    <div class="dot-panel">
                        <div class="dot-panel-title">
                            <a class="open-detail" href="javascript:" @click="viewDetail(data.Inspection_Detail)">
                                <i class="icon-arrow-open" />
                            </a>

                            <span>检查方式</span>
                        </div>

                        <div class="dot-panel-body">
                            <p v-for="item in getSplit(data.Inspection_Detail)" v-html="item" v-if="item"></p>
                        </div>
                    </div>

                    <div class="dot-panel">
                        <div class="dot-panel-title">
                            <a class="open-detail" href="javascript:" @click="viewDetail(data.Treatment_Detail)">
                                <i class="icon-arrow-open" />
                            </a>

                            <span>预防护理</span>
                        </div>

                        <div class="dot-panel-body">
                            <p v-for="item in getSplit(data.Treatment_Detail)" v-html="item" v-if="item"></p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="panel">
                <div class="panel-title">
                    <span class="icon-con">
                        <!-- <i class="icon-ver-pro-8 vertical-top" /> -->
                        <img src="../img/ver-pro-8.png">
                    </span>

                    <span>相关疾病</span>
                </div>

                <div class="panel-body">
                    <div class="tag-list clearfix">
                        <a class="tag-item mrg-r-lg" href="javascript:" v-for="item in data.AboutDiseaselst" v-html="item.Name" @click="replaceRoute(item)">肺气肿</a>
                    </div>
                </div>
            </div>
        </div>

        <div class="slider-masker" v-show="show">
            <div class="slider-cover" @click="sliderClose"></div>

            <transition enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight">
                <div class="slider-con clearfix" v-show="show" v-if="sliderData">
                    <div class="slider-title clearfix">
                        <a class="fr" @click="sliderClose">
                            <i class="icon-arrow-close" />
                        </a>

                        <span v-html="sliderData.title"></span>
                    </div>

                    <div class="slider-body" v-html="sliderData.message"></div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>

export default {
	data () {
		return {
			loadComplete: false, //是否已加载
			show: false,
			sliderData: null,
			data: {}
		}
	},
	mounted() {
        this.fetch();
    },
	methods: {
		//滑出
		sliderOpen(title, message) {
			this.sliderData = {
				title,
				message
			};

			this.show = true;
		},
		//滑出关闭
		sliderClose() {
			this.show = false;

			this.sliderData = null;
		},
		//获取字符切割
		getSplit(str) {
			let array = [];

			if(str) {
				let temp = str.split(/[\n]/g);

				if(temp.length > 2) {
					for(let i = 0; i < temp.length; i++) {
						if(!temp[i]) {
							temp.splice(i, 1);
						}
					}

					let first = temp.shift();

					array.push(first, temp.join());
				}
			} else {
				array = ["", ""]
			}

			return array;
		},
		//打开检查、治疗详情
		viewDetail(str) {
			let array = this.getSplit(str);

			this.sliderOpen(array[0], array[1]);
		},
		//切换最新
		replaceRoute(item) {
			let router = {
				name: "diseaseEncyclopedia",
				query: {
					id: item.Id
				}
			};

			if(!item.Id) {
				this.$toast("暂无该疾病介绍");
				return;
			}

			this.fetch();
		},
		//请求数据
		fetch() {
            const that = this
            // const API = 'http://app.kmhealth360.com/api/Symptom/GetSymptomDetail?ID='
            const API = 'http://test-app.kmhealth360.com/api/HealthBaike/GetDisDetail?id='
			fetch(API+'169').then(response => {
				return response.json();
			}).then(jsonData => {
                that.data = jsonData.Data;
                console.log('====' + JSON.stringify(that.data))
				that.loadComplete = true;
			}).catch(err => {
				that.loadComplete = false;
			});
		}
	}
}
</script>

<style lang="scss">
	@import '../styles/utility.scss';

	.disease-encyclopedia-section {
        text-align: left;
        line-height: 1.5;
        font-size: $font-size-base;
        color: $text-body-primary;

    .panel-wrap {
        position: relative;
        padding-left: px2rem(70);

        &:after {
            content: "";
            @include layout-absolute(px2rem(37.5) auto 0 px2rem(38));
            width: 2px;
            background: #eee;
        }

        .panel-title {
            position: relative;
            z-index: 3;
            border-bottom: 1px solid #eee;
            padding: 0 px2rem(40) 0 px2rem(10);
            line-height: px2rem(75);
            font-size: px2rem(30);
            color: $text-body-second;
        }

        .panel-body {
            padding: px2rem(30) px2rem(40) px2rem(10) 0;
        }

        .open-detail {
            float: right;
        }

        .icon-con {
            @include layout-absolute(px2rem(10) auto auto px2rem(-50), 3);
            border-radius: 100%;
            width: px2rem(50);
            height: px2rem(50);
            background: #fff;

            img {
                margin: 0 auto;
                width: auto;
                height: 100%;
            }
        }

        .detail-module {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            overflow: hidden;
        }

        .tag-list {
            .tag-item {
                display: inline-block;
                vertical-align: top;
                margin-bottom: px2rem(20);
                border: 1px solid #e5e5e5;
                padding: 0 px2rem(30);
                line-height: px2rem(40);
                background: #f9f9f9;
            }
        }
    }

    .dot-panel {
        .dot-panel-title {
            position: relative;
            z-index: 3;
            padding: 0 0 0 px2rem(10);
            line-height: px2rem(60);
            font-size: px2rem(28);
            color: $text-body-primary;

            &:before {
                display: inline-block;
                vertical-align: middle;
                content: "";
                margin-right: px2rem(5);
                border-radius: 100%;
                width: px2rem(12);
                height: px2rem(12);
                background: #16c5b7;
            }
        }

        .dot-panel-body {
            > p {
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 3;
                padding-left: px2rem(30);
                color: $text-mute;
                overflow: hidden;
            }
        }
    }

    .slider-masker {
        @include layout-fixed(0 0 0 0, 9);

        .slider-cover {
            @include layout-absolute(0 0 0 0);
            background: rgba(0, 0, 0, 0.5);
        }

        .slider-con {
            @include layout-absolute(64px 0 px2rem(40) px2rem(70), 3);
            padding: px2rem(20);
            background: #fff;
            overflow: auto;
        }

        .slider-title {
            line-height: px2rem(75);
            font-size: px2rem(30);
            color: $text-body-second;
        }

        .slider-body {
            font-size: px2rem(28);
            color: $text-body-primary;
        }
    }
}

.animated {
    -webkit-animation-duration: 0.3s;
    animation-duration: 0.3s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
}

@-webkit-keyframes slideInRight {
    0% {
        -webkit-transform: translate3d(100%, 0, 0);
        transform: translate3d(100%, 0, 0);
        visibility: visible
    }
    to {
        -webkit-transform: translateZ(0);
        transform: translateZ(0)
    }
}

@keyframes slideInRight {
    0% {
        -webkit-transform: translate3d(100%, 0, 0);
        transform: translate3d(100%, 0, 0);
        visibility: visible
    }
    to {
        -webkit-transform: translateZ(0);
        transform: translateZ(0)
    }
}

.slideInRight {
    -webkit-animation-name: slideInRight;
    animation-name: slideInRight
}


@-webkit-keyframes slideOutRight {
    0% {
        -webkit-transform: translateZ(0);
        transform: translateZ(0)
    }
    to {
        visibility: hidden;
        -webkit-transform: translate3d(100%, 0, 0);
        transform: translate3d(100%, 0, 0)
    }
}

@keyframes slideOutRight {
    0% {
        -webkit-transform: translateZ(0);
        transform: translateZ(0)
    }
    to {
        visibility: hidden;
        -webkit-transform: translate3d(100%, 0, 0);
        transform: translate3d(100%, 0, 0)
    }
}

.slideOutRight {
    -webkit-animation-name: slideOutRight;
    animation-name: slideOutRight
}

</style>