Docker 容器三个概念
---

* 镜像: 类似 `.iso` 镜像，只能被分享和下载。
* 容器: 打开镜像，进入的是容器，修改不会被保存，重启镜像会复原，除非保存为新的镜像。
* 仓库: 存放镜像的地方。

### Docker 常用命令

``` sh
docker version                                    # 查看 docker 版本
docker -v


docker search ubuntu                              # 从镜像库中查找 Ubuntu 镜像

docker pull ubuntu:latest                         # 下载ubuntu 镜像，tag 为latest，默认为latest

docker images                                     # 查看镜像

docker run -it ubuntu:latest /bin/bash            # 启动 Ubuntu 镜像

docker ps                                         # 查看容器
docker ps -a

exit                                              # 退出容器

docker start container_id                         # 打开容器
docker stop container_id                          # 关闭容器
docker restart container_id                       # 重启容器
docker attach container_id                        # 进入已打开的容器

                                                  # -m 注释
                                                  # -a 用户
                                                  # 07abdfe..be 容器ID
                                                  # 用户/创库:tag
docker commit -m "ubuntu with vim" -a "tianer" 07abdfe..be tianer/ubuntu:vim

docker push tianer/ubuntu:vim                     # 上传镜像到hub

docker rm container_id                            # 删除容器，删镜像前先删容器
docker rmi image_id                               # 删除镜像

```


Dockerfile
---

`Dockerfile` 是构建镜像的脚本。使用`Dockerfile`的原因是为了解决无法重复和将构建镜像透明化。

### Dockerfile命令

``` sh

FROM <image>                                    # 以哪个镜像为基础，必须为第一条命令
FROM scratch                                    # scratch 为特殊镜像，表示已空白镜像为基础


RUN <command>                                   # 运行shell命令，是Dockerfile的核心命令。每一条RUN命令会创建一层容器，RUN尽量写一起

# 两种RUN写法
RUN ls -al
RUN ["可执行程序", "参数1", "参数2"]

ADD 源文件/目录 目的路径(镜像文件)

COPY 源文件/目录 目的路径(镜像文件)             # 与ADD类似，COPY 压缩文件不会自动解压

ENV PATH PATH:/usr/local/bin                    # 设置环境变量

EXPOSE 80                                       # 指定端口，使容器内的应用可以与外界交互

WORKDIR /root/                                  # 设置工作目录为/root/

docker build -t vim8:v1 .                       # 创建新镜像 -t 镜像:tag，. 为上下文目录

```


Windows下docker toolbox
---

安装好后，远程连接`docker`虚拟机，账号是`docker`,密码是`tcuser`。


