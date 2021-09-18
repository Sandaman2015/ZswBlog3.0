# ZswBlog3.0
ZswBlog-UI3.0
### 项目概述
该项目为ZswBlog前端页面，采用Vue2.0 + Element 开发，界面风格舒适，后端采用Dotnet 5.0 + C#开发

该项目只适用于学习，不适合个人商业用途，请注意！

[ZswBlog后台管理](https://github.com/Sandaman2015/ZswBlog.Manager)

[ZswBlog后端服务](https://github.com/Sandaman2015/ZswBlog.Core)

### 运行说明

``` shell
npm install

npm run serve
```
### 打包说明

#### 1.首先进入app目录下构建docker镜像

``` shell
cd app

docker build --tag zswblogui:latest-${你的版本号}
```

#### 2.上传至您的阿里云或DockerHub镜像仓库

具体操作，阿里云容器镜像服务网站以具体描述，此处不再重复只给出连接：

[阿里云](https://www.aliyun.com)

#### 3.返回到docker-compose文件夹目录内，按照如下操作进行

  - 3.1 改yaml文件更改为您的docker镜像仓库最新版本地址，或者使用我的[个人仓库](registry.cn-hangzhou.aliyuncs.com/zswblogui/zswblogui:latest-20)
  
  - 3.2 记得运行ZswBlog.Core项目，默认指定8004端口，然后修改nginx的配置文件的负载均衡（upstream）为您的本地地址

  - 3.3 最后运行如下命令：
  
  ``` shell
  
  docker-compose -f docker-compose-zswblog-ui.yaml up -d
  
  ```
### 特别说明

 **如果您对项目感兴趣欢迎提交PR，任何PR都将视为一次光荣的进化** 

**如果该项目能够获得您的欣赏希望您能给我点一个Star，持续迭代中。。。。**

**感谢（以下排名不分先后）**
  
  - Element 项目组
  
  - 猴胖童鞋（设计本博客logo）
  
  - Q-Blog （本站设计有很多地方借鉴了该博主的设计，非常感谢）
  
  - Live 2D项目组（博客看板娘很好看）
  
  - Vue-aplayer （网易云音乐组件很好用）

