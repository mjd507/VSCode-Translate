# Translate-CN

一个在 Visual Studio Code 编辑器上翻译单词的插件。使用[有道智云](http://ai.youdao.com/docs/doc-trans-api.s#p02)提供的翻译 api 实现。

tip: 有道智云的翻译服务是收费服务，具体收费可参加其[文档](http://ai.youdao.com/docs/doc-trans-price.s#p03)

建议自己注册一个账号，获取 appKey 和 secretKey，在 User Setting 里面配置自己的 appKey 和 secretKey。（按一个单词 10 个字符来算，新人可免费翻译近 21 万个单词，一天翻译 100 个，可以免费用近 6 年）

## 使用

cmd+shift+p 调出命令面板，输入 tranlate input，即可翻译输入的文本，输入 translate text，即可翻译选中的文本。


## 快捷键

在快捷键配置文件（keybindings.json）中，可以按照下面的快捷键配置，也可以替换成自己习惯的快捷键

```json
{
  "key": "alt+t",
  "command": "translate.text",
  "when": "editorFocus"
},{
  "key": "alt+i",
  "command": "translate.input",
  "when": "editorFocus"
}
```

## Release Notes

### 1.0.0

1. 翻译选中文本
2. 翻译输入文本

**Enjoy!**