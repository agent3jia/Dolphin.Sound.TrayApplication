import { app, BrowserWindow, globalShortcut, Menu, Tray } from "electron";
import path from "path";
import installExtension, {
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS,
} from "electron-devtools-installer";

let mainWindow: Electron.BrowserWindow | null;
let appTray: Tray | null = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1100,
    height: 700,
    backgroundColor: "#ffffff",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  mainWindow.webContents.openDevTools();

  console.log("process.env.NODE_ENV: ", process.env.NODE_ENV);
  if (process.env.NODE_ENV === "development") {
    mainWindow.loadURL("http://localhost:5050");
  } else {
    mainWindow.loadFile(path.join(__dirname, "../dist/renderer/index.html"));
  }

  // 菜单的配置
  const menuTemplate = [
    {
      label: "官网",
      submenu: [
        {
          label: "进入官网", // 子菜单的名字
          accelerator: "ctrl+1", // 菜单的快捷键
          click: () => {
            // 点击 菜单触发的事件
            let newWin: any = new BrowserWindow({
              width: 400,
              height: 400,
              webPreferences: {
                nodeIntegration: true, // 设置开启nodejs环境
                enableRemoteModule: true, // enableRemoteModule保证renderer.js可以可以正常require('electron').remote，此选项默认关闭且网上很多资料没有提到
              },
            });
            newWin.loadURL("http://dolphinsound.cn/");
            // 开启窗口之后，需要定义关闭窗口指针为空，防止内存溢出
            newWin.on("close", () => {
              newWin = null;
            });
          },
        },
        { label: "菜单11" },
      ],
    },
    {
      label: "菜单2",
      submenu: [{ label: "菜单21" }, { label: "菜单22" }],
    },
  ];
  // 根据配置信息创建 menu 对象
  const menuObj = Menu.buildFromTemplate(menuTemplate);
  // 将对象作用当当前应用中
  Menu.setApplicationMenu(menuObj);

  // 全局注册 快捷键
  globalShortcut.register("ctrl+x", function () {
    console.log("ctrl+x is pressed");
  });

  // 退出的时候，注销所有的快捷键
  app.on("will-quit", function () {
    // Unregister a shortcut.
    globalShortcut.unregister("ctrl+x");

    // Unregister all shortcuts.
    globalShortcut.unregisterAll();
  });

  const trayMenuTemplate = [
    {
      label: "设置",
      click: function () {}, //打开相应页面
    },
    {
      label: "帮助",
      click: function () {},
    },
    {
      label: "关于",
      click: function () {},
    },
    {
      label: "退出",
      click: function () {
        app.quit();
        app.quit(); //因为程序设定关闭为最小化，所以调用两次关闭，防止最大化时一次不能关闭的情况
      },
    },
  ];
  //系统托盘图标目录
  let trayIcon = path.join(__dirname, "../public/logo.png"); //app是选取的目录
  appTray = new Tray(trayIcon);
  //图标的上下文菜单
  const contextMenu = Menu.buildFromTemplate(trayMenuTemplate);

  //设置此托盘图标的悬停提示内容
  appTray.setToolTip("我的托盘图标");

  //设置此图标的上下文菜单
  appTray.setContextMenu(contextMenu);

  //单击右下角小图标显示应用
  appTray.on("click", function () {
    mainWindow!.show();
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app
  .on("ready", createWindow)
  .whenReady()
  .then(() => {
    if (process.env.NODE_ENV === "development") {
      installExtension(REACT_DEVELOPER_TOOLS)
        .then((name) => console.log(`Added Extension:  ${name}`))
        .catch((err) => console.log("An error occurred: ", err));
      installExtension(REDUX_DEVTOOLS)
        .then((name) => console.log(`Added Extension:  ${name}`))
        .catch((err: any) => console.log("An error occurred: ", err));
    }
  });

app.allowRendererProcessReuse = true;
