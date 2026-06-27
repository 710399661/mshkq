// @ts-nocheck
import * as vscode from 'vscode';
import { workspace, TextDocument, Position, CompletionItem, CompletionItemKind, SnippetString, Range } from 'vscode';
// import * as TAGS from '../config/uiTags.json';
// import * as ATTRS from '../config/uiAttributes.json';

export interface TagObject {
  text: string,
  offset: number
};
const path = require('path')

const prettyHTML = require('pretty');

const TAGS = require(path.resolve(__dirname, '../config/uiTags.json'))
const ATTRS = require(path.resolve(__dirname, '../config/uiAttributes.json'))

class CompletionItemProvider {
    private _document: TextDocument;
    private _position: Position;
    private tagReg: RegExp = /<([\w-]+)\s+/g;
    private attrReg: RegExp = /(?:\(|\s*)(\w+)=['"][^'"]*/;
    private tagStartReg:  RegExp = /<([\w-]*)$/;
    private pugTagStartReg: RegExp = /^\s*[\w-]*$/;
    private size: number;
    private quotes: string;
  
    getPreTag(): TagObject | undefined {
      let line = this._position.line;
      let tag: TagObject | string;
      let txt = this.getTextBeforePosition(this._position);
  
      while (this._position.line - line < 10 && line >= 0) {
        if (line !== this._position.line) {
          txt = this._document.lineAt(line).text;
        }
        tag = this.matchTag(this.tagReg, txt, line);
        
        if (tag === 'break') return;
        if (tag) return <TagObject>tag;
        line--;
      }
      return;
    }
  
    getPreAttr(): string | undefined {
      let txt = this.getTextBeforePosition(this._position).replace(/"[^'"]*(\s*)[^'"]*$/, '');
      let end = this._position.character;
      let start = txt.lastIndexOf(' ', end) + 1;
      let parsedTxt = this._document.getText(new Range(this._position.line, start, this._position.line, end));
  
      return this.matchAttr(this.attrReg, parsedTxt);
    }
  
    matchAttr(reg: RegExp, txt: string): string {
      let match: RegExpExecArray;
      match = reg.exec(txt);
      return !/"[^"]*"/.test(txt) && match && match[1];
    }
  
    matchTag(reg: RegExp, txt: string, line: number): TagObject | string {
      let match: RegExpExecArray;
      let arr: TagObject[] = [];
  
      if (/<\/?[-\w]+[^<>]*>[\s\w]*<?\s*[\w-]*$/.test(txt) || (this._position.line === line && (/^\s*[^<]+\s*>[^<\/>]*$/.test(txt) || /[^<>]*<$/.test(txt[txt.length - 1])))) {
        return 'break';
      }
      while((match = reg.exec(txt))) {
        arr.push({
          text: match[1],
          offset: this._document.offsetAt(new Position(line, match.index))
        });
      }
      return arr.pop();
    }
  
    getTextBeforePosition(position: Position): string {
      var start = new Position(position.line, 0);
      var range = new Range(start, position);
      return this._document.getText(range);
    }
    getTagSuggestion() {
      let suggestions = [];
  
      let id = 100;
      for (let tag in TAGS) {
        suggestions.push(this.buildTagSuggestion(tag, TAGS[tag], id));
        id++;
      }
      
      return suggestions;
    }
  
    getAttrValueSuggestion(tag: string, attr: string): CompletionItem[] {
      let suggestions = [];
      const values = this.getAttrValues(tag, attr);
      values.forEach(value => {
        suggestions.push({
          label: value,
          kind: CompletionItemKind.Value
        });
      });
      return suggestions;
    }
  
    getAttrSuggestion(tag: string) {
      let suggestions = [];
      let tagAttrs = this.getTagAttrs(tag);
      let preText = this.getTextBeforePosition(this._position);
      let prefix = preText.replace(/['"]([^'"]*)['"]$/, '').split(/\s|\(+/).pop();
      // method attribute
      const method = prefix[0] === '@';
      // bind attribute
      const bind = prefix[0] === ':';
  
      prefix = prefix.replace(/[:@]/, '');
  
      if(/[^@:a-zA-z\s]/.test(prefix[0])) {
        return suggestions;
      }
  
      tagAttrs.forEach(attr => {
        const attrItem = this.getAttrItem(tag, attr);
        if (attrItem && (!prefix.trim() || this.firstCharsEqual(attr, prefix))) {
            const sug = this.buildAttrSuggestion({attr, tag, bind, method}, attrItem);
            sug && suggestions.push(sug);
        }
      });
      
      return suggestions;
    }
  
    buildTagSuggestion(tag, tagVal, id) {
      const snippets = [];
      let index = 0;
      let that = this;
      function build(tag, {subtags, defaults}, snippets) {
        let attrs = '';
        defaults && defaults.forEach((item, i) => {
          attrs += ` ${item}=${that.quotes}$${index + i + 1}${that.quotes}`;
        });
        snippets.push(`${index > 0 ? '<':''}${tag}${attrs}>`);
        index++;
        subtags && subtags.forEach(item => build(item, TAGS[item], snippets));
        snippets.push(`</${tag}>`);
      };
      build(tag, tagVal, snippets);

      const result = {
        label: tag,
        sortText: `0${id}${tag}`,
        insertText: new SnippetString(prettyHTML('<' + snippets.join(''), {indent_size: this.size}).substr(1)),
        kind: CompletionItemKind.Snippet,
        detail: 'Discuz Design',
        documentation: tagVal.description
      }
  
      return result;
    }
  
    buildAttrSuggestion({attr, tag, bind, method}, {description, type, optionType, defaultValue}) {
      if ((method && type === "method") || (bind && type !== "method") || (!method && !bind)) {
        let documentation = description
        optionType && (documentation += "\n" + `type: ${optionType}`)
        defaultValue && (documentation += "\n" + `default: ${defaultValue}`)
        return {
          label: attr,
          insertText: (type && (type === 'flag')) ? `${attr} ` : new SnippetString(`${attr}=${this.quotes}$1${this.quotes}$0`),
          kind: (type && (type === 'method')) ? CompletionItemKind.Method : CompletionItemKind.Property,
          detail: 'Discuz Design',
          documentation,
        };
      } else { return; }
    }
  
    getAttrValues(tag, attr) {
      let attrItem = this.getAttrItem(tag, attr);
      let options = attrItem && attrItem.options;
      if (!options && attrItem) {
        if (attrItem.type === 'boolean') {
          options = ['true', 'false'];
        }
      }
      return options || [];
    }
  
    getTagAttrs(tag: string) {
      return (TAGS[tag] && TAGS[tag].attributes) || [];
    }
  
    getAttrItem(tag: string | undefined, attr: string | undefined) {
      return ATTRS[`${tag}/${attr}`] || ATTRS[attr];
    }
  
    isAttrValueStart(tag: Object | string | undefined, attr) {
      return tag && attr;
    }
  
    isAttrStart(tag: TagObject | undefined) {
      return tag;
    }
  
    isTagStart() {
      let txt = this.getTextBeforePosition(this._position);
      return this.tagStartReg.test(txt);
    }
  
    firstCharsEqual(str1: string, str2: string) {
      if (str2 && str1) {
        return str1[0].toLowerCase() === str2[0].toLowerCase();
      }
      return false;
    }

    notInTemplate(): boolean {
      let line = this._position.line;
      while(line) {
        if (/^\s*<script.*>\s*$/.test(<string>this._document.lineAt(line).text)) {
          return true;
        }
        line--;
      }
      return false;
    }

    provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) {
        this._document = document;
        this._position = position;

        const config = workspace.getConfiguration('dzq-helper');
        this.size = config.get('indent-size');
        const normalQuotes = config.get('quotes') === 'double' ? '"': "'";
        this.quotes = normalQuotes;
    
        let tag: TagObject | string | undefined = this.getPreTag();
        let attr = this.getPreAttr();
        if (this.isAttrValueStart(tag, attr)) {
            return this.getAttrValueSuggestion(tag.text, attr);
        } else if(this.isAttrStart(tag)) {
            return this.getAttrSuggestion(tag.text);
        } else if (this.isTagStart()) {
          return this.getTagSuggestion();
        } else {return [];}
    }

    // resolveCompletionItem(){}
}

export default function autoCompletion(context: vscode.ExtensionContext) {
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider([{
        language: 'javascript', scheme: 'file'
    }, {
		language: 'javascriptreact', scheme: 'file'
    }, {
      language: 'html', scheme: 'file'
    }], new CompletionItemProvider(), '.', ' ', ':', '<', '"', "'", '/', '@', '('));
}