import * as vscode from 'vscode';

import autoCompletion from './provider/autoCompletion';
import docsContent from './provider/docsContent';
import search from './provider/search';


export function activate(context: vscode.ExtensionContext) {
	// 自动补全
	autoCompletion(context);

	docsContent(context);

	search(context)
}

// this method is called when your extension is deactivated
export function deactivate() {}
