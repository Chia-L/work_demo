## cmd指令

#### 目录操作

- 新建文件夹：md test

#### 显示目录

- 显示目录中文件列表： dir
- 显示目录结构：tree d:\test
- 显示当前目录位置：cd
- 显示指定磁盘的当前目录位置：cd d:

#### 网络操作

- Ping测试5次：ping ip/域名 -n 5
- 清除本地DNS缓存：ipconfig  /flushdns
- 路由追踪：tracert ip/域名

#### 进程/服务操作

- 显示当前正在运行的进程：`tasklist`
- 运行程序或命令：`start 程序名`
- 结束进程，按名称：`taskkill /im notepad.exe`（关闭记事本）
- 结束进程，按 PID：`taskkill /pid 1234`（关闭 PID 为 1234 的进程

#### 服务管理

- 显示当前正在运行的服务：`net start`
- 启动指定服务：`net start 服务名`
- 停止指定服务：`net stop 服务名`

#### 常用

- 清屏幕：cls