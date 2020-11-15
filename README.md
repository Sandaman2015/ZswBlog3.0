# ZswBlog3.0
ZswBlog-UI3.0
## Docker-compose运行说明

### 1.首先进入app目录下构建docker镜像

### 2.上传至您的阿里云或DockerHub镜像仓库

### 3.返回到docker-compose文件夹目录内，运行如下命令

  #### 4.1 改yaml文件更改为您的docker镜像仓库最新版本地址（或者使用我的公共仓库：registry.cn-hangzhou.aliyuncs.com/zswblogui/zswblogui:latest-8）
  
  #### 4.2 记得运行ZswBlog.Core项目，最好指定8004端口，然后修改nginx的配置文件的负载均衡（upstream）为您的本地地址

  #### 4.3 `docker-compose -f docker-compose-zswblog-ui.yaml up -d`shell

### 5.如果该项目能够获得您的欣赏希望您能给我点一个Star

### 6.持续迭代中。。。。
