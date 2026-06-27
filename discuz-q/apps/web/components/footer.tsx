export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">关于我们</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary">产品介绍</a></li>
              <li><a href="#" className="hover:text-primary">更新日志</a></li>
              <li><a href="#" className="hover:text-primary">联系我们</a></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">帮助中心</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary">使用指南</a></li>
              <li><a href="#" className="hover:text-primary">常见问题</a></li>
              <li><a href="#" className="hover:text-primary">意见反馈</a></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">社区规范</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary">用户协议</a></li>
              <li><a href="#" className="hover:text-primary">隐私政策</a></li>
              <li><a href="#" className="hover:text-primary">内容规范</a></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">开发者</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary">API 文档</a></li>
              <li><a href="#" className="hover:text-primary">插件开发</a></li>
              <li><a href="#" className="hover:text-primary">开源仓库</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-xs text-muted-foreground">
          <p>© 2024 Discuz! Q. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
