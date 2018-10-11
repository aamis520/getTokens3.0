import Vue from 'vue'
import Router from 'vue-router' // import Main from '@/pages/Main'
// import Home from '@/pages/Home'
const Main = resolve => require(['@/pages/Main'], resolve)
const Home = resolve => require(['@/pages/Home'], resolve)
// 下边是广告
const Advertisement = resolve => require(['@/pages/Advertisement'], resolve)
const adverDetail = resolve => require(['@/pages/adverChildren/adverDetail'], resolve)
const adverShare = resolve => require(['@/pages/adverChildren/adverShare'], resolve)
// 转点页面3.0
const chartHome = resolve => require(['@/pages/chartHome'], resolve)
const chartSingle = resolve => require(['@/pages/chartsChildren/chartSingle'], resolve)
const chartGroup = resolve => require(['@/pages/chartsChildren/chartGroup'], resolve)
const creatGroupChart = resolve => require(['@/pages/chartsChildren/creatGroupChart'], resolve) // 创建群聊
const newApplyMessage = resolve => require(['@/pages/applyMessage/newApplyMessage'], resolve) // 应用消息界面
const groupDetail = resolve => require(['@/pages/group/groupDetail'], resolve) // 群成员页面
const editGroupName = resolve => require(['@/pages/group/editGroupName'], resolve) // 编辑群名称
const groupChartMember = resolve => require(['@/pages/group/groupChartMember'], resolve) // 编辑群名称
const accountHome = resolve => require(['@/pages/account/accountHome'], resolve) // 编辑群名称
const aboutWe = resolve => require(['@/pages/account/aboutWe'], resolve) // 编辑群名称
const setHeadPortrait = resolve => require(['@/pages/account/setHeadPortrait'], resolve) // 编辑群名称

const Single = resolve => require(['@/pages/single'], resolve)
// 通讯录页面
const addressBookHome = resolve => require(['@/pages/addressBookHome'], resolve)
const addressFriendBook = resolve => require(['@/pages/addressBook/addressFriendBook'], resolve)
const addressGroupBook = resolve => require(['@/pages/addressBook/addressGroupBook'], resolve)
// 下载页面
const downLoadApp = resolve => require(['@/pages/downLoad/downLoadApp'], resolve)
const goBrowser = resolve => require(['@/pages/downLoad/goBrowser'], resolve)

// 下边是添加好友页面
const addFriend = resolve => require(['@/pages/addFriend'], resolve)
const weixinShare = resolve => require(['@/pages/weixinShare'], resolve)
const beanRong = resolve => require(['@/pages/beanRong'], resolve)

// 下边是账户部分
const consumer = resolve => require(['@/pages/consumer'], resolve)
const income = resolve => require(['@/pages/income'], resolve)
const redPaper = resolve => require(['@/pages/redPaper'], resolve)
const redRemark = resolve => require(['@/pages/redRemark'], resolve)
const getPack = resolve => require(['@/pages/getPack'], resolve)
const outerGetPack = resolve => require(['@/pages/outerGetPack'], resolve)
const outerGetPackage = resolve => require(['@/pages/outerGetPackage'], resolve)
const fillIn = resolve => require(['@/pages/redPackChildren/fillIn'], resolve)
const givePack = resolve => require(['@/pages/redPackChildren/givePack'], resolve)
const loginOut = resolve => require(['@/pages/loginOut'], resolve)

// 下边是钱包页面
const homeWallet = resolve => require(['@/pages/wallet/index'], resolve)
const assetsClassify = resolve => require(['@/pages/wallet/assetsClassify'], resolve)
const walletUrl = resolve => require(['@/pages/wallet/walletUrl'], resolve)
const rollOut = resolve => require(['@/pages/rollOut'], resolve)
// 下边是Dapp
const Dapp = resolve => require(['@/pages/Dapp'], resolve)
const newdapp = resolve => require(['@/pages/newdapp'], resolve)
const latelyuse = resolve => require(['@/pages/latelyuse'], resolve)
const lookMore = resolve => require(['@/pages/lookMore'], resolve)
const beanKnow = resolve => require(['@/pages/beanKnow'], resolve)
const lookMoreChats = resolve => require(['@/pages/lookMoreChats'], resolve)
const bbsDetail = resolve => require(['@/pages/bbsDetail'], resolve)
const gameDetail = resolve => require(['@/pages/dappChildren/gameDetail'], resolve)
const guessDetail = resolve => require(['@/pages/dappChildren/guessDetail'], resolve)
const hangqing = resolve => require(['@/pages/dappChildren/hangqing'], resolve)
const fastInfo = resolve => require(['@/pages/dappChildren/fastInfo'], resolve)
const market = resolve => require(['@/pages/dappChildren/market'], resolve)
const Login = resolve => require(['@/pages/user/Login'], resolve)
const RequestPage = resolve => require(['@/pages/home/RequestPage'], resolve)
const Task = resolve => require(['@/pages/home/Task'], resolve)
const Register = resolve => require(['@/pages/user/Register'], resolve)
const SetName = resolve => require(['@/pages/user/SetName'], resolve)
const setPassword = resolve => require(['@/pages/user/setPassword'], resolve)
const Friend = resolve => require(['@/pages/home/Friend'], resolve)

