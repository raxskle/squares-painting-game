# 军训大对抗 API Doc

## 公共信息

**API URL:** （未定）

**URL 前缀：**

```
/api
```

### 交换格式

**SuccessResponse**


```
{
    "success": true,
    "msg": "",
    "data": {
    }
}
```

**ErrorResponse**

```
{
	"success": false,
	"msg": "中文错误提示信息",
	"data": null
}
```

下述Response格式只描述data数据

### 身份验证

HTTP 头 Authorization 设置为 `Bearer JWT`

```plaintext
Authorization: Bearer TOKEN
```

接口标题带 `*` 的均为需要身份验证的接口

## API

### 微信授权登录

`GET /user/token?code=<code>`

`code`：前端引导用户打开授权url所返回的code

**Response**

```
{
	"first_login": true,
	"weixin_openid": "OPENID",
	"jwtoken": "TOKEN"
}
```

### 选择阵营*

`POST /user/group`

**Request**

```
{
	"group": 1
}
```

`group`:

​	1 - 绿队（偷瓜队）

​	2 - 黄队（射日队）

**Response**

```
null
```

### 获取进入主页所需的信息*

`GET /home_info`

**Response**

```
{
    "user_info": {
        "weixin_openid": "",
        "nickname": "",
        "headimgurl": "",
        "group": 1,
        "user_level": 0,
        "user_pixels_num": 0,
        
        "state": true,
        "last_paint_time": 0
    },
    "canvas_info": {
        "canvas": [
            ["#ffffff","#ffffff","#ffffff"],
            ["#ffffff","#ffffff","#ffffff"],
            ["#ffffff","#ffffff","#ffffff"]
        ],
        "target": [
            ["#ffffff","#ffffff","#ffffff"],
            ["#ffffff","#ffffff","#ffffff"],
            ["#ffffff","#ffffff","#ffffff"]
        ],
        "last_paint": {
            "pixel_position": [0,0],
            "time": 0,
            "nickname": "",
            "headimgurl": ""
        }
    },
    "groups_info":[
        {
            "id": 1,
            "name": "偷瓜队",
            "level": 0,
            "total_members_num": 0,
            "total_pixels_num": 0,
            "complete_target": false
        },
        {
            "id": 2,
            "name": "射日队",
            "level": 0,
            "total_members_num": 0,
            "total_pixels_num": 0,
            "complete_target": false
        }
        ],
}
```

### 获取用户信息*

`GET /user/info`

`group`:

​	1 - 绿队（偷瓜队）

​	2 - 黄队（射日队）

**Response**

```
{
	"weixin_openid": "",
	"nickname": "",
	"headimgurl": "",
	"group": 1,
	"user_level": 0,
	"user_pixels_num": 0,
	"last_paint_time": 0
}
```

### 获取用户当前能否涂色*

`GET /user/state`

**Response**

```
{
	"state": true,
	"last_paint_time": 0
}
```

`last_paint_time`:

​	格式为Unix时间戳，若用户当天未涂色，该值为0。

### 获取阵营状态*

`GET /group/status`

**Response**

```
{
  "groups":[
    {
      "id": 1,
      "name": "偷瓜队",
      "level": 0,
      "total_members_num": 0,
      "total_pixels_num": 0,
      "complete_target": false
    },
    {
      "id": 2,
      "name": "射日队",
      "level": 0,
      "total_members_num": 0,
      "total_pixels_num": 0,
      "complete_target": false
    }
  ]
}
```

### 获取任务*

`GET /task`

**Response**

```
{
    "task": "...",
    "img": "..."
}
```

### 获取画布信息*

`GET /canvas`

**Response**

```
{
    "canvas": [
	    ["#ffffff","#ffffff","#ffffff"],
	    ["#ffffff","#ffffff","#ffffff"],
	    ["#ffffff","#ffffff","#ffffff"]
    ],
    "last_paint": {
    	"pixel_position": [0,0],
    	"time": 0,
    	"nickname": "",
    	"headimgurl": ""
    },
    "pixels_num":{
    	"group_1": 0,
    	"group_2": 0
    }
}
```

`canvas`: 

​	一个n维矩阵，与画布状态对应。

​	每个矩阵元素为对应的十六进制颜色字符串。

​	字符串为`#`时代表该位置未涂色，字符串为空时代表该位置画布镂空。

`last_paint`:

​	当日还未有人涂色时，`last_paint`返回`null`

### 涂色*

`POST /canvas`

**Request**

```
{
	"position": [0,0]
}
```

`position`: 

​	涂色方块的坐标，以左上角为坐标原点（`[m,n]`即画布矩阵第m行第n列的元素）

 **Response**

```
{
	"conflicting": false,
	"cooling": false,
	"is_user_upgraded": false,
	"user_level": 0,
	"user_pixels_num": 0,
	"is_group_upgraded": false,
	"group_level": 0,
	"group_pixels_num": {
    	"group_1": 0,
    	"group_2": 0
    }
}
```

`conflicting`: 发生同队涂色冲突

`cooling`: 用户处于冷却状态，无法涂色

当`conflicting`或`cooling`为真时，其他字段的值无意义。
