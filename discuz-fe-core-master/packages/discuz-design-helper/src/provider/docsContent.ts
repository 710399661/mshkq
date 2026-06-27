// @ts-nocheck
import { TextDocumentContentProvider, Event, Uri, CancellationToken, workspace, EventEmitter, ExtensionContext } from 'vscode';

export interface Query {
  path: string,
  label: string,
  detail: string,
  description: string,
};

const HTML_CONTENT = (query: Query) => {
    const config = workspace.getConfiguration('dzq-helper');
    const linkUrl = 'http://9.135.11.174'; // config.get('link-url');
    const path = query.path;
    const iframeSrc = `${linkUrl}/#/components/${path}`;
    return `
      <body style="background-color: white">
      <iframe style="position: absolute;border: none;left: 0;top: 0;width: 100%;height: 100%;" src="${iframeSrc}"></iframe>
      </body>`;
};

export function decodeDocsUri(uri: Uri): Query {
    return <Query>JSON.parse(uri.query);
}

class DzqDocsContentProvider implements TextDocumentContentProvider {
    private _onDidChange = new EventEmitter<Uri>();

    get onDidChange(): Event<Uri> {
      return this._onDidChange.event;
    }

    public update(uri: Uri) {
      this._onDidChange.fire(uri);
    }

    provideTextDocumentContent(uri: Uri, token: CancellationToken): string | Thenable<string> {
      return HTML_CONTENT(decodeDocsUri(uri));
    }
}

export default function docsContent(context: ExtensionContext) {
  const docs = new DzqDocsContentProvider()
  let registration = workspace.registerTextDocumentContentProvider('discuz-design-helper', docs);

  context.subscriptions.push(registration);
}