// 找回密码
const findPassByMobile = resolve => require(['@/pages/user/findPassByMobile'], resolve)
const setPassByForget = resolve => require(['@/pages/user/setPassByForget'], resolve)
const WinTreasureList = resolve => require(['@/pages/home/WinTreasureList'], resolve)
const FriendRequest = resolve => require(['@/pages/home/FriendRequest'], resolve)
const FriendAllList = resolve => require(['@/pages/home/FriendAllList'], resolve)
const netWorkError = resolve => require(['@/components/netError'], resolve)

Vue.use(Router)

export default new Router({
  // mode: 'history', // 去掉＃
  linkActiveClass: "active",
  scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition
		} else {
			return {
				x: 0,
				y: to.meta.savedPosition || 0
			}
		}
	},
  routes: [{
      path: '/market',
      component: market,
      redirect: '/market/hangqing',
      meta: {
        title: '市场页面'
      },
      children: [{
        path: 'hangqing',
        component: hangqing,
        meta: {
          title: '行情页面'
        }
      }, {
        path: 'fastInfo',
        component: fastInfo,
        meta: {
          title: '快讯页面'
        }
      }]
    },
    {
      path: '/adverDetail/:id',
      component: adverDetail,
      meta: {
        title: '广告详情页面'
      }
    },
    {
      path: '/creatGroupChart',
      component: creatGroupChart,
      meta: {
        title: '创建群聊'
      }
    },
    {
      path: '/single',
      component: Single,
      meta: {
        title: '好友聊天页面'
      }
    },
    {
      path: '/hangqing',
      component: hangqing,
      meta: {
        title: '市场行情'
      }
    },
    {
      path: '/rollOut',
      component: rollOut,
      meta: {
        title: '转账页面'
      }
    },
    {
      path: '/fastInfo',
      component: fastInfo,
      meta: {
        title: '市场快讯'
      }
    },
    {
      path: '/gameDetail',
      component: gameDetail,
      meta: {
        title: '游戏页面'
      }
    },
    {
      path: '/Task',
      name: 'Task',
      component: Task,
      meta: {
        title: '任务页面'
      }
    },
    {
      path: '/FriendAllList',
      name: 'FriendAllList',
      component: FriendAllList,
      meta: {
        title: '好友列表'
      }
    },
    {
      path: '/WinTreasureList',
      name: 'WinTreasureList',
      component: WinTreasureList,
      meta: {
        title: '领取列表'
      }
    },
    {
      path: '/FriendRequest',
      name: 'FriendRequest',
      component: FriendRequest,
      meta: {
        title: '好友申请列表'
      }
    },
    {
      path: '/adverShare',
      component: adverShare,
      meta: {
        title: '广告分享页面'
      }
    },
    {
      path: '/latelyuse',
      component: latelyuse,
      meta: {
        title: '最近使用'
      }
    },
    {
      path: '/lookMore',
      component: lookMore,
      meta: {
        title: '查看更多'
      }
    },
    {
      path: '/beanKnow',
      component: beanKnow,
      meta: {
        title: '币知道'
      }
    },
    {
      path: '/lookMoreChats',
      component: lookMoreChats,
      meta: {
        title: '全部帖子'
      }
    },
    {
      path: '/bbsDetail',
      component: bbsDetail,
      meta: {
        title: '论坛详情'
      }
    },
    {
      path: '/newApplyMessage',
      component: newApplyMessage,
      meta: {
        title: '应用消息'
      }
    },
    {
      path: '/groupDetail',
      component: groupDetail,
      meta: {
        title: '群详情'
      }
    },
    {
      path: '/editGroupName',
      component: editGroupName,
      meta: {
        title: '设置群名称'
      }
    },
    {
      path: '/groupChartMember',
      component: groupChartMember,
      meta: {
        title: '群聊成员'
      }
    },
    {
      path: '/aboutWe',
      component: aboutWe,
      meta: {
        title: '关于我们'
      }
    },
    {
      path: '/setHeadPortrait',
      component: setHeadPortrait,
      meta: {
        title: '修改头像'
      }
    },
    {
      path: '/downLoadApp',
      component: downLoadApp,
      meta: {
        title: '下载页面'
      }
    },
    {
      path: '/goBrowser',
      component: goBrowser,
      meta: {
        title: '浏览器页面'
      }
    },
    {
      path: '/addFriend',
      component: addFriend,
      meta: {
        title: '添加好友'
      }
    },
    {
      path: '/weixinShare',
      component: weixinShare,
      meta: {
        title: '微信分享'
      }
    },
    {
      path: '/Friend',
      name: 'Friend',
      component: Friend,
      meta: {
        title: '好友主页'
      }
    },
    {
      path: '/income',
      component: income,
      meta: {
        title: '收支记录'
      }
    },
    {
      path: '/getPack',
      component: getPack,
      meta: {
        title: '好友红包'
      }
    },
    {
      path: '/loginOut',
      component: loginOut,
      meta: {
        title: '设置页面'
      }
    },
    {
      path: '/outerGetPack',
      component: outerGetPack,
      meta: {
        title: '转点红包'
      }
    },
    {
      path: '/outerGetPackage',
      component: outerGetPackage,
      meta: {
        title: '转点红包'
      }
    },
    {
      path: '/assetsClassify',
      component: assetsClassify,
      meta: {
        title: '添加资产页面'
      }
    },
    {
      path: '/walletUrl',
      component: walletUrl,
      meta: {
        title: '钱包地址页面'
      }
    },
    {
      path: '/homeWallet',
      name: 'homeWallet',
      component: homeWallet,
      meta: {
        title: '钱包首页'
      }
    },
    {
      path: '/RequestPage',
      name: 'RequestPage',
      component: RequestPage,
      meta: {
        title: '邀请页面'
      }
    },
    {
      path: '/redPaper',
      component: redPaper,
      meta: {
        title: '红包页面'
      }
    },
    {
      path: '/Home',
      component: Home,
      meta: {
        title: '转点首页'
      }
    },
    {
      path: '/redRemark',
      component: redRemark,
      redirect: '/redMemark/fillIn',
      meta: {
        title: '红包记录页面'
      },
      children: [{
          path: '/redMemark/fillIn',
          component: fillIn,
          meta: {
            title: '我收到红包'
          }
        },
        {
          path: '/redMemark/givePack',
          component: givePack,
          meta: {
            title: '我发出红包'
          }
        }
      ]
    },
    {
      path: '/',
      component: Main,
      redirect: '/login',
      meta: {
        title: '转点首页'
      },
      children: [{
          path: 'Advertisement',
          component: Advertisement,
          meta: {
            title: '广告页面'
          }
        },
        {
          path: 'consumer',
          component: consumer,
          meta: {
            title: '账户首页'
          }
        },

        {
          path: 'Dapp',
          component: Dapp,
          meta: {
            title: 'Dapp'
          }
        },
        {
          path: 'newdapp',
          component: newdapp,
          meta: {
            title: 'newdapp'
          }
        },
        {
          path: 'guessDetail',
          component: guessDetail,
          meta: {
            title: '竞猜页面'
          }
        },
        {
          path: 'accountHome',
          component: accountHome,
          meta: {
            title: '账户首页'
          }
        },
        {
          path: 'Home',
          name: 'Home',
          component: Home,
          meta: {
            title: '转点首页'
          }
        },
        {
          path: 'chartHome',
          name: 'chartHome',
          component: chartHome,
          redirect: 'chartHome/chartSingle',
          meta: {
            title: '转点页面'
          },
          children: [{
            path: '/chartHome/chartSingle',
            component: chartSingle,
            meta: {
              title: '好友聊天'
            }
          },
          {
            path: '/chartHome/chartGroup',
            component: chartGroup,
            meta: {
              title: '群聊'
            }
          }
        ]
        },
        {
          path: 'addressBookHome',
          name: 'addressBookHome',
          component: addressBookHome,
          redirect: 'addressBook/addressFriendBook',
          meta: {
            title: '通讯录页面'
          },
          children: [{
                path: '/addressBook/addressFriendBook',
                component: addressFriendBook,
                meta: {
                  title: '好友通讯录'
                }
              },
            {
              path: '/addressBook/addressGroupBook',
              component: addressGroupBook,
              meta: {
                title: '群聊通讯录'
              }
            }
          ]
        }

      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        title: '登录页面'
      }
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register,
      meta: {
        title: '注册页面'
      }
    },
    {
      path: '/SetName',
      name: 'SetName',
      component: SetName,
      meta: {
        title: '注册页面'
      }
    },
    {
      path: '/setPassword',
      name: 'setPassword',
      component: setPassword,
      meta: {
        title: '设置密码'
      }
    },
    {
      path: '/findPassByMobile',
      name: 'findPassByMobile',
      component: findPassByMobile,
      meta: {
        title: '找回密码'
      }
    },
    {
      path: '/setPassByForget',
      name: 'setPassByForget',
      component: setPassByForget,
      meta: {
        title: '设置密码'
      }
    },
    {
      path: '/netWorkError',
      name: 'netWorkError',
      component: netWorkError,
      meta: {
        title: '网络连接失败'
      }
    },
    {
      path: '/beanRong',
      name: 'beanRong',
      component: beanRong,
      meta: {
        title: '币融'
      }
    }
  ]

})
