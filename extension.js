// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const md5 = require('md5');
const https = require('https');

function vaildString(str) {
  if (str) {
    return str.trim().length > 0;
  }
  return false;
}
const ItemOpts = {
  onDidSelectItem(item) {
    console.log(item);
  }
}
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
  //翻译选中文本
  let translateText = vscode.commands.registerCommand('translate.text', function () {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return; // No open text editor
    const selection = editor.selection;
    const text = editor.document.getText(selection);
    if (!vaildString(text)) return; // Select white space
    vscode.window.showQuickPick(getResByYouDao(text), ItemOpts);
  });
  //翻译输入文本
  let translateInput = vscode.commands.registerCommand('translate.input', function () {
    const boxOpts = {
      value: '输入要查询的单词',
      ignoreFocusOut: true,
    }
    vscode.window.showInputBox(boxOpts).then((text) => {
      if (!vaildString(text)) return; // Select white space
      vscode.window.showQuickPick(getResByYouDao(text), ItemOpts);
    });
  });
  context.subscriptions.push(translateText);
  context.subscriptions.push(translateInput);
}

function getResByYouDao(text) {
  const config = vscode.workspace.getConfiguration('translate');
  let url = 'https://openapi.youdao.com/api'
  const { appKey, appSecret } = config;
  const salt = (new Date).getTime();
  const query = text;
  const str1 = appKey + query + salt + appSecret;
  const sign = md5(str1);
  const from = 'auto';
  const to = 'auto';
  url = url + '?appKey=' + appKey + '&q=' + encodeURIComponent(query) + '&from=' + from + '&to=' + to + '&salt=' + salt + '&sign=' + sign;
  return new Promise((resolve) => {
    https.get(url, (res) => {
      res.setEncoding("utf8");
      let body = "";
      res.on("data", data => {
        body += data;
      });
      res.on("end", () => {
        body = JSON.parse(body);
        if (body.translation && body.translation.length) {
          resolve(body.translation)
        } else {
          resolve(['/(ㄒoㄒ)/~~ 未找到释义'])
        }
      });
    }).on('error', () => {
      resolve(['/(ㄒoㄒ)/~~ 未找到释义'])
    });
  })
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}
exports.deactivate = deactivate;