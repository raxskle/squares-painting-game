# squares-painting-game

H5小游戏 for 冰岩2022秋招

## 运行项目

必须在微信移动端内打开网页

## 记录

页面最终效果

<!-- 
![1679117084689](image/README/1679117084689.jpg)

![1679117098724](image/README/1679117098724.jpg)

![1679117109090](image/README/1679117109090.jpg)

![1679117120716](image/README/1679117120716.jpg)

![1679117126864](image/README/1679117126864.jpg) -->

<img src="image/README/1679117084689.jpg"  width="200"  />
<img src="image/README/1679117098724.jpg"  width="200"  />
<img src="image/README/1679117109090.jpg"  width="200"  />
<img src="image/README/1679117120716.jpg"  width="200"  />
<img src="image/README/1679117126864.jpg"  width="200"  />



## 后端可能需要配置

本项目是vue单页面应用，项目运行过程会改变url地址路由

如果 URL 不匹配任何静态资源，服务器应**提供**与应用程序中的 `index.html` 相同的页面。

## 变量设置说明

`12个涂色色号` 和  `冷却时长 `需要在前端代码设置，如果测试过程中有变更，需要前端重新设置和后端一致 并再次打包

```
色号:
-  # group_1
  - '#76eaa3'  # level_0
  - '#68c889'  # level_1
  - '#59a773'  # level_2
  - '#488a5a'  # level_3
  - '#3a6c46'  # level_4
  - '#2c5132'  # level_5

-  #group_2
  - '#f6c173'  # level_0
  - '#fbb958'  # level_1
  - '#faa634'  # level_2
  - '#fe9900'  # level_3
  - '#fd8c24'  # level_4
  - '#f09800'  # level_5

冷却时长: 300s

```
