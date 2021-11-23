// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
// @ts-ignore
import { pandoc } from "@mcswift/pandoc/index.js";
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const disposables = [vscode.commands.registerCommand('mcswift.pandoc', async (source: string, target: string) => {
		if (!source) {
			const uris = await vscode.window.showOpenDialog({
				canSelectFiles: true,
				canSelectFolders: false,
				canSelectMany: false,
				title: "选择要转化的文件"
			});

			if (!uris) { return; }
			source = uris.map(({ fsPath }) => fsPath)[0];
		}
		if (!target) {
			const uris = await vscode.window.showOpenDialog({
				canSelectFiles: false,
				canSelectFolders: true,
				canSelectMany: false,
				title: "选择要保存文件的目录"
			});

			if (!uris) { return; }
			target = uris.map(({ fsPath }) => fsPath)[0];
		}
		try{
			pandoc(source, "-s", "-o", target);
		}catch(e){
			console.log(e);
		}
		
	})];

	context.subscriptions.push(...disposables);
}

// this method is called when your extension is deactivated
export function deactivate() { }
