// @ts-nocheck
import * as vscode from 'vscode';
import { window, ViewColumn, Disposable, workspace, commands, ExtensionContext } from 'vscode';
// import * as docTags from '../config/docTags.json';
export interface Query {
  path: string,
  label: string,
  detail: string,
  description: string,
};
const path = require('path')

const docTags = require(path.resolve(__dirname, '../config/docTags.json'))


const components = []
Object.keys(docTags).forEach(item => {
	components.push({
		...docTags[item],
		path: item,
	})
})

export class App {
    private _disposable!: Disposable;
    public WORD_REG: RegExp = /(-?\d*\.\d\w*)|([^\`\~\!\@\$\^\&\*\(\)\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\s]+)/gi;
  
  
    getSeletedText() {
      let editor = vscode.window.activeTextEditor;
  
      if (!editor) {return;}
  
      let selection = editor.selection;
  
      if (selection.isEmpty) {
        let text = [];
        let range = editor.document.getWordRangeAtPosition(selection.start, this.WORD_REG);
  
        return editor.document.getText(range);
      } else {
        return editor.document.getText(selection);
      }
    }
  
    setConfig() {
      // https://github.com/Microsoft/vscode/issues/24464
      const config = workspace.getConfiguration('editor');
      const quickSuggestions = config.get('quickSuggestions');
      if(!quickSuggestions["strings"]) {
        config.update("quickSuggestions", { "strings": true }, true);
      }
    }
  
    openHtml(query, title) {
      const { label, detail } = query
      const panel = vscode.window.createWebviewPanel(
        label,
        detail,
        ViewColumn.One,
        {
          enableScripts: true, // 启用JS，默认禁用
          retainContextWhenHidden: true, // webview被隐藏时保持状态，避免被重置
        }
      );
  
      // And set its HTML content
      panel.webview.html = this.getWebviewContent(query);
    }
  
    openDocs(query?: Query, title = 'discuz-design-helper', editor = window.activeTextEditor){
      this.openHtml(query, title)
    }
          
    dispose() {
      this._disposable.dispose();
    }
  
    getWebviewContent(query: Query) {
      const config = workspace.getConfiguration('dzq-helper');
      const linkUrl = 'http://9.135.11.174'; // config.get('link-url');
      const path = query.path;
      const iframeSrc = `${linkUrl}/#/components/${path}`;
      return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Cat Coding</title>
      </head>
      <body>
        <iframe style="position: absolute;border: none;left: 0;top: 0;width: 100%;height: 100%; background: white" src="${iframeSrc}"></iframe>
      </body>
      </html>`;
    }
  }

export default function search(context: ExtensionContext) {
    let app = new App();
    app.setConfig();

    let disposable = vscode.commands.registerCommand('discuz-design-helper.search', () => {
        // const languageId = vscode.window.activeTextEditor.document.languageId
        // switch(languageId) {
        //     case 'javascript':
        //     case 'javascriptreact':
        //     case 'html':
        //         break;
        //     default:
        //         return;
        // }
    
        const selection =  app.getSeletedText();
        let items = components.map(item => {
            return {
                label: item.tag,
                detail: item.title + ' ' + item.subtitle,
                path: item.path,
                description: item.type
            };
        });
    
        if (items.length < 1) {
          vscode.window.showInformationMessage('Initializing。。。, please try again.');
          return;
        }
    
        let find = items.filter(item => item.label === selection);
    
        if (find.length) {
            app.openDocs(find[0], find[0].label);
            return;
        }
    
        // cant set default value for this method? angry.
        vscode.window.showQuickPick(items).then(selected => {
            selected && app.openDocs(selected, selected.label);
        })
    });
  
    context.subscriptions.push(disposable);
}